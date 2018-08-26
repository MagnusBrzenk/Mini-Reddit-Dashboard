import { createAction } from "redux-actions";
// import { SUBREDDITSTAT, SUBREDDITSTATSFEED } from "__MODELS";

/////////////////////////////
export namespace AppActions {
    /////////////////////////

    /* ACTION TYPES */

    export enum Types {
        // SUBREDDITSEARCH ACTIONS
        SET_SUBREDDIT_SEARCH_WORD = "SET_SUBREDDIT_SEARCH_WORD",
        CLEAR_SUBREDDIT_SEARCH = "CLEAR_SUBREDDIT_SEARCH",

        // SUBREDDITSTATSFEED ACTIONS
        FETCH_SUBREDDITSTAT = "FETCH_SUBREDDITSTAT",
        SEARCH_FOR_SUBREDDIT = "SEARCH_FOR_SUBREDDIT",
        SEARCH_FOR_SUBREDDIT_FULFILLED = "SEARCH_FOR_SUBREDDIT_FULFILLED",
        ADD_SUBREDDIT_STAT_TO_FEED = "ADD_SUBREDDIT_STAT_TO_FEED"
    }

    /* ACTION CREATORS */

    // SUBREDDITSEARCH ACTIONS
    export const setSubredditSearchWord = CreateAction<string>(Types.SET_SUBREDDIT_SEARCH_WORD);
    export const clearSubredditSearch = CreateAction(Types.CLEAR_SUBREDDIT_SEARCH);

    // SUBREDDITSTATSFEED ACTIONS
    export const fetchSubredditStat = CreateAction<string>(Types.FETCH_SUBREDDITSTAT);
    export const searchForSubreddit = CreateAction<string>(Types.SEARCH_FOR_SUBREDDIT);
    export const searchForSubredditFulfilled = CreateAction<string[]>(Types.SEARCH_FOR_SUBREDDIT_FULFILLED);
    export const addSubredditStatToFeed = CreateAction<string>(Types.ADD_SUBREDDIT_STAT_TO_FEED);
}

/*-------------------------------------- DO NOT EDIT --------------------------------------*/
//Wrapper around redux-action's `createAction` to give our action creators stricter types.
function CreateAction<TPayload = never>(type: AppActions.Types): WACT<TPayload> {
    return (createAction(type) as any) as WACT<TPayload>;
}
//WACT = Wrapped-Action-Creator Type
type WACT<TPayload = never> = [TPayload] extends [never] //N.b. 'clothed' types required!
    ? () => { type: AppActions.Types }
    : (payload: TPayload) => { type: AppActions.Types; payload: TPayload };
/*-----------------------------------------------------------------------------------------*/
