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
    }

    interface IProps {
        plottingData: IDataPoint[][];
        params?: IChartParams;
    }

    const defaultParams: IChartParams = {
        bCurvedLine: true,
        bBinCentering: false,
        axesColor: PREZ.displayWhite
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
        drawChart() {
            const plottingData: IDataPoint[][] = this.props.plottingData;
            const params: IChartParams = { ...defaultParams, ...this.props.params };
            drawD3Chart(this.lineChartDivId, plottingData, params);
        }

        render() {
            const params: IChartParams = { ...this.props.params, ...defaultParams };
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
                            // stroke: #ffab;
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

                        .line-chart :global(.axis),
                        .line-chart :global(.axis path),
                        .line-chart :global(.axis line),
                        .line-chart :global(.axis text) {
                            stroke: ${params.axesColor};
                            // fill: steelblue;
                            // font-size: 100%;
                        }
                    `}</style>
                </div>
            );
        }
    }
}
