import { SUBREDDITDATUM, SUBREDDITDATA } from "__MODELS";
import { AnyAction, Reducer } from "redux";
import { AppActions } from "__REDUX/actions";

//When in development, use the "demo" feed:
const bDev: boolean = process.env.NODE_ENV !== "production";
const localDefault: SUBREDDITDATA.Interface = !!bDev ? SUBREDDITDATA.Demo : SUBREDDITDATA.Default;

/**
 * Reducer governing the data for the subreddits selectively added to the menu by the user
 * @param substate0
 * @param action
 */
export const subredditDataReducer: Reducer<SUBREDDITDATA.ImType, AnyAction> = function(
    substate0: SUBREDDITDATA.ImType = SUBREDDITDATA.genIm(localDefault),
    action: AnyAction
): SUBREDDITDATA.ImType {
    //////////////////////
    switch (action.type) {
        //////////////////

        case AppActions.Types.FETCH_SUBREDDIT_DATUM_FULFILLED:
            //Cast action as corresponding type
            const matchedAction1: ReturnType<typeof AppActions.fetchSubredditDatumFulfilled> = action as any;
            if (!matchedAction1.payload!) {
                return substate0;
            }
            //Add fetched datum to collection
            const newDatum = SUBREDDITDATUM.genIm(matchedAction1.payload);
            const newSubstate1 = substate0.update("subredditDatums", (el: any) => el.push(newDatum));
            return newSubstate1;

        case AppActions.Types.HIDE_SUBREDDIT_DATUM:
            //Cast action as corresponding type
            const matchedAction2: ReturnType<typeof AppActions.hideSubredditDatum> = action as any;
            //Isolate index of prospective datum to be toggle
            const toggleIndex = matchedAction2.payload!;
            //If there is only one subredditdatum being displayed, then (on this approach) we can't toggle it off, (else our graph-size calculations will error)
            const totalDisplayedSubredditDatums = substate0.get("subredditDatums").filter(el => !!el.get("bDisplayed")) //
                .size;
            //Cancel toggle if this is our last remaining displayed datum
            const bCancelToggle =
                totalDisplayedSubredditDatums <= 1 && !!substate0.getIn(["subredditDatums", toggleIndex, "bDisplayed"]);
            if (!!bCancelToggle) return substate0;
            //Otherwise, toggle this datum's display
            return substate0.updateIn(["subredditDatums", toggleIndex, "bDisplayed"], el => !el);

        case AppActions.Types.REMOVE_SUBREDDIT_DATUM:
            //Cast action as corresponding type
            const matchedAction3: ReturnType<typeof AppActions.removeSubredditDatum> = action as any;
            //Isolate index of prospective datum to be removed
            const removalIndex = matchedAction3.payload!;
            //If there is only one subredditDatum being displayed, then (on this approach) we can't remove it (else our graph-size calculations will error)
            const totalLoadedSubredditDatums = substate0.get("subredditDatums").size;
            //Cancel removal if this is our last remaining datum
            if (totalLoadedSubredditDatums <= 1) return substate0;
            //Otherwise, remove this datum
            return substate0.deleteIn(["subredditDatums", removalIndex]);
        /////////////////////
        default:
            return substate0;
        /////////////////////
    }
};
