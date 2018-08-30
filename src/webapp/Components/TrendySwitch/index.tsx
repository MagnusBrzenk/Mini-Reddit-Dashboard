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
                <form>
                    {/* <fieldset> */}
                    {/* <legend>Flat look</legend> */}
                    <div
                        style={{
                            // width: 100,
                            // height: 100,
                            backgroundColor: "rgba(0,255,0,0.3)"
                        }}
                    >
                        <input type="checkbox" id="pure-toggle-3" hidden checked />
                        <label className="pure-toggle wide" htmlFor="pure-toggle-3">
                            <span className="fontawesome-ok" />
                            <span className="fontawesome-remove" />
                            {/* XXX */}
                        </label>
                    </div>
                    {/* </fieldset> */}
                </form>
            </div>
        );
    }
}
