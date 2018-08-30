import * as React from "react";
import { drawD3Chart } from "./drawD3Chart";
import { genUniqueId } from "__UTILS/genUniqueId";
import PREZ from "__UTILS/frontendPresentation";

export namespace LineChart {
    export interface IDataPoint {
        x: number;
        y: number;
    }

    export interface IChartParams {
        bCurvedLine: boolean;
        bBinCentering: boolean;
        axesColor: string;
        xAxisLabel: string;
        yAxisLabel: string;
        numXTicks: number | undefined;
        numYTicks: number | undefined;
        axisLabelFontSizePrcnt: string;
    }

    interface IProps {
        plottingData: IDataPoint[][];
        params?: Partial<IChartParams>;
    }

    const defaultParams: Readonly<IChartParams> = {
        bCurvedLine: true,
        bBinCentering: false,
        axesColor: PREZ.displayWhite,
        xAxisLabel: "X-AXIS",
        yAxisLabel: "Y-AXIS",
        numXTicks: undefined, // undefined => let d3 decide; -1 => let window size decide
        numYTicks: undefined,
        axisLabelFontSizePrcnt: "100%"
    };

    export class Component extends React.Component<IProps, {}> {
        readonly lineChartDivId: string = "line-chart-div-" + genUniqueId();

        constructor(props: IProps) {
            super(props);
            this.drawChart = this.drawChart.bind(this);
        }

        componentDidMount() {
            window.addEventListener("resize", this.drawChart);
            this.drawChart();
        }
        componentWillUnmount() {
            window.removeEventListener("resize", this.drawChart);
        }
        componentDidUpdate(prevProps: IProps) {
            if (prevProps !== this.props) this.drawChart();
        }

        /**
         * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         *        Component's Interface with D3 Functionality - DO NOT EDIT!
         * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
         * This is the sole gateway through which we pass through the unique id for
         * the svg-wrapper div, data to-be-plotted, and presentation parameters.
         * Default presentation parameters are supplied if not specified in the
         * component's props
         */
        drawChart() {
            const plottingData: IDataPoint[][] = this.props.plottingData;
            const params: IChartParams = { ...defaultParams, ...this.props.params };
            drawD3Chart(this.lineChartDivId, plottingData, params);
        }

        render() {
            const params: IChartParams = { ...this.props.params, ...defaultParams };
            const axisLabelFontSizePrcnt = !!params.axisLabelFontSizePrcnt ? "" : "";
            return (
                <div
                    className={"line-chart"}
                    id={this.lineChartDivId}
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <style jsx>{`
                        /* --------------------------------------- */
                        /* SVG Styles Localized Within .line-chart */
                        /* --------------------------------------- */

                        .line-chart :global(.line) {
                            fill: none;
                            stroke: ${PREZ.secondaryColor};
                            stroke-width: 3;
                        }

                        .line-chart :global(.overlay) {
                            fill: none;
                            pointer-events: all;
                        }

                        .line-chart :global(.dot) {
                            fill: ${PREZ.secondaryColor};
                            stroke: ${PREZ.secondaryColor};
                        }

                        .line-chart :global(.focus) {
                            fill: rgba(0, 0, 0, 0);
                            stroke: steelblue;
                        }

                        .line-chart :global(.axis path),
                        .line-chart :global(.axis line) {
                            stroke: ${params.axesColor};
                        }
                        .line-chart :global(.axis text) {
                            // font-family: "Courier", sans-serif;
                            font-weight: normal;
                            fill: ${params.axesColor};
                        }

                        .line-chart :global(.axes-label-text) {
                            fill: ${params.axesColor};
                            text-anchor: middle;
                            font-size: ${axisLabelFontSizePrcnt};
                            alignment-baseline: middle;
                            // font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
                            // font-family: "Dosis", sans-serif;
                            // font-family: "Courier", sans-serif;
                        }
                    `}</style>
                </div>
            );
        }
    }
}
