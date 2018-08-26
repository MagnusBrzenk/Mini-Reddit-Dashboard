import { SUBREDDITDATUM, SUBREDDITDATA } from "__MODELS";
import { AnyAction, Reducer } from "redux";
import { AppActions } from "__REDUX/actions";

//When in development, use the "demo" feed:
const bDev: boolean = !!false && process.env.NODE_ENV !== "production";
const localDefault: SUBREDDITDATA.Interface = !!bDev ? SUBREDDITDATA.Demo : SUBREDDITDATA.Default;

/**
 * Reducer governing the array of contacts used to build feed
 * @param substate0
 * @param action
 */
export const subredditDataReducer: Reducer<SUBREDDITDATA.ImType, AnyAction> = function(
    substate0: SUBREDDITDATA.ImType = SUBREDDITDATA.genIm(localDefault),
    action: AnyAction
): SUBREDDITDATA.ImType {
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
