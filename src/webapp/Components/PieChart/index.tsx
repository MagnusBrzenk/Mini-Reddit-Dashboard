import * as React from "react";
import { PieChartD3 } from "./PieChartD3";
import { verifyDataFormat } from "./verifyDataFormat";
import { genUniqueId } from "__UTILS/genUniqueId";
import PREZ from "__UTILS/frontendPresentation";

/**
 * Namespace for react component wrapping responsive DIV wherein well-separated d3 logic can perform its pie-charting magic
 */
export namespace PieChart {
    export interface IPieChartParams {
        pieChartShadowSizePxls: number;
    }

    const defaultParams: Readonly<IPieChartParams> = {
        pieChartShadowSizePxls: 5
    };

    interface IProps {
        arcData: number[];
        params?: Partial<IPieChartParams>;
    }

    interface IState {
        bPlottingDataFormatVerified: boolean;
        bSvgInitiated: boolean;
    }

    export class Component extends React.Component<IProps, IState> {
        readonly pieChartSvgContainerId: string = "pie-chart-svg-container-div-" + genUniqueId();
        readonly pieChart: PieChartD3 = new PieChartD3(this.pieChartSvgContainerId);

        constructor(props: IProps) {
            super(props);
            this.state = {
                bPlottingDataFormatVerified: false,
                bSvgInitiated: false //Don't try updating chart till SVG-initiation is finished
            };
            this.initD3PieChart = this.initD3PieChart.bind(this);
            this.updateD3PieChart = this.updateD3PieChart.bind(this);
        }

        componentDidMount() {
            window.addEventListener("resize", this.initD3PieChart);
            this.initD3PieChart();
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.initD3PieChart);
        }

        componentDidUpdate(prevProps: IProps) {
            if (prevProps !== this.props) this.updateD3PieChart();
        }

        initD3PieChart() {
            //Make sure our data has correct format
            this.setState(
                { bPlottingDataFormatVerified: verifyDataFormat(this.props.arcData), bSvgInitiated: false },
                () => {
                    if (!!this.state.bPlottingDataFormatVerified) {
                        //Reset SVG then update chart
                        this.setState(
                            { bSvgInitiated: this.pieChart.resetPieChart({ ...defaultParams, ...this.props.params }) },
                            () => this.updateD3PieChart()
                        );
                    }
                }
            );
        }

        updateD3PieChart() {
            if (!!this.state.bSvgInitiated) {
                this.pieChart.updatePieChart(this.props.arcData, { ...defaultParams, ...this.props.params });
            }
        }

        render() {
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

                        .pie-chart :global(.chart-circle) {
/*
                            fill: ${PREZ.primaryColorDarkest};
                            box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.5);
                            stroke: ${PREZ.secondaryColor};
                            stroke-width: 3;
*/
                        }
                    `}</style>

                    {!!this.state.bPlottingDataFormatVerified ? (
                        <div className="svg-container" id={this.pieChartSvgContainerId} />
                    ) : (
                        "PLOTTING DATA NOT RECEIVED OR PROPERLY FORMATTED"
                    )}
                </div>
            );
        }
    }
}
