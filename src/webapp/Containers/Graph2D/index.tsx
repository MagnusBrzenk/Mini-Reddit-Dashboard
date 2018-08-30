import * as React from "react";
import { connect } from "react-redux";
import { getAllSubredditDatums } from "__REDUX/selectors";
import { SUBREDDITDATUM, SUBREDDITDATA, ROOTSTATE } from "__MODELS";
import { LineChart } from "__COMPONENTS/LineChart";
import { AppActions } from "__REDUX/actions";
import PREZ from "__UTILS/frontendPresentation";
import { reshapePlottingData } from "./reshapePlottingData";

type IDataPoint = LineChart.IDataPoint;

interface IParentProps {
    bShadowed?: boolean;
    xRangeMax: number;
}

interface IState {
    responsiveNumXTicks: number;
}

//Never change IProps for containers; it will always be determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

class Graph2DComponent extends React.Component<IProps, IState> {
    //

    constructor(props: IProps) {
        super(props);
        this.state = {
            responsiveNumXTicks: -1
        };
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    handleWindowResize() {
        const allPlottingData: IDataPoint[][] = reshapePlottingData(this.props.subredditDatums, this.props.xRangeMax);

        const nBins: number = !!allPlottingData.length ? allPlottingData[0].length : 1;
        const responsiveNumXTicks = window.innerWidth < 600 ? -1 : nBins;
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
        // const allPlottingData: IDataPoint[][] = this.props.subredditDatums.toJS().map((el, ind) =>
        //     el.binWidth100.map((el2, ind2, arr) => ({
        //         x: (ind2! * this.props.xRangeMax) / arr.length,
        //         y: el2
        //     }))
        // );

        const allPlottingData: IDataPoint[][] = reshapePlottingData(this.props.subredditDatums, this.props.xRangeMax);

        console.log("%%%%%%%%%%%");
        // console.log(window.outerWidth, window.innerWidth, PREZ.lowerScreenSize);
        // console.log(window.outerWidth < PREZ.lowerScreenSize);
        // console.log(allPlottingData);
        console.log(this.props.subredditDatums.toJS());
        console.log("%%%%%%%%%%%");

        return (
            <div className="graph-2d">
                <style jsx>{`
                    .graph-2d {
                        width: 100%;
                        height: 100%;
                        background-color: ${PREZ.primaryColorDark};
                        box-shadow: ${!!this.props.bShadowed ? PREZ.shadowString : ""};
                    }
                `}</style>
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
interface IReduxCallbacks {
    // cbShowExpandedContact: typeof AppActions.showExpandedContact;
}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {
        //     cbShowExpandedContact: ({ bOpen, bEditing }: { bOpen: boolean; bEditing?: boolean }) =>
        //         dispatch(AppActions.showExpandedContact({ bOpen, bEditing }))
    };
};

export const Graph2D = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(Graph2DComponent);
