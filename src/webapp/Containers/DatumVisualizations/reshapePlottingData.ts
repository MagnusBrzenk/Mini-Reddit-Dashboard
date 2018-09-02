import { SUBREDDITDATUM } from "__MODELS";
import { LineChart } from "__COMPONENTS/LineChart";

/**
 * Maps immutable list of subredditDatums to POJ array of arrays of IDataPoint objects
 * as required by the interface of our LineChart component
 * @param subredditDatums
 * @param xRangeMax
 */
export function reshapePlottingData(
    subredditDatums: SUBREDDITDATUM.ImTypes,
    binWidth: number,
    xRangeMax: number
): LineChart.IDataPoint[][] {
    const allPlottingData: LineChart.IDataPoint[][] = subredditDatums.toJS().map((el, ind) => {
        //

        //Create array to tore bin counts
        const binCounts: number[] = [...Array(Math.ceil(xRangeMax / binWidth))].map(el => 0);

        //Map raw data to counts in bins
        el.rawRankings.forEach((el1, ind1) => {
            //Determine index for bin to be incremented
            const binIndex: number = Math.floor(el1 / binWidth);
            if (binIndex < binCounts.length) binCounts[binIndex]++;
        });

        //Map bin counts to points of the form IDataPoint; add empty array if this datum is not being displayed
        const result: LineChart.IDataPoint[] = !!el.bDisplayed
            ? binCounts.map((el2, ind2, arr) => ({
                  x: (ind2! * xRangeMax) / arr.length,
                  y: el2
              }))
            : [];

        return result;
    });
    return allPlottingData;
}
