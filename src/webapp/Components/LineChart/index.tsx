import * as React from "react";
import { drawD3Chart } from "./drawD3Chart";
import { verifyDataFormat } from "./verifyDataFormat";
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

    interface IState {
        bPlottingDataFormatVerified: boolean;
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

    export class Component extends React.Component<IProps, IState> {
        readonly svgContainerId: string = "svg-container-div-" + genUniqueId();

        constructor(props: IProps) {
            super(props);
            this.state = {
                bPlottingDataFormatVerified: false
            };
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
         * This is the sole gateway through which we pass the unique id for
         * the svg-wrapper div, data to-be-plotted, and presentation parameters.
         * Default presentation parameters are supplied if not specified in the
         * component's props
         */
        drawChart() {
            const plottingData: IDataPoint[][] = this.props.plottingData;
            const bPlottingDataFormatVerified = verifyDataFormat(plottingData);

            // console.log("- - - - - - - - - ");
            // console.log(plottingData);
            // console.log(bPlottingDataFormatVerified);
            // console.log("- - - - - - - - - ");

            if (!!bPlottingDataFormatVerified) {
                this.setState({ bPlottingDataFormatVerified: true }, () => {
                    const params: IChartParams = { ...defaultParams, ...this.props.params };
                    drawD3Chart(this.svgContainerId, plottingData, params);
                });
            } else {
                this.setState({ bPlottingDataFormatVerified: false });
            }
        }

        render() {
            const params: IChartParams = { ...this.props.params, ...defaultParams };
            const axisLabelFontSizePrcnt = !!params.axisLabelFontSizePrcnt ? "" : "";
            return (
                <div className={"line-chart"}>
                    <style jsx>{`
                        .line-chart {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            alignitems: center;
                            justifycontent: center;
                            color: ${PREZ.displayWhite};
                        }

                        .svg-container {
                            width: 100%;
                            height: 100%;
                        }

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

                    {!!this.state.bPlottingDataFormatVerified ? (
                        <div className="svg-container" id={this.svgContainerId} />
                    ) : (
                        "PLOTTTING DATA NOT RECEIVED OR PROPERLY FORMATTED"
                    )}
                </div>
            );
        }
    }
}
