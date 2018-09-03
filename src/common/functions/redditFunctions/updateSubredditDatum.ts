import { REDDIT, SUBREDDITDATUM } from "__MODELS";
import { getTopRedditPosts } from "__FUNCTIONS/redditFunctions/getTopRedditPosts";

export async function updateSubredditDatum(
    oldSubredditDatum: SUBREDDITDATUM.Interface,
    maxRanking: number
): Promise<SUBREDDITDATUM.Interface> {
    //

    //Get all the reddit posts up to maxRanking
    const posts: REDDIT.IPost[] = await getTopRedditPosts({ targetCount: maxRanking });

    //Get all updated images
    const allImages = <string[]>posts
        .filter(el => typeof el.imageUrl === "string")
        .map(el => el.imageUrl)
        .filter(Boolean);

    //Get raw rankings
    const rawRankings: number[] = [];
    posts.forEach((el, ind) => {
        if (oldSubredditDatum.name === el.subredditName) {
            rawRankings.push(ind);
        }
    });

    //Build new subredditDatum
    const newSubredditDatum: SUBREDDITDATUM.Interface = {
        ...oldSubredditDatum,
        images: allImages,
        maxRankingFetched: maxRanking,
        rawRankings
    };

    return newSubredditDatum;
}
