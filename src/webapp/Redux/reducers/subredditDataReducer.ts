import { SUBREDDITDATUM, SUBREDDITDATA } from "__MODELS";
import { AnyAction, Reducer } from "redux";
import { AppActions } from "__REDUX/actions";

/**
 * Reducer governing the data for the subreddits selectively added to the menu by the user
 * @param substate0
 * @param action
 */
export const subredditDataReducer: Reducer<SUBREDDITDATA.ImType, AnyAction> = function(
    substate0: SUBREDDITDATA.ImType = SUBREDDITDATA.genIm(),
    action: AnyAction
): SUBREDDITDATA.ImType {
    //////////////////////
    switch (action.type) {
        //////////////////

        case AppActions.Types.UPDATE_SUBREDDIT_DATUM:
            //Cast action as corresponding type
            const matchedAction0: ReturnType<typeof AppActions.updateSubredditDatum> = action as any;
            if (!matchedAction0.payload!) return substate0;
            //If datum doesn't exist for this subreddit, then create a bare-bones version
            const subredditName: string = matchedAction0.payload;
            const existingDatum: SUBREDDITDATUM.ImType | undefined = substate0
                .get("subredditDatums")
                .find(el => el.get("name") === subredditName);
            if (!existingDatum) {
                return substate0.update("subredditDatums", el =>
                    el.push(
                        SUBREDDITDATUM.genIm({
                            name: subredditName,
                            bDisplayed: true,
                            images: [],
                            rawRankings: [],
                            maxRankingFetched: 0
                        })
                    )
                );
            }
            return substate0;

        case AppActions.Types.UPDATE_SUBREDDIT_DATUM_FULFILLED:
            //Cast action as corresponding type
            const matchedAction1: ReturnType<typeof AppActions.updateSubredditDatumFulfilled> = action as any;
            if (!matchedAction1.payload!) return substate0;
            //Find existing datum and replace it with new updated datum for same subreddit
            const newDatum = SUBREDDITDATUM.genIm(matchedAction1.payload);
            const datumIndex = substate0
                .get("subredditDatums")
                .findIndex(el => el.get("name") === newDatum.get("name"));
            if (datumIndex === -1) throw new Error("Returned datum doesnt match with an existing datum!!!");
            const newSubstate1 = substate0.setIn(["subredditDatums", datumIndex], newDatum);
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

        case AppActions.Types.SET_BIN_WIDTH:
            //Cast action as corresponding type
            const matchedAction4: ReturnType<typeof AppActions.setBinWidth> = action as any;
            return substate0.set("binWidth", matchedAction4.payload);

        case AppActions.Types.SET_MAX_X_RANGE:
            //Cast action as corresponding type
            const matchedAction5: ReturnType<typeof AppActions.setBinWidth> = action as any;
            return substate0.set("maxXRange", matchedAction5.payload);
        /////////////////////
        default:
            return substate0;
        /////////////////////
    }
};
