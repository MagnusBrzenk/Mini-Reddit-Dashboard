import * as React from "react";
import { connect } from "react-redux";
import { getAllSubredditStats } from "__REDUX/selectors";
import { SUBREDDITSTAT, SUBREDDITSTATSFEED, ROOTSTATE } from "__MODELS";

import { AppActions } from "__REDUX/actions";
import PREZ from "__UTILS/frontendPresentation";

interface IParentProps {}

interface IState {}

//Never change IProps for containers; it will always be determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

class DashboardComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="dashboard">
                <style jsx>{`
                    .home-page {
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                `}</style>
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
    subredditStats: SUBREDDITSTAT.ImTypes;
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        subredditStats: getAllSubredditStats(state)
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

export const Dashboard = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);
