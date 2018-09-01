import * as React from "react";
import { genUniqueId } from "__UTILS/genUniqueId";

interface IProps {
    color?: string;
    backgroundColor?: string;
    bChecked: boolean;
}

interface IState {
    //
}

/**
 * Hamburger Menu Adapated from: https://codepen.io/katheer/pen/jwwNZL
 * Note: We disable checkbox CSS so that its 'checkedness' can be controlled entirely by parent via JS
 */
export class TrendyHamburger extends React.Component<IProps, IState> {
    private checkId: string = "checkId-" + genUniqueId();

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.updateCheckBox();
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.bChecked !== prevProps.bChecked) {
            this.updateCheckBox();
        }
    }

    updateCheckBox() {
        const inputElement = document.getElementById(this.checkId);
        if (!!inputElement) (inputElement as HTMLInputElement).disabled = true;
        if (!!inputElement) (inputElement as HTMLInputElement).checked = this.props.bChecked;
    }

    render() {
        return (
            <div className="trendy-hamburger">
                <style jsx>{`
                    .trendy-hamburger {
                        background-color: ${this.props.backgroundColor || "rgba(255,0,0,0.5)"};
                        height: 40px;
                        width: 40px;
                    }

                    input[type="checkbox"] {
                        opacity: 0;
                        z-index: -1;
                    }

                    input[type="checkbox"] + label {
                        width: 40px;
                        height: 40px;
                        display: block;
                        position: relative;
                        margin: auto;
                        box-sizing: border-box;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        text-indent: -999px;
                        overflow: hidden;
                        border: 1px solid #fff;
                        cursor: pointer;
                    }

                    input[type="checkbox"]#${this.checkId} + label {
                        background: transparent;
                        border-top: 5px solid #fff;
                        border-bottom: none;
                        border-left: none;
                        border-right: none;
                    }

                    input[type="checkbox"]#${this.checkId} + label:before,
                    input[type="checkbox"]#${this.checkId} + label:after {
                        content: "";
                        height: 5px;
                        right: 0;
                        top: 0px;
                        position: absolute;
                        background: #fff;
                        transition: 0.2s ease all;
                        -moz-transition: 0.2s ease all;
                        -webkit-transition: 0.2s ease all;
                    }

                    input[type="checkbox"]#${this.checkId} + label:before {
                        top: 10px;
                        width: 25px;
                    }

                    input[type="checkbox"]#${this.checkId} + label:after {
                        top: 25px;
                        width: 15px;
                    }

                    input[type="checkbox"]#${this.checkId}:checked + label {
                        border-top: 0px solid transparent;
                    }

                    input[type="checkbox"]#${this.checkId}:checked + label:before,
                    input[type="checkbox"]#${this.checkId}:checked + label:after {
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: auto;
                        width: 30px;
                        height: 5px;
                    }

                    input[type="checkbox"]#${this.checkId}:checked + label:before {
                        transform: rotate(-315deg);
                        -webkit-transform: rotate(-315deg);
                    }

                    input[type="checkbox"]#${this.checkId}:checked + label:after {
                        transform: rotate(315deg);
                        -webkit-transform: rotate(315deg);
                    }

                    .wrapper {
                        // width: 12.25%;
                        width: 40px;
                        // height: auto;
                        float: left;
                        position: relative;
                        padding: 0px 0;
                    }

                    .shifter {
                        position: absolute;
                        top: -20px;
                        right: 0px;
                        height: 40px;
                        width: 40px;
                    }
                `}</style>
                <div className="wrapper">
                    <div className="shifter">
                        <input type="checkbox" id={this.checkId} name="checkbox" />
                        <label htmlFor={this.checkId}>Checkbox 24</label>
                    </div>
                </div>
            </div>
        );
    }
}
