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
}
