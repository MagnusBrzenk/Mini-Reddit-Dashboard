import * as React from "react";
import { connect } from "react-redux";
import { getAllSubredditDatums } from "__REDUX/selectors";
import { SUBREDDITDATUM, SUBREDDITDATA, ROOTSTATE } from "__MODELS";

import { LineChart } from "__COMPONENTS/LineChart";

type IDataPoint = LineChart.IDataPoint;

import { AppActions } from "__REDUX/actions";
import PREZ from "__UTILS/frontendPresentation";

// import D3Line from ''
// import D3LineGraph from "./D3LineGraph";

interface IParentProps {
    bShadowed?: boolean;
    maxX: number;
}

interface IState {}

//Never change IProps for containers; it will always be determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

class Graph2DComponent extends React.Component<IProps, IState> {
    //

    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //Create d3 chart
    }

    componentDidUpdate() {
        //
    }

    componentWillUnmount() {
        //
    }

    render() {
        const allPlottingData: IDataPoint[][] = this.props.subredditDatums.toJS().map((el, ind) =>
            el.binWidth100.map((el2, ind2, arr) => ({
                x: (ind2! * this.props.maxX) / arr.length,
                y: el2
            }))
        );

        console.log("%%%%%%%%%%%");
        console.log(allPlottingData);
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
                <LineChart.Component plottingData={allPlottingData} />
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
