import { createAction } from "redux-actions";
import { SUBREDDITDATUM, SUBREDDITDATA } from "__MODELS";

/////////////////////////////
export namespace AppActions {
    /////////////////////////

    /* ACTION TYPES */

    export enum Types {
        // SEARCH ACTIONS
        SET_SUBREDDIT_SEARCH_WORD = "SET_SUBREDDIT_SEARCH_WORD",
        CLEAR_SUBREDDIT_SEARCH = "CLEAR_SUBREDDIT_SEARCH",
        SEARCH_FOR_SUBREDDIT = "SEARCH_FOR_SUBREDDIT",
        SEARCH_FOR_SUBREDDIT_FULFILLED = "SEARCH_FOR_SUBREDDIT_FULFILLED",

        // DATA ACTIONS
        FETCH_SUBREDDIT_DATUM = "FETCH_SUBREDDIT_DATUM",
        FETCH_SUBREDDIT_DATUM_FULFILLED = "FETCH_SUBREDDIT_DATUM_FULFILLED"
    }

    /* ACTION CREATORS */

    // SEARCH ACTIONS
    export const setSubredditSearchWord = CreateAction<string>(Types.SET_SUBREDDIT_SEARCH_WORD);
    export const clearSubredditSearch = CreateAction(Types.CLEAR_SUBREDDIT_SEARCH);
    export const searchForSubreddit = CreateAction<string>(Types.SEARCH_FOR_SUBREDDIT);
    export const searchForSubredditFulfilled = CreateAction<string[]>(Types.SEARCH_FOR_SUBREDDIT_FULFILLED);

    // DATA ACTIONS
    export const fetchSubredditDatum = CreateAction<string>(Types.FETCH_SUBREDDIT_DATUM);
    export const fetchSubredditDatumFulfilled = CreateAction<SUBREDDITDATUM.Interface>(
        Types.FETCH_SUBREDDIT_DATUM_FULFILLED
    );
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
