export namespace SUBREDDITDATUM {
    export interface Interface {
        readonly name: string;
        readonly rawRankings: number[];
        readonly maxRankingFetched: number;
        readonly images: string[];
        readonly bDisplayed: boolean;
        readonly retrievalDate?: string;
    }

    export const Default: Interface = {
        name: "XXX",
        rawRankings: [],
        maxRankingFetched: 1000,
        images: [],
        bDisplayed: false,
        retrievalDate: new Date().toDateString()
    };

    export const Defaults: Interface[] = [];

    export const Demo: Interface = {
        name: "funny",
        rawRankings: [],
        maxRankingFetched: 1000,
        images: [],
        bDisplayed: true,
        retrievalDate: new Date().toDateString()
    };

    export const Demos: Interface[] = [Demo];

    export function validate(input: any): Interface[] {
        const inputArray = !!Array.isArray(input) ? input : [input];
        return inputArray.map(el => validateOne(el)).filter(Boolean) as Interface[];

        function validateOne(input: any): Interface | null {
            //At minimum, ensure input has no properties beyond those of Default
            for (const key in input)
                if (!Object.keys(Default).includes(key)) {
                    return null;
                }
            //More detailed type tests, etc. go here:

            //...

            //All tests passed
            return input as Interface;
        }
    }
}
