import * as React from "react";
import { connect } from "react-redux";
import { getAllSubredditStats } from "__REDUX/selectors";
import { genUniqueId } from "__UTILS/genUniqueId";
import { SUBREDDITSTAT, SUBREDDITSTATSFEED, ROOTSTATE } from "__MODELS";
import { AppActions } from "__REDUX/actions";
import PREZ from "__UTILS/frontendPresentation";

interface IParentProps {}

interface IState {}

//Never change IProps for containers; it will always be determined by the intersection of these 3 interfaces:
type IProps = IReduxStateToProps & IReduxCallbacks & IParentProps;

class SubredditMenuComponent extends React.Component<IProps, IState> {
    private searchSubredditInputFieldId: string = "search-subreddit-input-field-" + genUniqueId();

    constructor(props: IProps) {
        super(props);
        this.state = {};
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();

        // const form: HTMLFormElement = event.target as any;
        // const data: FormData = new FormData(form);
        // const searchWord: string = data.get("subreddit-search") as any;

        const inputField: HTMLElement | null = document.getElementById(this.searchSubredditInputFieldId) as any;

        const searchWord: string = e.currentTarget.value;

        console.log("searchWord >>> ", searchWord);

        if (!!searchWord) this.props.cbSearchForSubbreddit(searchWord);
        else this.props.cbClearSubredditSearch();
    }

    // (e: React.FormEvent<HTMLInputElement>) => {
    //     //
    //     // The word-search callback is embedded within this simple-flagging mechanism
    //     // to delay triggering by  in case user types/deletes quickly
    //     //
    //     if (!!this.props.onTextInputChange) {
    //         const delayTriggeringWordSearchPeriod: number = 500;
    //         this.inputTextLatestValue = e.currentTarget.value;
    //         if (!this.bSearchingWord) this.bSearchingWord = true;
    //         setTimeout(() => {
    //             this.props.onTextInputChange!(this.inputTextLatestValue);
    //             this.bSearchingWord = false;
    //         }, !!this.inputTextLatestValue ? delayTriggeringWordSearchPeriod : 0);
    //     }
    // }

    render() {
        return (
            <div className="dashboard">
                <style jsx>{`
                    .home-page {
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    .subreddit-search-form {
                        width: 100%;
                    }
                `}</style>
                <form //
                    // onSubmit={e => this.handleSubmit(e)}
                    noValidate
                    className={"subreddit-search-form"}
                >
                    <input //
                        onChange={e => this.handleInputChange(e)}
                        className="search-subreddit-input-field"
                        id={this.searchSubredditInputFieldId}
                        name="subreddit-search"
                        required
                        placeholder="Search"
                    />
                </form>
                {this.props.matchedSubreddits.map((el, ind) => (
                    <div key={ind}> {el} </div>
                ))}
            </div>
        );
    }
}

//////////////////////////////////////////////////////////////////////////
//// Code below concerns setup of the smart props to/from redux store ////
//////////////////////////////////////////////////////////////////////////

interface IReduxStateToProps {
    subredditStats: SUBREDDITSTAT.ImTypes;
    searchWord: string;
    matchedSubreddits: string[];
}
function mapStateToProps(state: ROOTSTATE.ImType): IReduxStateToProps {
    return {
        subredditStats: state.get("subredditStatsFeed").get("subredditStats"),
        searchWord: state.get("subredditSearch").get("searchWord"),
        matchedSubreddits: state.get("subredditSearch").get("matchedSubreddits")
    };
}

interface IReduxCallbacks {
    cbClearSubredditSearch: typeof AppActions.clearSubredditSearch;
    cbSearchForSubbreddit: typeof AppActions.searchForSubreddit;
}
const mapDispatchToProps = (dispatch: any): IReduxCallbacks => {
    return {
        cbClearSubredditSearch: () => dispatch(AppActions.clearSubredditSearch()),
        cbSearchForSubbreddit: (searchWord: string) => dispatch(AppActions.searchForSubreddit(searchWord))
    };
};

export const SubredditMenu = connect<IReduxStateToProps, IReduxCallbacks, IParentProps, ROOTSTATE.ImType>(
    mapStateToProps,
    mapDispatchToProps
)(SubredditMenuComponent);
