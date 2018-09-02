import { SUBREDDITDATUM } from "__MODELS";
import { addMoreRawRankingsToDatum } from "./addMoreRankingsToDatum";

/**
 * Get all the data needed for a given subreddit in order to plot
 * @param subredditName
 */
export async function getRedditDatum(
    subredditName: string,
    maxRanking: number = 1000
): Promise<SUBREDDITDATUM.Interface> {
    //

    //Create new empty datum:
    const initialSubredditDatum: SUBREDDITDATUM.Interface = {
        name: subredditName,
        bDisplayed: true,
        images: [],
        rawRankings: [],
        maxRankingFetched: 0
    };

    //Supplement this empty datum with actual data
    const newSubredditDatum: SUBREDDITDATUM.Interface = await addMoreRawRankingsToDatum(
        initialSubredditDatum,
        maxRanking
    );

    console.log("@@@@@@@@");
    console.log(newSubredditDatum);
    return newSubredditDatum;
}
