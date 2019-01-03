import * as React from 'react';
import { connect } from 'react-redux';
import { getAllSubredditDatums } from '__REDUX/selectors';
import { SUBREDDITDATUM, SUBREDDITDATA, ROOTSTATE } from '__MODELS';
import { LineChart } from '__COMPONENTS/LineChart';
import { PieChart } from '__COMPONENTS/PieChart';
import { AppActions } from '__REDUX/actions';
import PREZ from '__UTILS/frontendPresentation';
import { reshapeSimpleLineChartData, reshapePieChartData } from './reshapePlottingData';

import { PieChart as PieChartIcon } from '__COMPONENTS/@FortawesomeWrappers/PieChart';
import { BarChart as BarChartIcon } from '__COMPONENTS/@FortawesomeWrappers/BarChart';
import { LineChart as LineChartIcon } from '__COMPONENTS/@FortawesomeWrappers/LineChart';
import { StreetView as StreetViewIcon } from '__COMPONENTS/@FortawesomeWrappers/StreetView';

import { TrendyHamburger } from '__COMPONENTS/TrendyHamburger';

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
            responsiveNumXTicks: -1, //
            selectedTab: 0,
            bDisplaySettings: false
        };
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    handleWindowResize() {
        const allPlottingData: IDataPoint[][] = reshapeSimpleLineChartData(
            this.props.subredditDatums,
            this.props.binWidth,
            this.props.maxXRange
        );
        // const nBins: number = !!allPlottingData.length ? allPlottingData[0].length : 1;
        const nBins: number = Math.ceil(this.props.maxXRange / this.props.binWidth);
        const responsiveNumXTicks = window.innerWidth < 700 ? -1 : nBins;
        this.setState({ responsiveNumXTicks });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render() {
        //Local Convenience Vars
        const tab = this.state.selectedTab;

        // Get data for Simple Line Chart
        const simpleLineChartPlottingData: IDataPoint[][] = reshapeSimpleLineChartData(
            this.props.subredditDatums,
            this.props.binWidth,
            this.props.maxXRange
        );

        // Get data for Pie Chart
        // const pieChartArcData: number[] = [1, 2, 3, 4, 5];
        const pieChartArcData = reshapePieChartData(this.props.subredditDatums);

        console.log('++++++++++++++++++++');
        console.log(this.props.subredditDatums);
        console.log(simpleLineChartPlottingData);
        // console.log(pieChartArcData);
        console.log('++++++++++++++++++++');
        return (
            <div className="datum-visualizations">
                <style jsx>{`
                    .datum-visualizations {
                        width: 100%;
                        height: 100%;
                        box-shadow: ${!!this.props.bShadowed ? PREZ.shadowString : ''};
                    }
                    .visualizations-wrapper {
                        width: 100%;
                        height: calc(100% - ${this.props.tabButtonHeightPxls}px);
                        background-color: ${PREZ.primaryColorDark};
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: ${PREZ.displayWhite};
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
                        className={`tab ${tab === 0 ? 'selected-tab' : ''}`}
                        onClick={() => this.setState({ selectedTab: 0 })}
                    >
                        <LineChartIcon color={tab === 0 ? PREZ.displayWhite : PREZ.unhighlightedIconColor} size="2x" />
                    </div>
                    <div
                        className={`tab ${tab === 1 ? 'selected-tab' : ''}`}
                        onClick={() => this.setState({ selectedTab: 1 })}
                    >
                        <PieChartIcon color={tab === 1 ? PREZ.displayWhite : PREZ.unhighlightedIconColor} size="2x" />
                    </div>
                    <div
                        className={`tab ${tab === 2 ? 'selected-tab' : ''}`}
                        onClick={() => this.setState({ selectedTab: 2 })}
                    >
                        <BarChartIcon color={tab === 2 ? PREZ.displayWhite : PREZ.unhighlightedIconColor} size="2x" />
                    </div>
                    <div
                        className={`tab ${tab === 3 ? 'selected-tab' : ''}`}
                        onClick={() => this.setState({ selectedTab: 3 })}
                    >
                        <StreetViewIcon color={tab === 3 ? PREZ.displayWhite : PREZ.unhighlightedIconColor} size="2x" />
                    </div>
                </div>
                <div className="visualizations-wrapper">
                    {tab === 0 && (
                        <LineChart.Component
                            plottingData={simpleLineChartPlottingData}
                            params={{
                                //
                                xAxisLabel: 'All Time Rankings',
                                yAxisLabel: 'Bin Count',
                                axisLabelFontSizePrcnt: '',
                                numXTicks: this.state.responsiveNumXTicks,
                                numYTicks: -1, // -1 => pure function of window size
                                binWidth: this.props.binWidth
                            }}
                        />
                    )}
                    {tab === 1 && (
                        <PieChart.Component arcData={pieChartArcData} params={{ pieChartShadowSizePxls: 5 }} />
                    )}
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
    subredditDatums: SUBREDDITDATUM.Interface[];
    binWidth: number;
    maxXRange: number;
}
function mapStateToProps(state: ROOTSTATE.Interface): IReduxStateToProps {
    return {
        subredditDatums: getAllSubredditDatums(state),
        binWidth: state.subredditData.binWidth, // state.get('subredditData').get('binWidth'),
        maxXRange: state.subredditData.maxXRange //state.get('subredditData').get('maxXRange')
    };
}

/**
 * Callbacks to trigger actions to manipulate redux state
 */
interface IReduxCallbacks {}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {};
};

export const DatumVisualizations = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.Interface>(
    mapStateToProps,
    mapDispatchToProps
)(DatumVisualizationsComponent);
