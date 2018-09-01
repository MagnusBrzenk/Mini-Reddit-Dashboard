import * as React from "react";
import { ControlBar } from "__CONTAINERS/ControlBar";
import { DatumVisualizations } from "__CONTAINERS/DatumVisualizations";
import { SubredditMenu } from "__CONTAINERS/SubredditMenu";
import PREZ from "__UTILS/frontendPresentation";

interface IProps {}

interface IState {}

export class Dashboard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        const dashboardBackgroundColor = PREZ.secondaryColor;
        const tabButtonHeightPxls: number = 50;

        return (
            <div className="dashboard">
                <style jsx>{`
                    .dashboard {
                        width: 100%;
                        // height: 100%;
                        min-height: 100%;
                        background-color: ${PREZ.primaryColorDarkest};
                    }
                    .dashboard-header-row {
                        width: 100%;
                        // height: 20%;
                        display: flex;
                    }
                    .header-wrapper {
                        color: white;
                        padding: 40px;
                        padding-bottom: 0px;
                        box-sizing: border-box;
                        flex: 1;
                        display: flex;
                        align-items: center;
                    }
                    .dashboard-body-row {
                        width: 100%;
                        // height: 80%;
                        min-height: 500px;
                        max-height: ${window.innerWidth}px;
                        display: flex;
                    }
                    .subreddit-menu-wrapper {
                        flex: 1;
                        box-sizing: border-box;
                        padding: 40px;
                    }
                    .graph-2d-wrapper {
                        box-sizing: border-box;
                        padding: 40px;
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
                    <div className="header-wrapper">
                        <ControlBar bShadowed />
                    </div>
                </div>

                <div className="dashboard-body-row">
                    <div className="subreddit-menu-wrapper shadowed">
                        <SubredditMenu bShadowed searchFieldHeightPxls={tabButtonHeightPxls} />
                    </div>
                    <div className="graph-2d-wrapper shadowed">
                        <DatumVisualizations bShadowed tabButtonHeightPxls={tabButtonHeightPxls} />
                    </div>
                </div>
            </div>
        );
    }
}
