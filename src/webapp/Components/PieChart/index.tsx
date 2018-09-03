import * as React from "react";
import { PieChartD3 } from "./PieChartD3";
import { verifyDataFormat } from "./verifyDataFormat";
import { genUniqueId } from "__UTILS/genUniqueId";

import PREZ from "__UTILS/frontendPresentation";

export namespace PieChart {
    //

    export interface IPieChartParams {
        //
    }

    interface IProps {
        arcData: number[];
        params?: Partial<IPieChartParams>;
    }

    interface IState {
        bPlottingDataFormatVerified: boolean;
    }

    const defaultParams: Readonly<IPieChartParams> = {
        //
    };

    export class Component extends React.Component<IProps, IState> {
        readonly picChartSvgContainerId: string = "pie-chart-svg-container-div-" + genUniqueId();
        readonly pieChart: PieChartD3 = new PieChartD3(this.picChartSvgContainerId);

        constructor(props: IProps) {
            super(props);
            this.state = {
                bPlottingDataFormatVerified: !false
            };
            this.updatePieChart = this.updatePieChart.bind(this);
        }

        componentDidMount() {
            this.pieChart.initPieChart(this.props.arcData, { ...defaultParams, ...this.props.params });

            window.addEventListener("resize", this.updatePieChart);
            this.updatePieChart();
        }
        componentWillUnmount() {
            window.removeEventListener("resize", this.updatePieChart);
        }
        componentDidUpdate(prevProps: IProps) {
            if (prevProps !== this.props) this.updatePieChart();
        }

        updatePieChart() {
            this.pieChart.updatePieChart(this.props.arcData, { ...defaultParams, ...this.props.params });
        }

        render() {
            const params: IPieChartParams = { ...this.props.params, ...defaultParams };
            return (
                <div className={"pie-chart"}>
                    <style jsx>{`
                        .pie-chart {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: ${PREZ.displayWhite};
                        }

                        .svg-container {
                            width: 100%;
                            height: 100%;
                        }

                        /* --------------------------------------- */
                        /* SVG Styles Localized Within .pie-chart */
                        /* --------------------------------------- */

                        .pie-chart :global(.XXX) {
                            fill: none;
                            stroke: ${PREZ.secondaryColor};
                            stroke-width: 3;
                        }
                    `}</style>

                    {!!this.state.bPlottingDataFormatVerified ? (
                        <div className="svg-container" id={this.picChartSvgContainerId} />
                    ) : (
                        "PLOTTING DATA NOT RECEIVED OR PROPERLY FORMATTED"
                    )}
                </div>
            );
        }
    }
}
