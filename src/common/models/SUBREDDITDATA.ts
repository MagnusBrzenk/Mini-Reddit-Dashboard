import { SUBREDDITDATUM } from "./SUBREDDITDATUM";

/**
 * SUBREDDITDATA houses all the data structures pulled from reddit required to generate dashboard
 * plus parameters for display (binWidths, etc.)
 */
export namespace SUBREDDITDATA {
    export interface Interface {
        readonly subredditDatums: SUBREDDITDATUM.Interface[];
        readonly binWidth: number;
        readonly maxXRange: number;
    }

    export const Default: Readonly<Interface> = {
        subredditDatums: [...SUBREDDITDATUM.Defaults],
        binWidth: 100,
        maxXRange: 1000
    };

    export const Demo: Interface = {
        subredditDatums: SUBREDDITDATUM.Demos,
        maxXRange: 1000,
        binWidth: 100
    };
}
