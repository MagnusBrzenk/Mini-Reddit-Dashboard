import { SUBREDDITSTAT, SUBREDDITSTATSFEED } from "__MODELS";
import { parseSubredditSearch } from "__FUNCTIONS/redditFunctions/parseSubredditSearch";
import { AnyAction, Reducer } from "redux";
import { AppActions } from "__REDUX/actions";

//When in development, use the "demo" feed:
const bDev: boolean = !!false && process.env.NODE_ENV !== "production";
const localDefault: SUBREDDITSTATSFEED.Interface = !!bDev ? SUBREDDITSTATSFEED.Demo : SUBREDDITSTATSFEED.Default;

/**
 * Reducer governing the array of contacts used to build feed
 * @param substate0
 * @param action
 */
export const subredditStatsFeedReducer: Reducer<SUBREDDITSTATSFEED.ImType, AnyAction> = function(
    substate0: SUBREDDITSTATSFEED.ImType = SUBREDDITSTATSFEED.genIm(localDefault),
    action: AnyAction
): SUBREDDITSTATSFEED.ImType {
    //

    //////////////////////
    switch (action.type) {
        //////////////////

        case AppActions.Types.SEARCH_FOR_SUBREDDIT_FULFILLED:
            //Cast action as corresponding type
            const matchedAction1: ReturnType<typeof AppActions.searchForSubredditFulfilled> = action as any;
            if (!matchedAction1.payload! || matchedAction1.payload!.length === 0) {
                return substate0;
            }

            return substate0;

        default:
            return substate0;
    }
};
