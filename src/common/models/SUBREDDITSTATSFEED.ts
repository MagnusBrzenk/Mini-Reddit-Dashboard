import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { SUBREDDITSTAT } from "./SUBREDDITSTAT";

export namespace SUBREDDITSTATSFEED {
    export interface Interface {
        subredditStats: SUBREDDITSTAT.Interface[];
    }

    export const Default: Interface = {
        subredditStats: SUBREDDITSTAT.Defaults
    };

    export const Demo: Interface = {
        subredditStats: SUBREDDITSTAT.Demos
    };

    /* DO NOT EDIT/REMOVE */
    export const genIm = getImmutableGenerator(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
}

// /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////
