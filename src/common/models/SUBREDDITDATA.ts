import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { SUBREDDITDATUM } from "./SUBREDDITDATUM";

/**
 * All the data structures pulled from reddit required to generate dashboard
 */
export namespace SUBREDDITDATA {
    export interface Interface {
        readonly subredditDatums: SUBREDDITDATUM.Interface[];
    }

    export const Default: Readonly<Interface> = {
        subredditDatums: [...SUBREDDITDATUM.Defaults]
    };

    export const Demo: Interface = {
        subredditDatums: SUBREDDITDATUM.Demos
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
