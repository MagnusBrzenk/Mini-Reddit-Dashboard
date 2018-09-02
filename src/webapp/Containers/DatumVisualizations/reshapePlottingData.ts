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
        //Map raw data to array of counts within histogram-like bins
        if (ind === 0) console.log("------------");

        const binCounts = [...Array(Math.ceil(xRangeMax / binWidth))].map(el => 0);
        console.log("binCounts before", binCounts, " length: ", binCounts.length);
        console.log("rawRankings", el.rawRankings);

        //
        el.rawRankings.forEach((el1, ind1) => {
            //Determine index for bin to be incremented
            const binIndex: number = Math.floor(el1 / binWidth);
            if (binIndex < binCounts.length) binCounts[binIndex]++;
        });
        //
        console.log("binCounts after", binCounts, " length: ", binCounts.length);
        const result = !!el.bDisplayed
            ? binCounts.map((el2, ind2, arr) => ({
                  x: (ind2! * xRangeMax) / arr.length,
                  y: el2
              }))
            : [];

        // console.log("result", result);

        return result;
    });
    return allPlottingData;
}

// posts.forEach((el, ind) => {
//     if (subredditName === el.subredditName) {
//         // binWidth10[Math.floor(ind / 10)]++;
//         // binWidth100[Math.floor(ind / 100)]++;
//         rawRankings.push(ind);
//     }
// });

// import { SUBREDDITDATUM } from "__MODELS";
// import { LineChart } from "__COMPONENTS/LineChart";

// /**
//  * Maps immutable list of subredditDatums to POJ array of arrays of IDataPoint objects
//  * as required by the interface of our LineChart component
//  * @param subredditDatums
//  * @param xRangeMax
//  */
// export function reshapePlottingData(
//     subredditDatums: SUBREDDITDATUM.ImTypes,
//     xRangeMax: number
// ): LineChart.IDataPoint[][] {
//     const allPlottingData: LineChart.IDataPoint[][] = subredditDatums
//         .toJS()

//         .map((el, ind) => {
//             return !!el.bDisplayed
//                 ? el.binWidth100.map((el2, ind2, arr) => ({
//                       x: (ind2! * xRangeMax) / arr.length,
//                       y: el2
//                   }))
//                 : [];
//         });
//     return allPlottingData;
// }
