import * as React from "react";
import { connect } from "react-redux";
import { getAllSubredditDatums } from "__REDUX/selectors";
import { SUBREDDITDATUM, SUBREDDITDATA, ROOTSTATE } from "__MODELS";
import { TrendyHamburger } from "__COMPONENTS/TrendyHamburger";
import { AppActions } from "__REDUX/actions";
import PREZ from "__UTILS/frontendPresentation";
import { genUniqueId } from "__UTILS/genUniqueId";

interface IParentProps {
    bShadowed?: boolean;
}

interface IState {
    bHamburgerChecked: boolean;
}

//Never change IProps for containers; it will always be determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

class ControlBarComponent extends React.Component<IProps, IState> {
    //unique-id references
    readonly binWidthInputId: string = "bin-width-input-" + genUniqueId();
    readonly maxRangeInputId: string = "max-range-input-" + genUniqueId();
    readonly controlFormName: string = "control-bar-form-" + genUniqueId();

    //control params
    readonly deltaBinWidth: number = 25;
    readonly deltaXRange: number = 100;
    readonly maxMaxXRange: number = 5000;

    constructor(props: IProps) {
        super(props);
        this.state = { bHamburgerChecked: !false };
        this.toggleHamburger = this.toggleHamburger.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.incrementBinWidth = this.incrementBinWidth.bind(this);
        this.incrementMaxXRange = this.incrementMaxXRange.bind(this);
    }

    toggleHamburger() {
        this.setState(oldState => ({ bHamburgerChecked: !oldState.bHamburgerChecked }));
    }

    //Specify ±1 to increment binWidth by ±this.deltaBinWidth
    incrementBinWidth(dirn: -1 | 1) {
        const binWidthInput: HTMLElement | null = document.getElementById(this.binWidthInputId);
        if (!!binWidthInput) {
            //Test whether this change would keep the new binWidth within sensible bounds and update binWidth accordingly
            const provisionalNewBinWidth = this.props.binWidth + dirn * this.deltaBinWidth;
            const bLowerBoundTest = provisionalNewBinWidth >= this.deltaBinWidth;
            const bUpperBoundTest = provisionalNewBinWidth <= this.props.maxXRange;
            const newBinWidth = bLowerBoundTest && bUpperBoundTest ? provisionalNewBinWidth : this.props.binWidth;
            //Set new value to input field and redux state
            (binWidthInput as HTMLInputElement).value = Math.round(newBinWidth) + "";
            this.props.cbSetBinWidth(newBinWidth);
        }
    }

    //Specify ±1 to increment maxXRange by ±this.deltaXRange
    incrementMaxXRange(dirn: -1 | 1) {
        const maxXRangeInput: HTMLElement | null = document.getElementById(this.maxRangeInputId);
        if (!!maxXRangeInput) {
            //Test whether this change would keep the new maxXRange within sensible bounds and update maxXRange accordingly
            const provisionalNewMaxXRange = this.props.maxXRange + dirn * this.deltaXRange;
            const bLowerBoundTest = provisionalNewMaxXRange >= this.props.binWidth;
            const bUpperBoundTest = provisionalNewMaxXRange <= this.maxMaxXRange;
            const newMaxXRange = bLowerBoundTest && bUpperBoundTest ? provisionalNewMaxXRange : this.props.maxXRange;
            //Set new value to input field and redux state
            (maxXRangeInput as HTMLInputElement).value = Math.round(newMaxXRange) + "";
            this.props.cbSetMaxXRange(newMaxXRange);
        }
    }

    handleFormSubmission(e: React.FormEvent) {
        //Didnt end up using; might be worth removing form altogether
    }

    render() {
        const inputFieldWrapperLabelHeightPxls = 10;
        const inputFieldWrapperInputHeightPxls = 30;
        const inputFieldWrapperHeightPxls = inputFieldWrapperLabelHeightPxls + inputFieldWrapperInputHeightPxls;
        const animationDurationSecs = 0.5;
        const bufferSideBorderString = "10px solid rgba(255, 0, 0, 0)";
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
                        cursor: pointer;
                    }

                    .title-wrapper {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 20px;
                        padding: 20px 0px;
                        font-size: 20px;
                        box-sizing: border-box;
                    }
                    .hamburger-icon-wrapper {
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        height: 100%;
                        transform: scale(0.4);
                        background-color: rgba(255, 0, 0, 0);
                    }

