import * as React from "react";
import D3Controller from "./D3Controller";
import { genUniqueId } from "__UTILS/genUniqueId";
import PREZ from "__UTILS/frontendPresentation";

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
        readonly lineChartDivId: string = "line-chart-div-" + genUniqueId();
        private D3Controller: D3Controller = new D3Controller(this.lineChartDivId);

        constructor(props: IProps) {
            super(props);
            this.state = {};
            this.handleWindowResize = this.handleWindowResize.bind(this);
        }

        /////////////////////////////////////
        // Life-Cycle Methods
        /////////////////////////////////////

        componentDidMount() {
            console.log("^^^^^ &&& ^^^^^");
            console.log(this.props.plottingData);
            console.log("^^^^^^^ &&& ^^^^^^");
            // this.D3Controller = ;
            window.addEventListener("resize", this.handleWindowResize);
            this.D3Controller.drawD3Chart(this.props.plottingData);
        }

        componentDidUpdate(prevProps: IProps) {
            //
            if (prevProps !== this.props)
                if (!!this.D3Controller) this.D3Controller.drawD3Chart(this.props.plottingData);
        }

        componentWillUnmount() {
            window.removeEventListener("resize", this.handleWindowResize);
        }

        /////////////////////////////////////
        // Custom Methods
        /////////////////////////////////////

        handleWindowResize() {
            console.log("XXX");
            if (!!this.D3Controller) this.D3Controller.drawD3Chart(this.props.plottingData);
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
                            // stroke: #ffab;
                            stroke: ${PREZ.secondaryColor};
                            stroke-width: 3;
                        }

                        .line-chart :global(.overlay) {
                            fill: none;
                            pointer-events: all;
                        }

                        .line-chart :global(.dot) {
                            /*
                            fill: #ffab00;
                            stroke: #fff;
                            */
                            fill: ${PREZ.secondaryColor};
                            stroke: ${PREZ.secondaryColor};
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
