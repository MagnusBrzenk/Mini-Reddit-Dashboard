import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("CONTACT");

export namespace SUBREDDITSTAT {
    export interface Interface {
        name: string;
        history: any;
        retrievalDate?: string;
    }

    export const Default: Readonly<Interface> = {
        name: "XXX",
        history: {},
        retrievalDate: new Date().toDateString()
    };

    export const Defaults: Interface[] = [];

    export const Demo: Interface = {
        name: "news",
        history: {},
        retrievalDate: new Date().toDateString()
    };

    export const Demos: Interface[] = [Demo];

    export function validate(input: any): Interface[] {
        const inputArray = !!Array.isArray(input) ? input : [input];
        return inputArray.map(el => validateOne(el)).filter(Boolean) as Interface[];

        function validateOne(input: any): Interface | null {
            //At minimum, ensure input has no properties that beyond those of Default
            for (const key in input)
                if (!Object.keys(Default).includes(key)) {
                    debug(`Key '${key}' not allowed!!!`);
                    return null;
                }
            //More detailed type tests, etc. go here:

            //All tests passed
            return input as Interface;
        }
    }

    /*--------------------- DO NOT EDIT/REMOVE ---------------------*/
    export const genIm = getImmutableGenerator<Interface>(Default);
    export type ImType = getImType<Interface>;
    export type ImTypes = getImType<Interface[]>;
    /*--------------------------------------------------------------*/
}
