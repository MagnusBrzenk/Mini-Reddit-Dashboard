import * as React from "react";
import { Dashboard } from "__COMPONENTS/Dashboard";
import PREZ from "__UTILS/frontendPresentation";

interface IProps {}

interface IState {}

export class Temp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="temp">
                <style jsx>{`
                    .temp {
                        width: 100%;
                        height: 100%;
                        background-color: ${PREZ.primaryColorDarkest};
                    }
                    .temp-stuff {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 120%;
                        color: white;
                    }
                `}</style>
                <div className="temp-stuff">Hello World!!!</div>
            </div>
        );
    }
}
