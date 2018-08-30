import { getImmutableGenerator, getImType } from "__METATYPING"; //DO NOT REMOVE
import { __debug } from "__FUNCTIONS/__debug";
const debug = __debug("CONTACT");

export namespace SUBREDDITDATUM {
    export interface Interface {
        readonly name: string;
        readonly binWidth10: number[];
        readonly binWidth100: number[];
        readonly images: string[];
        readonly bDisplayed: boolean;
        readonly retrievalDate?: string;
    }

    export const Default: Interface = {
        name: "XXX",
        binWidth10: [...Array(100)].map(() => 0),
        binWidth100: [...Array(10)].map(() => 0),
        images: [],
        bDisplayed: false,
        retrievalDate: new Date().toDateString()
    };

    export const Defaults: Interface[] = [];

    export const Demo: Interface = {
        name: "funny",
        binWidth10: [...Array(100)].map(() => Math.round(Math.random() * 50)),
        binWidth100: [17, 21, 22, 17, 27, 18, 24, 14, 22, 2],
        images: [],
        bDisplayed: true,
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

            //...

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
