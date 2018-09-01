import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faChartBar from "@fortawesome/fontawesome-free-solid/faChartBar";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

interface IMyCustomProps {
    bSpin?: boolean;
}

export const BarChart = (props: IFortawesomeProps & IMyCustomProps) => {
    const { bSpin = false, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    return (
        <FontAwesomeIcon //
            icon={faChartBar}
            spin={bSpin}
            {...fortawesomeProps}
        />
    );
};
