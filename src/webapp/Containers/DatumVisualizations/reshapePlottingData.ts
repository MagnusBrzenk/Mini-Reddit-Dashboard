import { SUBREDDITDATUM } from "__MODELS";
import { LineChart } from "__COMPONENTS/LineChart";

/**
 * Maps immutable list of subredditDatums to POJ array of arrays of IDataPoint objects
 * as required by the interface of our LineChart component
 * @param subredditDatums
 * @param xRangeMax
 */
export function reshapeSimpleLineChartData(
    subredditDatums: SUBREDDITDATUM.ImTypes,
    binWidth: number,
    xRangeMax: number
): LineChart.IDataPoint[][] {
    //
    //N.b.: using toJS() here is crude/inefficient, but this frontent is exemplary and not especially data intensive
    const allPlottingData: LineChart.IDataPoint[][] = subredditDatums.toJS().map((el, ind) => {
        //

        //Create array to tore bin counts
        // const binCounts: number[] = [...Array(Math.ceil(xRangeMax / binWidth))].map(el => 0);
        const binCounts: number[] = [...Array(Math.ceil(xRangeMax / binWidth))].map(el => 0);

        //Map raw data to counts in bins
        el.rawRankings.forEach((el1, ind1) => {
            //Determine index for bin to be incremented
            const binIndex: number = Math.floor(el1 / binWidth);
            if (binIndex < binCounts.length) binCounts[binIndex]++;
        });

        //Map bin counts to points of the form IDataPoint; add empty array if this datum is not being displayed
        const result: LineChart.IDataPoint[] = !!el.bDisplayed
            ? binCounts.map((el2, ind2) => ({
                  x: ind2 * binWidth,
                  y: el2
              }))
            : [];

        return result;
    });
    return allPlottingData;
}

/**
 * Maps immutable list of subredditDatums to POJ array of numbers (number of rankings featured in the specified range)
 * as required by the interface of our PieChart component
 * @param subredditDatums
 * @param xRangeMax
 */
export function reshapePieChartData(subredditDatums: SUBREDDITDATUM.ImTypes): number[] {
    //
    const pieChartData: number[] = subredditDatums
        .map((el, ind) => {
            const result = !!el.get("bDisplayed")
                ? el.get("rawRankings").filter((el2, ind2) => {
                      //
                      return ind2! < el.get("maxRankingFetched");
                  }).size
                : 0;

            return result;
        })
        .toJS();

    return pieChartData;
}
