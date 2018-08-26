import * as React from "react";
import Immutable from "immutable";
import { getImType } from "__METATYPING";
import { connect } from "react-redux";
import { getAllSubredditDatums } from "__REDUX/selectors";
import { genUniqueId } from "__UTILS/genUniqueId";
import { SUBREDDITDATUM, SUBREDDITDATA, ROOTSTATE } from "__MODELS";
import { AppActions } from "__REDUX/actions";
import PREZ from "__UTILS/frontendPresentation";

interface IParentProps {}

interface IState {
    searchWord: string;
}

type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

class SubredditMenuComponent extends React.Component<IProps, IState> {
    private searchSubredditInputFieldId: string = "search-subreddit-input-field-" + genUniqueId();

    constructor(props: IProps) {
        super(props);
        this.state = {
            searchWord: "xxxx"
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClickOnSubredditMenuItem = this.handleClickOnSubredditMenuItem.bind(this);
    }

    componentDidMount() {
        this.props.cbSearchForSubbreddit(this.state.searchWord);
    }

    handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        const searchWord: string = e.currentTarget.value;
        this.setState({ searchWord }, () => {
            if (this.state.searchWord.length >= 3) this.props.cbSearchForSubbreddit(this.state.searchWord);
            else this.props.cbClearSubredditSearch();
        });
    }

    handleClickOnSubredditMenuItem(index: number) {
        //
        const subredditName: string = this.props.matchedSubreddits.get(index); //index;
        console.log("subredditName >>>", subredditName);
        this.props.cbAddSubredditStatToFeed(subredditName);
    }

    render() {
        //Presentation params
        // const itemBorderColor = PREZ.primaryColorDark;
        // const itemBorderColor = PREZ.secondaryColor;
        const itemBorderColor = "rgba(0,0,0,0)";
        const textIndentPxls: number = 10;
        const subredditItemHeightPxls: number = 30;
        // State params
        const { matchedSubreddits } = this.props;
        const { searchWord } = this.state;
        //Derived params
        const bDisplayMatchedSubreddits = searchWord.length >= 3;
        // console.log(">>>>>>>>", matchedSubreddits);

        return (
            <div className="subreddit-menu">
                <style jsx>{`
                    .subreddit-menu {
                        width: 100%;
                        height: 100%;
                    }
                    .subreddit-search-form {
                        width: 100%;
                    }
                    .search-subreddit-input-field {
                        box-sizing: border-box;
                        background-color: ${PREZ.primaryColorLight};
                        border: 0px solid rgba(0.5, 0, 0, 0.5);
                        margin: 1px 0px;
                        width: 100%;
                        height: 40px;
                        text-indent: ${textIndentPxls}px;
                    }
                    .search-subreddit-input-field::placeholder {
                        font-size: 120%;
                        transform: translateX(0px);
                    }
                    .subreddit-menu-items-wrapper {
                        width: 100%;
                        height: calc(100% - 40px);
                        overflow: scroll;
                    }
                    .subreddit-menu-item {
                        width: 100%;
                        height: 30px;
                        background-color: ${PREZ.primaryColor};
                        border: 2px solid ${itemBorderColor};
                        color: ${PREZ.displayWhite};
                        display: flex;
                        align-items: center;
                        justify-content: left;
                        box-sizing: border-box;
                        padding-left: ${textIndentPxls}px;
                        margin-top: 1px;
                        cursor: pointer;
                    }
                    .subreddit-menu-item + .subreddit-menu-item {
                        border-top: 0px solid ${itemBorderColor};
                    }
                `}</style>
                <form className={"subreddit-search-form"}>
                    <input
                        className="search-subreddit-input-field"
                        onChange={e => this.handleInputChange(e)}
                        id={this.searchSubredditInputFieldId}
                        name="subreddit-search"
                        placeholder="Search"
                        required
                    />
                </form>
                <div className="subreddit-menu-items-wrapper">
                    {!!bDisplayMatchedSubreddits ? (
                        <div className="">
                            {this.props.matchedSubreddits.map((el, ind) => (
                                <div //
                                    className="subreddit-menu-item"
                                    onClick={e => this.handleClickOnSubredditMenuItem(ind!)}
                                    key={ind}
                                >
                                    {el}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="">
                            {this.props.subredditDatums.map((el, ind) => (
                                <div //
                                    className="subreddit-menu-item"
                                    onClick={e => this.handleClickOnSubredditMenuItem(ind!)}
                                    key={ind}
                                >
                                    {JSON.stringify(el.get("name"))}
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
    cbAddSubredditStatToFeed: typeof AppActions.addSubredditStatToFeed;
}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {
        cbClearSubredditSearch: () => dispatch(AppActions.clearSubredditSearch()),
        cbSearchForSubbreddit: (searchWord: string) => dispatch(AppActions.searchForSubreddit(searchWord)),
        cbAddSubredditStatToFeed: (subredditName: string) => dispatch(AppActions.addSubredditStatToFeed(subredditName))
    };
};

export const SubredditMenu = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(SubredditMenuComponent);
