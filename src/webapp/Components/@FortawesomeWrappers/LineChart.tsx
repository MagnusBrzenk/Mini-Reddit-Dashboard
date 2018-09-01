import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faChartLine from "@fortawesome/fontawesome-free-solid/faChartLine";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

interface IMyCustomProps {
    bSpin?: boolean;
}

export const LineChart = (props: IFortawesomeProps & IMyCustomProps) => {
    const { bSpin = false, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    return (
        <FontAwesomeIcon //
            icon={faChartLine}
            spin={bSpin}
            {...fortawesomeProps}
        />
    );
};
