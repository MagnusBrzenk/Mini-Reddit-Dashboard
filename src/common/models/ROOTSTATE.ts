import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { SUBREDDITDATA } from "./SUBREDDITDATA";
import { SUBREDDITSEARCH } from "./SUBREDDITSEARCH";
import { ROUTERSTATE } from "./ROUTERSTATE";

/**
 * Note: These types are to be applied to the RootState object when creating root reducer; it combines our customized branches of the state tree with the router state
 * The rootState object is not a typical structure built from a POJO, it is created via combineReducers
 */
export namespace ROOTSTATE {
    export interface Interface {
        readonly subredditData: SUBREDDITDATA.Interface;
        readonly subredditSearch: SUBREDDITSEARCH.Interface;
        readonly router: ROUTERSTATE.Interface;
    }

    export const Default: Interface = {
        subredditData: SUBREDDITDATA.Default,
        subredditSearch: SUBREDDITSEARCH.Default,
        router: ROUTERSTATE.Default
    };

    /* DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
}
