import { SUBREDDITDATUM } from "__MODELS";
import { LineChart } from "__COMPONENTS/LineChart";

/**
 * Maps immutable list of subredditDatums to POJ array of arrays of IDataPoint objects
 * required by the interface of our LineChart component
 * @param subredditDatums
 * @param xRangeMax
 */
export function reshapePlottingData(
    subredditDatums: SUBREDDITDATUM.ImTypes,
    xRangeMax: number
): LineChart.IDataPoint[][] {
    const allPlottingData: LineChart.IDataPoint[][] = subredditDatums
        .toJS()
        .filter(el => !!el.bDisplayed)
        .map((el, ind) =>
            el.binWidth100.map((el2, ind2, arr) => ({
                x: (ind2! * xRangeMax) / arr.length,
                y: el2
            }))
        );
    console.log("?????????????????", subredditDatums.toJS(), allPlottingData, allPlottingData.length);
    return allPlottingData;
}
