import * as React from "react";
import { Dashboard } from "__CONTAINERS/Dashboard";
import { SubredditMenu } from "__CONTAINERS/SubredditMenu";

interface IProps {
    id?: string;
}

interface IState {
    id?: string;
}

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
                    }
                `}</style>
                <div>Hello!!!</div>
                <SubredditMenu />
                <Dashboard />
            </div>
        );
    }
}