                    .controls-form {
                        width: 100%;
                        background-color: rgba(0, 0, 255, 0);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .control-wrapper {
                        max-width: 150px;
                        flex: 1;
                        height: ${this.state.bHamburgerChecked ? inputFieldWrapperHeightPxls : 0}px;
                        transition: height ${animationDurationSecs}s ease-in-out;
                        box-sizing: border-box;
                        border-left: ${bufferSideBorderString};
                        display: flex;
                        flex-direction: column;
                        overflow: hidden;
                    }
                    .control-wrapper:last-of-type {
                        border-right: ${bufferSideBorderString};
                    }
                    .control-wrapper label {
                        width: 100%;
                        height: ${inputFieldWrapperLabelHeightPxls}px;
                        align-content: center;
                        text-align: center;
                        font-size: ${inputFieldWrapperLabelHeightPxls}px;
                        color: ${PREZ.unhighlightedTextColor};
                    }
                    .input-field-wrapper {
                        flex: 1;
                        height: ${inputFieldWrapperInputHeightPxls}px;
                        font-size: 100%;
                        // color: ${PREZ.displayWhite};
                        color: ${PREZ.unhighlightedTextColor};
                        text-align: center;
                        background-color: rgba(255, 255, 255, 0.05);
                        border: none;
                        border-bottom: 0px solid ${PREZ.displayWhite};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .tri-button {
                        flex: 1;
                        height: 100%;
                        background-color: rgba(0, 0, 255, 0);
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .input-field {
                        flex: 3;
                        min-width: 1px;
                        height: ${inputFieldWrapperInputHeightPxls}px;
                        background-color: rgba(255, 255, 255, 0);
                        // color: ${PREZ.displayWhite};
                        color: ${PREZ.unhighlightedTextColor};
                        text-align: center;
                        border: none;
                        box-sizing: border-box;
                        border-bottom: 0px solid ${PREZ.displayWhite};
                        font-size: ${Math.round(0.7 * inputFieldWrapperInputHeightPxls)}px;
                    }
                    .input-field::placeholder {
                        color: ${PREZ.unhighlightedTextColor};
                    }
                `}</style>

                <div className="title-wrapper">
                    {"Mini-Reddit Dashboard"}
                    <div
                        className={`hamburger-icon-wrapper`}
                        onClick={() => this.setState(oldState => ({ bHamburgerChecked: !oldState.bHamburgerChecked }))}
                    >
                        <TrendyHamburger
                            bChecked={this.state.bHamburgerChecked}
                            color={PREZ.displayWhite}
                            durationSecs={animationDurationSecs}
                        />
                    </div>
                </div>

                <form //
                    className="controls-form"
                    autoComplete="off"
                    onSubmit={e => this.handleFormSubmission(e)}
                    name={this.controlFormName}
                >
                    <div className="control-wrapper">
                        <label htmlFor={this.binWidthInputId}>{"BIN WIDTH"}</label>
                        <div className="input-field-wrapper">
                            <div className="tri-button" onClick={() => this.incrementBinWidth(1)}>
                                ▲
                            </div>
                            <input
                                className="input-field"
                                id={this.binWidthInputId}
                                onChange={e => null}
                                name="bin-width-input-field"
                                placeholder="100"
                                defaultValue="100"
                                required
                            />
                            <div className="tri-button" onClick={() => this.incrementBinWidth(-1)}>
                                ▼
                            </div>
                        </div>
                    </div>

                    <div className="control-wrapper">
                        <label htmlFor={this.maxRangeInputId}>{"MAX RANGE"}</label>
                        <div className="input-field-wrapper">
                            <div className="tri-button" onClick={() => this.incrementMaxXRange(1)}>
                                ▲
                            </div>
                            <input
                                className="input-field"
                                id={this.maxRangeInputId}
                                onChange={e => null}
                                name="max-range-input-field"
                                placeholder="1000"
                                defaultValue="1000"
                                required
                            />
                            <div className="tri-button" onClick={() => this.incrementMaxXRange(-1)}>
                                ▼
                            </div>
                        </div>
                    </div>
                </form>
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
    binWidth: number;
    maxXRange: number;
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        subredditDatums: getAllSubredditDatums(state),
        binWidth: state.get("subredditData").get("binWidth"),
        maxXRange: state.get("subredditData").get("maxXRange")
    };
}

/**
 * Callbacks to trigger actions to manipulate redux state
 */
interface IReduxCallbacks {
    cbSetBinWidth: typeof AppActions.setBinWidth;
    cbSetMaxXRange: typeof AppActions.setMaxXRange;
    cbAddSubredditDatumToFeed: typeof AppActions.fetchSubredditDatum;
}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {
        cbSetBinWidth: (newWidth: number) => dispatch(AppActions.setBinWidth(newWidth)),
        cbSetMaxXRange: (newMaxXRange: number) => dispatch(AppActions.setMaxXRange(newMaxXRange)),
        cbAddSubredditDatumToFeed: (subredditName: string) => dispatch(AppActions.fetchSubredditDatum(subredditName))
    };
};

export const ControlBar = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(ControlBarComponent);
