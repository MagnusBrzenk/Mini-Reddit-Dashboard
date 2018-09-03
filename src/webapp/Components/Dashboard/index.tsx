import * as React from "react";
import { ControlBar } from "__CONTAINERS/ControlBar";
import { DatumVisualizations } from "__CONTAINERS/DatumVisualizations";
import { SubredditMenu } from "__CONTAINERS/SubredditMenu";
import PREZ from "__UTILS/frontendPresentation";

interface IProps {}

interface IState {
    responsiveWidth: number;
}

export class Dashboard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            responsiveWidth: window.innerWidth
        };
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
    }

    handleWindowResize() {
        this.setState({ responsiveWidth: window.innerWidth });
    }

    render() {
        const dashboardBackgroundColor = PREZ.secondaryColor;
        const tabButtonHeightPxls: number = 50;
        const padWidthPxls = window.innerWidth < PREZ.lowerScreenSize ? 10 : 30;

        return (
            <div className="dashboard">
                <style jsx>{`
                    .dashboard {
                        width: 100%;
                        background-color: ${PREZ.primaryColorDarkest};
                    }
                    .dash-board-column-container {
                        max-width: 750px;
                        margin: auto auto;
                    }
                    .dashboard-header-row {
                        width: 100%;
                        display: flex;
                    }
                    .header-wrapper {
                        color: white;
                        padding: ${padWidthPxls}px;
                        padding-bottom: 0px;
                        box-sizing: border-box;
                        flex: 1;
                        display: flex;
                        align-items: center;
                    }
                    .dashboard-body-row {
                        width: 100%;
                        height: auto;
                        display: flex;
                    }
                    .subreddit-menu-wrapper {
                        flex: 1;
                        box-sizing: border-box;
                        padding: ${padWidthPxls}px;
                        max-height: 500px;
                    }
                    .datum-visualizations-wrapper {
                        height: ${this.state.responsiveWidth * 0.7}px;
                        max-height: 500px;
                        min-height: 350px;
                        box-sizing: border-box;
                        padding: ${padWidthPxls}px;
                        flex: 3;
                    }
                    @media only screen and (min-width: ${PREZ.lowerScreenSize}px) {
                        .datum-visualizations-wrapper {
                            padding-left: 0px;
                        }
                    }
                    @media only screen and (max-width: ${PREZ.lowerScreenSize}px) {
                        .header-wrapper {
                            padding: ${padWidthPxls}px;
                            padding-bottom: ${padWidthPxls * 0}px;
                            padding-left: ${padWidthPxls}px;
                            padding-right: ${padWidthPxls}px;
                        }
                        .dashboard-body-row {
                            flex-wrap: wrap-reverse;
                        }
                        .datum-visualizations-wrapper {
                            flex: 1 1 ${PREZ.lowerScreenSize / 2}px;
                            min-height: 350px;
                            padding-bottom: ${padWidthPxls * 0}px;
                            padding-left: ${padWidthPxls}px;
                            padding-right: ${padWidthPxls}px;
                        }
                        .subreddit-menu-wrapper {
                            flex: 1 1 ${PREZ.lowerScreenSize / 2}px;
                            min-height: 350px;
                            padding-bottom: ${padWidthPxls}px;
                            padding-left: ${padWidthPxls}px;
                            padding-right: ${padWidthPxls}px;
                        }
                    }
                `}</style>

                <div className="dash-board-column-container">
                    <div className="dashboard-header-row">
                        <div className="header-wrapper">
                            <ControlBar bShadowed />
                        </div>
                    </div>

                    <div className="dashboard-body-row">
                        <div className="subreddit-menu-wrapper shadowed">
                            <SubredditMenu bShadowed searchFieldHeightPxls={tabButtonHeightPxls} />
                        </div>
                        <div className="datum-visualizations-wrapper shadowed">
                            <DatumVisualizations bShadowed tabButtonHeightPxls={tabButtonHeightPxls} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
