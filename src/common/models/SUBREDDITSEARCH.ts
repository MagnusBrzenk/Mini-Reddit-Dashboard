import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("CONTACT");

export namespace SUBREDDITSEARCH {
    //

    export interface Interface {
        searchWord: string;
        matchedSubreddits: string[];
    }

    export const Default: Readonly<Interface> = {
        searchWord: "",
        matchedSubreddits: []
    };

    /*--------------------- DO NOT EDIT/REMOVE ---------------------*/
    export const genIm = getImmutableGenerator<Interface>(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
    /*--------------------------------------------------------------*/
}
