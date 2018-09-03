import { SUBREDDITSEARCH } from "__MODELS";
import { parseSubredditSearch } from "__FUNCTIONS/redditFunctions/parseSubredditSearch";
import { AnyAction, Reducer } from "redux";
import { AppActions } from "__REDUX/actions";

//When in development, use the "demo" feed:
const bDev: boolean = !!false && process.env.NODE_ENV !== "production";
const localDefault: SUBREDDITSEARCH.Interface = SUBREDDITSEARCH.Default;

/**
 * Reducer governing search functionality of dashboard
 * @param substate0
 * @param action
 */
export const subredditSearchReducer: Reducer<SUBREDDITSEARCH.ImType, AnyAction> = function(
    substate0: SUBREDDITSEARCH.ImType = SUBREDDITSEARCH.genIm(localDefault),
    action: AnyAction
): SUBREDDITSEARCH.ImType {
    //////////////////////
    switch (action.type) {
        //////////////////

        case AppActions.Types.CLEAR_SUBREDDIT_SEARCH:
            return SUBREDDITSEARCH.genIm();

        case AppActions.Types.SET_SUBREDDIT_SEARCH_WORD:
            //Cast action as corresponding type:
            const matchedAction1: ReturnType<typeof AppActions.setSubredditSearchWord> = action as any;
            if (!matchedAction1.payload) return substate0;
            //Process payload:
            return substate0.set("searchWord", matchedAction1.payload);

        case AppActions.Types.SEARCH_FOR_SUBREDDIT_FULFILLED:
            //Cast action as corresponding type:
            const matchedAction2: ReturnType<typeof AppActions.searchForSubredditFulfilled> = action as any;
            if (!matchedAction2.payload) return substate0;
            //Process payload:
            return SUBREDDITSEARCH.genIm({
                ...SUBREDDITSEARCH.Default,
                matchedSubreddits: matchedAction2.payload
            });

        default:
            return substate0;
    }
};
