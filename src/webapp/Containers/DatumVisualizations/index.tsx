import * as React from "react";
import { connect } from "react-redux";
import { getAllSubredditDatums } from "__REDUX/selectors";
import { SUBREDDITDATUM, SUBREDDITDATA, ROOTSTATE } from "__MODELS";
import { LineChart } from "__COMPONENTS/LineChart";
import { AppActions } from "__REDUX/actions";
import PREZ from "__UTILS/frontendPresentation";
import { reshapePlottingData } from "./reshapePlottingData";

import { PieChart as PieChartIcon } from "__COMPONENTS/@FortawesomeWrappers/PieChart";
import { BarChart as BarChartIcon } from "__COMPONENTS/@FortawesomeWrappers/BarChart";
import { LineChart as LineChartIcon } from "__COMPONENTS/@FortawesomeWrappers/LineChart";
import { StreetView as StreetViewIcon } from "__COMPONENTS/@FortawesomeWrappers/StreetView";

import { TrendyHamburger } from "__COMPONENTS/TrendyHamburger";

type IDataPoint = LineChart.IDataPoint;

interface IParentProps {
    bShadowed?: boolean;
    tabButtonHeightPxls: number;
}

interface IState {
    xRangeMax: number;
    bDisplaySettings: boolean;
    responsiveNumXTicks: number;
    selectedTab: 0 | 1 | 2 | 3;
}

type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

/**
 * This container:
 * i) Gets subredditDatums from redux and reshapes the data
 * ii) Provides tabs for different visualizations
 * iii) Renders specified visualization
 * iv) Enables user to adjust bin width, etc.
 */
class DatumVisualizationsComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            xRangeMax: 1000,
            responsiveNumXTicks: -1,
            selectedTab: 0,
            bDisplaySettings: false
        };
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    handleWindowResize() {
        const allPlottingData: IDataPoint[][] = reshapePlottingData(this.props.subredditDatums, this.state.xRangeMax);
        const nBins: number = !!allPlottingData.length ? allPlottingData[0].length : 1;
        const responsiveNumXTicks = window.innerWidth < 700 ? -1 : nBins;
        this.setState({ responsiveNumXTicks });
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
        this.handleWindowResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    render() {
        const allPlottingData: IDataPoint[][] = reshapePlottingData(this.props.subredditDatums, this.state.xRangeMax);
        const tab = this.state.selectedTab;
        return (
            <div className="datum-visualizations">
                <style jsx>{`
                    .datum-visualizations {
                        width: 100%;
                        height: 100%;
                        box-shadow: ${!!this.props.bShadowed ? PREZ.shadowString : ""};
                    }
                    .visualizations-wrapper {
                        width: 100%;
                        height: calc(100% - ${this.props.tabButtonHeightPxls}px);
                        background-color: ${PREZ.primaryColorDark};
                        position: relative;
                    }
                    .tabs-wrapper {
                        width: 100%;
                        height: ${this.props.tabButtonHeightPxls}px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .tab {
                        height: 100%;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: rgba(0, 0, 0, 0);
                    }
                    .selected-tab {
                        background-color: ${PREZ.primaryColorDark};
                    }
                `}</style>

                <div className="tabs-wrapper">
                    <div
                        className={`tab ${tab === 0 ? "selected-tab" : ""}`}
                        onClick={() => this.setState({ selectedTab: 0 })}
                    >
                        <LineChartIcon color={tab === 0 ? PREZ.displayWhite : PREZ.unhighlightedIconColor} size="2x" />
                    </div>
                    <div
                        className={`tab ${tab === 1 ? "selected-tab" : ""}`}
                        onClick={() => this.setState({ selectedTab: 1 })}
                    >
                        <PieChartIcon color={tab === 1 ? PREZ.displayWhite : PREZ.unhighlightedIconColor} size="2x" />
                    </div>
                    <div
                        className={`tab ${tab === 2 ? "selected-tab" : ""}`}
                        onClick={() => this.setState({ selectedTab: 2 })}
                    >
                        <BarChartIcon color={tab === 2 ? PREZ.displayWhite : PREZ.unhighlightedIconColor} size="2x" />
                    </div>
                    <div
                        className={`tab ${tab === 3 ? "selected-tab" : ""}`}
                        onClick={() => this.setState({ selectedTab: 3 })}
                    >
                        <StreetViewIcon color={tab === 3 ? PREZ.displayWhite : PREZ.unhighlightedIconColor} size="2x" />
                    </div>
                </div>
                <div className="visualizations-wrapper">
                    {tab === 0 && (
                        <LineChart.Component
                            plottingData={allPlottingData}
                            params={{
                                //
                                xAxisLabel: "All Time Rankings",
                                yAxisLabel: "Bin-Width-100 Count",
                                axisLabelFontSizePrcnt: "",
                                numXTicks: this.state.responsiveNumXTicks,
                                numYTicks: -1, // -1 => pure function of window size
                                bBinCentering: true
                            }}
                        />
                    )}
                    {tab === 1 && <div>COMING SOON!</div>}
                    {tab === 2 && <div>COMING SOON!</div>}
                    {tab === 3 && <div>COMING SOON!</div>}
                </div>
            </div>
        );
    }
}

//////////////////////////////////////////////////////////////////////////
//// Code below concerns setup of the smart props to/from redux store ////
//////////////////////////////////////////////////////////////////////////

/**
 * Data sent from redux state to component props via selectors
 */
interface IReduxStateToProps {
    subredditDatums: SUBREDDITDATUM.ImTypes;
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        subredditDatums: getAllSubredditDatums(state)
    };
}

/**
 * Callbacks to trigger actions to manipulate redux state
 */
interface IReduxCallbacks {}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {};
};

export const DatumVisualizations = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(DatumVisualizationsComponent);