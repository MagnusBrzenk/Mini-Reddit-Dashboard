import * as React from "react";

// import scssStyles from "__COMPONENTS/Templates/styles.scss";

import "./global.scss";

interface IProps {
    //
}

interface IState {
    //
}

////////////////////////////////////////////////////////
export class TrendySwitch extends React.Component<IProps, IState> {
    ////////////////////////////////////////////////////

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        //
    }

    render() {
        return (
            <div
                className="trendy-switch"
                style={{
                    width: 100,
                    height: 100,
                    backgroundColor: "rgba(255,0,0,0.3)"
                }}
            >
                ...
            </div>
        );
    }
}
