import * as React from "react";
import { connect } from "react-redux";
import { getAllSubredditDatums } from "__REDUX/selectors";
import { SUBREDDITDATUM, SUBREDDITDATA, ROOTSTATE } from "__MODELS";
import { TrendyHamburger } from "__COMPONENTS/TrendyHamburger";
import { AppActions } from "__REDUX/actions";
import PREZ from "__UTILS/frontendPresentation";
import { genUniqueId } from "__UTILS/genUniqueId";

// import D3Line from ''
// import D3LineGraph from "./D3LineGraph";

interface IParentProps {
    bShadowed?: boolean;
}

interface IState {
    bHamburgerChecked: boolean;
}

//Never change IProps for containers; it will always be determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

class ControlBarComponent extends React.Component<IProps, IState> {
    readonly binWidthInputId: string = "bin-width-input-" + genUniqueId();

    constructor(props: IProps) {
        super(props);
        this.state = { bHamburgerChecked: true };
        this.toggleHamburger = this.toggleHamburger.bind(this);
    }

    toggleHamburger() {
        this.setState(oldState => ({ bHamburgerChecked: !oldState.bHamburgerChecked }));
    }

    render() {
        return (
            <div className="control-bar">
                <style jsx>{`
                    .control-bar {
                        width: 100%;
                        height: 100%;
                        color: white;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background-color: ${PREZ.primaryColorDark};
                        box-shadow: ${PREZ.shadowString};
                        padding: 10px 0px;
                    }
                    .controls-form {
                        background-color: rgba(0, 0, 255, 0.05);
                        display: flex;
                        flex-direction: row;
                    }
                    .input-wrapper {
                        flex: 1 1 50%;
                        display: flex;
                        flex-direction: column;
                        // height: 60px;
                    }
                    .input-field {
                        width: 100px;
                        height: 25px
                        flex: 1 1 100px;
                        font-size: 100%;
                        color: ${PREZ.displayWhite};
                        text-align: center;
                        background-color: rgba(255, 255, 255, 0.05);
                        border: none;
                        border-bottom: 0px solid ${PREZ.displayWhite};
                    }
                    .input-field::placeholder {
                        color: ${PREZ.unhighlightedTextColor};
                    }
                    label {
                        align-content: center;
                        text-align: center;
                        font-size: 50%;
                    }
                `}</style>
                <h3> Mini-Reddit Dashboard</h3>

                <div className="controls-form-wrapper">
                    <form className="controls-form" autoComplete="off">
                        <div className="input-wrapper">
                            <label htmlFor={this.binWidthInputId}>{"BIN WIDTH"}</label>
                            <input
                                className="input-field bin-width-input"
                                id={this.binWidthInputId}
                                onChange={e => null}
                                name="bin-width-input"
                                placeholder="BIN WIDTH"
                                required
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor={this.binWidthInputId}>{"MAX RANK"}</label>
                            <input
                                className="input-field max-rank-input"
                                onChange={e => null}
                                name="max-rank-input"
                                placeholder="MAX RANK"
                                required
                            />
                        </div>
                    </form>
                </div>

                <div className="trendy-hamburger-wrapper" onClick={() => this.toggleHamburger()}>
                    <TrendyHamburger bChecked={this.state.bHamburgerChecked} />
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
