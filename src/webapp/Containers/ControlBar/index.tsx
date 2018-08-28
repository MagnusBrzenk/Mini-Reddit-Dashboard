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
}

interface IState {}

//Never change IProps for containers; it will always be determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

class ControlBarComponent extends React.Component<IProps, IState> {
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
        return (
            <div className="graph-2d">
                <style jsx>{`
                    .graph-2d {
                        width: 100%;
                        height: 100%;
                        color: white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: ${PREZ.primaryColorDark};
                        box-shadow: ${PREZ.shadowString};
                    }
                `}</style>
                Mini-Reddit Dashboard
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

export const ControlBar = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(ControlBarComponent);
