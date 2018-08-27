import { REDDIT, SUBREDDITDATUM } from "__MODELS";
import { getTopRedditPosts } from "./getTopRedditPosts";

/**
 * Get all the data needed for a given subreddit in order to plot
 * @param subredditName
 */
export async function getRedditDatum(subredditName: string): Promise<SUBREDDITDATUM.Interface> {
    //

    subredditName = "pics";
    subredditName = "news";
    subredditName = "cats";
    subredditName = "funny";
    // subredditName = "Wellthatsucks";

    const posts: REDDIT.IPost[] = await getTopRedditPosts();

    const images = <string[]>posts
        .filter(el => typeof el.imageUrl === "string")
        .map(el => el.imageUrl)
        .filter(Boolean);

    //Map index of post (=ranking) to bin
    const binWidth10: number[] = [...Array(100)].map(() => 0);
    const binWidth100: number[] = [...Array(10)].map(() => 0);
    posts.forEach((el, ind) => {
        if (subredditName === el.subredditName) {
            binWidth10[Math.floor(ind / 10)]++;
            binWidth100[Math.floor(ind / 100)]++;
        }
    });

    console.log(">>>>>>>>>>>>>>>>>");
    console.log("Histo Data for ", subredditName);
    console.log(binWidth100);
    console.log(">>>>>>>>>>>>>>>>>");

    const subredditDataum: SUBREDDITDATUM.Interface = {
        name: subredditName,
        images,
        binWidth10,
        binWidth100
    };

    return subredditDataum;
}
