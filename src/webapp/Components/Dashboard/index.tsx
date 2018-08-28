import * as React from "react";
import { Graph2D } from "__CONTAINERS/Graph2D";
import { SubredditMenu } from "__CONTAINERS/SubredditMenu";
import PREZ from "__UTILS/frontendPresentation";

interface IProps {
    id?: string;
}

interface IState {
    id?: string;
}

export class Dashboard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        const dashboardBackgroundColor = PREZ.secondaryColor;

        return (
            <div className="dashboard">
                <style jsx>{`
                    .dashboard {
                        width: 100%;
                        height: 100%;
                        background-color: ${PREZ.primaryColorDark};
                    }
                    .dashboard-header-row {
                        width: 100%;
                        height: 10%;
                        display: flex;
                        // background-color: ${PREZ.primaryColorDark};
                        background-color: pink;
                    }
                    .dashboard-body-row {
                        width: 100%;
                        height: 90%;
                        display: flex;
                        background-color: ${PREZ.primaryColorDark};
                    }
                    .subreddit-menu-wrapper {
                        flex: 1;
                        box-sizing: border-box;
                        padding: 20px;
                    }
                    .graph-2d-wrapper {
                        box-sizing: border-box;
                        padding: 20px;
                        flex: 2;
                    }
                    @media only screen and (min-width: ${PREZ.lowerScreenSize}px) {
                        .graph-2d-wrapper {
                            padding-left: 0px;
                        }
                    }
                    @media only screen and (max-width: ${PREZ.lowerScreenSize}px) {
                        .dashboard-body-row {
                            flex-wrap: wrap-reverse;
                        }
                        .graph-2d-wrapper {
                            flex: 1 1 ${PREZ.lowerScreenSize / 2}px;
                            height: 50%;
                            padding-bottom: 0px;
                        }
                        .subreddit-menu-wrapper {
                            flex: 1 1 ${PREZ.lowerScreenSize / 2}px;
                            height: 50%;
                        }
                    }
                `}</style>

                <div className="dashboard-header-row">
                    <h1> HEADER CONTAINER </h1>
                </div>

                <div className="dashboard-body-row">
                    <div className="subreddit-menu-wrapper">
                        <SubredditMenu />
                    </div>
                    <div className="graph-2d-wrapper">
                        <Graph2D maxX={1000} />
                    </div>
                </div>
            </div>
        );
    }
}
