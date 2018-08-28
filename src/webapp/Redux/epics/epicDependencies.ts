import { SUBREDDITDATUM, SUBREDDITDATA, REDDIT, NETWORK } from "__MODELS";
import { parseSubredditSearch } from "__FUNCTIONS/redditFunctions/parseSubredditSearch";
import { getRedditDatum } from "__FUNCTIONS/redditFunctions/getRedditDatum";
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("EPIC-DEP");

/**
 * Object containing functions used within epics to fetch resources
 */
export const epicDependencies = {
    searchForSubreddit: async (subredditSearchText: string): Promise<string[]> => {
        try {
            //Prepare reddit-api request
            console.log("EPIC: Searching for subreddit: ", subredditSearchText);
            const subredditNameSearchUrl: string = `https://www.reddit.com/subreddits/search/.json?q=${subredditSearchText}`;

            //Handle reddit-api response
            const redditResponse: string[] = await fetch(subredditNameSearchUrl).then(async res => {
                const subredditSearchResult: REDDIT.ISubredditSearchResult = await res.json();

                // console.log("+++++++++++++++++++++++");
                // console.log("networkResponsePackage", networkResponsePackage);
                // console.log("+++++++++++++++++++++++");

                const matchedNames: string[] = parseSubredditSearch(subredditSearchResult);
                if (res.status >= 200 && res.status < 300) {
                    return matchedNames;
                } else {
                    throw new Error();
                }
            });
            return redditResponse;
        } catch (err) {
            debug(err);
            return [];
        }
    },

    fetchSubredditDatum: async (subredditName: string): Promise<SUBREDDITDATUM.Interface> => {
        //Prepare reddit-api request
        console.log("EPIC: Fetching Datum for: ", subredditName);
        return getRedditDatum(subredditName);
    }
};
