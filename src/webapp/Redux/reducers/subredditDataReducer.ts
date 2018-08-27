import { SUBREDDITDATUM, SUBREDDITDATA } from "__MODELS";
import { AnyAction, Reducer } from "redux";
import { AppActions } from "__REDUX/actions";

//When in development, use the "demo" feed:
const bDev: boolean = true && process.env.NODE_ENV !== "production";
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

        case AppActions.Types.FETCH_SUBREDDIT_DATUM_FULFILLED:
            //Cast action as corresponding type
            const matchedAction1: ReturnType<typeof AppActions.fetchSubredditDatumFulfilled> = action as any;
            if (!matchedAction1.payload!) {
                return substate0;
            }
            const newDatum = SUBREDDITDATUM.genIm(matchedAction1.payload);
            const newSubstate1 = substate0.update("subredditDatums", (el: any) => el.push(newDatum));
            // const newSubstate1 = substate0.update("subredditDatums", (el: SUBREDDITDATUM.ImTypes) => el);

            console.log("!!!!!!!!!!!!!!!!!!#####################");
            console.log(substate0.toJS());
            console.log(newSubstate1.toJS());
            return newSubstate1;

        default:
            return substate0;
    }
};
