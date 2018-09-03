import * as React from "react";
import { Dashboard } from "__COMPONENTS/Dashboard";
import PREZ from "__UTILS/frontendPresentation";

interface IProps {}

interface IState {}

export class HomePage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="home-page">
                <style jsx>{`
                    .home-page {
                        width: 100%;
                        height: 100%;
                        background-color: ${PREZ.primaryColorDarkest};
                    }
                    .dashboard-wrapper {
                        width: 100%;
                        height: 100%;
                    }
                `}</style>
                <div className="dashboard-wrapper">
                    <Dashboard />
                </div>
            </div>
        );
    }
}
