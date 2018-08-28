import * as React from "react";
import D3Controller from "./D3Controller";
import { genUniqueId } from "__UTILS/genUniqueId";

interface IProps {
    plottingData: any;
}

interface IState {
    //
}

export namespace LineChart {
    //

    export interface IDataPoint {
        x: number;
        y: number;
    }

    export class Component extends React.Component<IProps, IState> {
        //

        // private d3RootElement: HTMLDivElement | null = null;
        private D3Controller: D3Controller | undefined;
        readonly lineChartDivId: string = "line-chart-div-" + genUniqueId();

        constructor(props: IProps) {
            super(props);
            this.state = {};
            this.handleWindowResize = this.handleWindowResize.bind(this);
        }

        /////////////////////////////////////
        // Life-Cycle Methods
        /////////////////////////////////////

        componentDidMount() {
            this.D3Controller = new D3Controller(this.lineChartDivId, this.props.plottingData);
            window.addEventListener("resize", this.handleWindowResize);
        }

        componentDidUpdate() {
            //
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.handleWindowResize);
        }

        /////////////////////////////////////
        // Custom Methods
        /////////////////////////////////////

        handleWindowResize() {
            console.log("XXX");
            if (!!this.D3Controller) this.D3Controller.drawD3Chart();
        }

        render() {
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
                            stroke: #ffab00;
                            stroke-width: 3;
                        }

                        .line-chart :global(.overlay) {
                            fill: none;
                            pointer-events: all;
                        }

                        .line-chart :global(.dot) {
                            fill: #ffab00;
                            stroke: #fff;
                        }

                        .line-chart :global(.focus) {
                            fill: rgba(0, 0, 0, 0);
                            stroke: steelblue;
                        }
                    `}</style>
                </div>
            );
        }
    }
}
