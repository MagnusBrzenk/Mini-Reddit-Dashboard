import { SUBREDDITDATUM } from '__MODELS';
import { LineChart } from '__COMPONENTS/LineChart';

/**
 * Maps array of subredditDatums to POJ array of arrays of IDataPoint objects
 * as required by the interface of our LineChart component
 * @param subredditDatums
 * @param xRangeMax
 */
export function reshapeSimpleLineChartData(
    subredditDatums: SUBREDDITDATUM.Interface[],
    binWidth: number,
    xRangeMax: number
): LineChart.IDataPoint[][] {
    const allPlottingData: LineChart.IDataPoint[][] = subredditDatums.map((srdatum, ind0) => {
        //

        //Create array to store bin counts
        const binCounts: number[] = [...Array(Math.ceil(xRangeMax / binWidth))].map(el => 0);

        //Map raw data to counts in bins
        srdatum.rawRankings.forEach((rank, ind1) => {
            //Determine index for bin to be incremented
            const binIndex: number = Math.floor(rank / binWidth);
            if (binIndex < binCounts.length) binCounts[binIndex]++;
        });

        //Map bin counts to points of the form IDataPoint; add empty array if this datum is not being displayed
        const result: LineChart.IDataPoint[] = !!srdatum.bDisplayed
            ? binCounts.map((count, ind2) => ({
                  x: ind2 * binWidth,
                  y: count
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
export function reshapePieChartData(subredditDatums: SUBREDDITDATUM.Interface[]): number[] {
    //
    const pieChartData: number[] = subredditDatums.map((el, ind) => {
        const result = !!el.bDisplayed
            ? el.rawRankings.filter((el2, ind2) => {
                  //
                  return ind2! < el.maxRankingFetched;
              }).length
            : 0;

        return result;
    });

    return pieChartData;
}
