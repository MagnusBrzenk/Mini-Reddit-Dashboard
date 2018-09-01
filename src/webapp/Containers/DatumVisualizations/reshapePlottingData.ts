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
    xRangeMax: number
): LineChart.IDataPoint[][] {
    const allPlottingData: LineChart.IDataPoint[][] = subredditDatums
        .toJS()

        .map((el, ind) => {
            return !!el.bDisplayed
                ? el.binWidth100.map((el2, ind2, arr) => ({
                      x: (ind2! * xRangeMax) / arr.length,
                      y: el2
                  }))
                : [];
        });
    return allPlottingData;
}
