import { REDDIT } from "__MODELS";

/**
 * Parse the json object returned from https://www.reddit.com/subreddits/search/.json?q=cat
 * NOTE: The returned results don't always seem relevant to the search term, but it is what reddit itself displays in the UI
 * @param response
 */
export function parseSubredditSearch(response: REDDIT.ISubredditSearchResult): string[] {
    console.log("@@@@@@@@@@@@@@@@@@@@@");

    console.log(JSON.stringify(response));

    // response.data.children.map(el => el.data.display_name);

    return response.data.children.map(el => el.data.display_name);
}
