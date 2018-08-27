// import rp from "request-promise";
import parse from "url-parse";
import { REDDIT } from "__MODELS";
const bDebug: boolean = false;

//Cache topRedditPosts
let topRedditPosts: undefined | REDDIT.IPost[];

/**
 * Pings reddit multiple times (in general) to get posts from feed
 * To query more than 100 posts, you need to work with reddit-API's pagination sysem
 * See: https://www.reddit.com/dev/api/#fullnames
 * @param sortType
 */
export async function getTopRedditPosts(sortType: "hot" | "top" = "top"): Promise<REDDIT.IPost[]> {
    if (!topRedditPosts) topRedditPosts = await getTopRedditPostsWrapped(sortType);
    return topRedditPosts;
}

/**
 * Main reddit logic wrapped away to enable cache-ing
 * @param sortType
 */
export async function getTopRedditPostsWrapped(sortType: "hot" | "top" = "top"): Promise<REDDIT.IPost[]> {
    const subredditName = "all";
    const targetCount: number = parseInt(process.env.REDDIT_RANGE || "1000", 10) || 1000;
    const steps: number = Math.ceil(targetCount / 100); //required number of reddit API calls
    let redditCount: number = 0; //number of posts received from reddit API so far
    let redditLimit: number = 100; //number of posts to-be-requested on next api call
    let afterCode: string | null = null; //see above link; used in reddit's pagination method
    let redditEntries: REDDIT.IPost[] = []; //array of reddit posts to-be-built-up

    //
    // Loop controlling reddit pagination
    //
    for (let i = 0; i < steps - 0; i++) {
        //
        // If we're about to grab more posts than our original target, then reduce the number of posts to grab to equal that target:
        //
        if (redditLimit + redditCount > targetCount) redditLimit = targetCount - redditCount;
        //
        // Build url for the ith call to reddit
        //
        const redditUrl: string =
            "https://www.reddit.com/r/" +
            subredditName +
            "/" +
            sortType +
            "/.json?limit=" +
            redditLimit +
            "&t=all&count=" +
            redditCount +
            (!!afterCode ? afterCode : "");

        console.log(redditUrl);

        //
        // Try pinging reddit
        //
        try {
            const redditParsedAPIData: REDDIT.IAllPostsSearchResult = await fetch(redditUrl).then(x => x.json());
            afterCode = "&after=" + redditParsedAPIData.data.after; //Update afterCode; see about 'after' here: https://www.reddit.com/dev/api/#fullnames
            redditCount += 100;
            //
            // Try extracting salient data from redditParsedAPIData
            //
            const redditEntriesSlice = (<Array<REDDIT.IPost | null>>redditParsedAPIData.data.children
                .map(
                    (el, ind: number): REDDIT.IPost | null => {
                        try {
                            // Reddit's video- and image-info structures vary alot; give 'fallback_url' a try for video, else don't bother:
                            let tryVideoUrl: string | undefined;
                            try {
                                tryVideoUrl = el.data.media.reddit_video.fallback_url;
                            } catch (err) {
                                if (!!bDebug) console.log(err);
                            }
                            let imageUrl: string | undefined;
                            try {
                                imageUrl = !!el.data.preview
                                    ? validateUrl(el.data.preview.images[0].source.url)
                                    : undefined;
                            } catch (err) {
                                if (!!bDebug) console.log(err);
                            }
                            //Regulate link format
                            let redditLink: string | undefined = validateUrl(el.data.url);
                            if (!!redditLink) redditLink = redditLink.replace(/&amp;/g, "&").replace(/\s+/g, ""); //Remove white space in instagram links -- else screws up filter
                            if (!!redditLink && redditLink.substr(0, 3) === "/r/")
                                redditLink = "https://www.reddit.com" + redditLink;
                            return {
                                redditId: el.data.id,
                                title: el.data.title
                                    .replace(/\[(.*?)\]/g, "") //Take out crappy-looking [PHOTOGRAPH SPECS] common to photography posts
                                    .replace(/&amp;/g, "&") //Fix ampersands in titles
                                    .replace(" , ", ", ") //Fix idiot comma errors
                                    .replace(/ITAP/g, "I took a picture")
                                    .replace(/MIRL/g, "Me in real life")
                                    .replace(/PIC/g, "No-context pic")
                                    .replace(/MRW/g, "My reaction when")
                                    .replace(/TIL/g, "Today I learned")
                                    .replace(/TIFU/g, "Today I f***ed up")
                                    .replace(/fuck/g, "f***"),
                                subredditName: el.data.subreddit,
                                selftext: el.data.selftext.replace(/&amp;/g, "&"),
                                link: redditLink,
                                imageUrl,
                                thumbnailUrl: validateUrl(el.data.thumbnail),
                                commentPage: validateUrl("https://www.reddit.com" + el.data.permalink),
                                videoUrl: validateUrl(tryVideoUrl),
                                over_18: el.data.over_18,
                                redditScore: el.data.score,
                                created: el.data.created
                            };
                        } catch (err) {
                            if (!!bDebug) console.log("Whoa!!! Sth went wrong with the " + ind + "th reddit entry");
                            if (!!bDebug) console.log(err.message);
                            return null;
                        }
                    }
                )
                .filter((el: null | REDDIT.IPost) => {
                    // Filter out items marked as 'over_18', lacking subreddit, lacking image, too crude, etc.
                    const isKeeper =
                        !!el &&
                        !el.over_18 &&
                        !!el.subredditName &&
                        !!el.redditScore &&
                        !["r/", "reddit", "porn "].some(el2 => el.title.toLowerCase().indexOf(el2) !== -1) && //Helps removes posts that are too 'reddit-specific'
                        ![" wank", "fuck", "masturbate", "suck it", "cunt"].some(
                            el2 => el.title.toLowerCase().indexOf(el2) !== -1
                        ) && //Helps removes posts that are too crude
                        !["AMA"].some(el2 => el.title.indexOf(el2) !== -1) && //Too 'reddit-specific', needs upper-case match
                        (!el.imageUrl ||
                            (!!el.imageUrl && el.imageUrl.indexOf("redditstatic.com/icon.png") === -1) ||
                            el.subredditName === "Jokes"); //Remove posts without images UNLESS it's a joke!
                    return isKeeper;
                })).filter(Boolean) as REDDIT.IPost[];

            //Add this slice of posts to return array:
            redditEntries = redditEntries.concat(redditEntriesSlice);
        } catch (err) {
            //Sth went wrong with API call
            if (!!bDebug) console.log(err);
        }
    }
    return redditEntries;
}

/**
 * Make sure url is well formatted
 * @param url
 */
export function validateUrl(url: string | undefined): string | undefined {
    if (!url) {
        return undefined;
    }
    const parsedUrl = parse(url);
    if (!parsedUrl) {
        return undefined;
    }
    return parsedUrl.href;
}
