import * as React from "react";
import Immutable from "immutable";
import { getImType } from "__METATYPING";
import { connect } from "react-redux";
import { getAllSubredditDatums } from "__REDUX/selectors";
import { genUniqueId } from "__UTILS/genUniqueId";
import { SUBREDDITDATUM, SUBREDDITDATA, ROOTSTATE } from "__MODELS";
import { AppActions } from "__REDUX/actions";
import { CloseWindowIcon } from "__COMPONENTS/@FortawesomeWrappers/CloseWindowIcon";
import PREZ from "__UTILS/frontendPresentation";

interface IParentProps {
    bShadowed?: boolean;
    searchFieldHeightPxls: number;
}

interface IState {
    searchWord: string;
}

type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

class SubredditsMenuComponent extends React.Component<IProps, IState> {
    private searchSubredditInputFieldId: string = "search-subreddit-input-field-" + genUniqueId();

    constructor(props: IProps) {
        super(props);
        this.state = {
            searchWord: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickOnMatchedSubredditItem = this.handleClickOnMatchedSubredditItem.bind(this);
    }

    componentDidMount() {
        //Add some of the top subreddits
        ["pics", "funny", "videos", "worldnews", "aww"].forEach(el => this.props.cbAddSubredditDatumToFeed(el));
    }

    handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        const searchWord: string = e.currentTarget.value;
        this.setState({ searchWord }, () => {
            if (this.state.searchWord.length >= 3) this.props.cbSearchForSubbreddit(this.state.searchWord);
            else this.props.cbClearSubredditSearch();
        });
    }

    handleClickOnMatchedSubredditItem(index: number) {
        //Add name of subreddit to datums
        const subredditName: string = this.props.matchedSubreddits.get(index);
        this.props.cbAddSubredditDatumToFeed(subredditName);
        //Reset input field
        const inputField: HTMLElement | null = document.getElementById(this.searchSubredditInputFieldId);
        if (!!inputField) (inputField as HTMLInputElement).value = "";
        this.setState({ searchWord: "" });
    }

    handleClickOnDatumItem(index: number) {
        this.props.cbHideSubredditDatum(index);
    }

    handleClickOnDatumCloseIcon(event: React.MouseEvent<HTMLElement>, index: number) {
        event.stopPropagation();
        this.props.cbRemoveSubredditDatum(index);
    }

    render() {
        //Presentation params
        const itemBorderColor = "rgba(255,255,255,0.05)";
        const textIndentPxls: number = 10;
        const datumHeightPxls: number = 40;
        // State params
        const { matchedSubreddits, subredditDatums } = this.props;
        const { searchWord } = this.state;
        //Derived params
        const bDisplayMatchedSubreddits = searchWord.length >= 3;
        const colorPallete = PREZ.qualitativeColorPalette;

        return (
            <div className="subreddits-menu">
                <style jsx>{`
                    .subreddits-menu {
                        width: 100%;
                        height: 100%;
                        box-shadow: ${!!this.props.bShadowed ? PREZ.shadowString : ""};
                        background-color: ${PREZ.primaryColorDark};
                    }
                    /* FORM */
                    .form-wrapper {
                    }
                    .subreddits-search-form {
                        width: 100%;
                    }
                    .search-subreddits-input-field {
                        box-sizing: border-box;
                        background-color: rgba(255, 255, 255, 0.01);
                        border: 0px solid rgba(255, 255, 255, 0.25);
                        border-bottom: 0px solid rgba(255, 255, 255, 0.25);
                        margin: 1px 0px;
                        width: 100%;
                        height: ${this.props.searchFieldHeightPxls}px;
                        text-indent: ${textIndentPxls}px;
                        color: white;
                    }
                    .search-subreddits-input-field::placeholder {
                        font-size: 120%;
                        transform: translateX(0px);
                        color: ${PREZ.unhighlightedTextColor};
                    }

                    /* MENU BODY */
                    .subreddits-menu-items-wrapper {
                        width: 100%;
                        height: calc(100% - ${this.props.searchFieldHeightPxls}px);
                        overflow: scroll;
                    }

                    /* SEARCH-RESULTS BRANCH */
                    .subreddit-search-results-wrapper {
                    }
                    .subreddit-search-result {
                        width: 100%;
                        background-color: ${PREZ.primaryColor};
                        border: 2px solid ${itemBorderColor};
                        color: ${PREZ.displayWhite};
                        display: flex;
                        align-items: center;
                        box-sizing: border-box;
                        padding-left: ${textIndentPxls}px;
                        margin-top: 1px;
                        cursor: pointer;
                    }

                    /* SELECTED-SUBREDDIT-DATUMS BRANCH */
                    .subreddit-datums-wrapper {
                    }
                    .subreddit-datum {
                        width: 100%;
                        height: ${datumHeightPxls}px;
                        border-bottom: 0px solid ${itemBorderColor};
                        box-sizing: border-box;
                        margin-top: 1px;
                        cursor: pointer;
                        clear: both;
                    }
                    .subreddit-datum-label {
                        height: 100%;
                        float: left;
                        padding-left: ${textIndentPxls}px;
                    }
                    .subreddit-datum-cross {
                        height: 100%;
                        float: right;
                        padding-right: ${textIndentPxls}px;
                    }

                    /* MISC */
                    .center-contents-vertically {
                        display: flex;
                        align-items: center;
                    }
                `}</style>

                <div className="form-wrapper">
                    <form className={"subreddits-search-form"} autoComplete="off">
                        <input
                            className="search-subreddits-input-field"
                            onChange={e => this.handleInputChange(e)}
                            id={this.searchSubredditInputFieldId}
                            name="subreddit-search"
                            placeholder="ADD SUBREDDIT"
                            required
                        />
                    </form>
                </div>

                <div className="subreddits-menu-items-wrapper">
                    {!!bDisplayMatchedSubreddits ? (
                        <div className="subreddit-search-results-wrapper">
                            {matchedSubreddits.map((el, ind) => (
                                <div
                                    className="subreddit-search-result"
                                    onClick={e => this.handleClickOnMatchedSubredditItem(ind!)}
                                    key={ind}
                                >
                                    {el}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="subreddit-datums-wrapper">
                            {subredditDatums.map((el, ind) => (
                                <div
                                    className="subreddit-datum"
                                    onClick={e => this.handleClickOnDatumItem(ind!)}
                                    key={ind}
                                    style={{
                                        color: !!el.get("bDisplayed") ? colorPallete[ind!] : "grey",
                                        backgroundColor: ind! % 2 === 0 ? "rgba(255,255,255,0.03)" : "none"
                                    }}
                                >
                                    <div className="subreddit-datum-label center-contents-vertically">
                                        {el.get("name")}
                                    </div>
                                    <div
                                        className="subreddit-datum-cross center-contents-vertically"
                                        onClick={e => this.handleClickOnDatumCloseIcon(e, ind!)}
                                    >
                                        <CloseWindowIcon color={"grey"} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

//////////////////////////////////////////////////////////////////////////
//// Code below concerns setup of the smart props to/from redux store ////
//////////////////////////////////////////////////////////////////////////

interface IReduxStateToProps {
    subredditDatums: SUBREDDITDATUM.ImTypes;
    searchWord: string;
    matchedSubreddits: getImType<string[]>;
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        subredditDatums: state.get("subredditData").get("subredditDatums"),
        searchWord: state.get("subredditSearch").get("searchWord"),
        matchedSubreddits: state.get("subredditSearch").get("matchedSubreddits")
    };
}

interface IReduxCallbacks {
    cbClearSubredditSearch: typeof AppActions.clearSubredditSearch;
    cbSearchForSubbreddit: typeof AppActions.searchForSubreddit;
    cbAddSubredditDatumToFeed: typeof AppActions.updateSubredditDatum;
    cbHideSubredditDatum: typeof AppActions.hideSubredditDatum;
    cbRemoveSubredditDatum: typeof AppActions.removeSubredditDatum;
}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {
        cbClearSubredditSearch: () => dispatch(AppActions.clearSubredditSearch()),
        cbSearchForSubbreddit: (searchWord: string) => dispatch(AppActions.searchForSubreddit(searchWord)),
        cbAddSubredditDatumToFeed: (subredditName: string) => dispatch(AppActions.updateSubredditDatum(subredditName)),
        cbHideSubredditDatum: (index: number) => dispatch(AppActions.hideSubredditDatum(index)),
        cbRemoveSubredditDatum: (index: number) => dispatch(AppActions.removeSubredditDatum(index))
    };
};

export const SubredditMenu = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(SubredditsMenuComponent);
