import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faChartPie from "@fortawesome/fontawesome-free-solid/faChartPie";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

interface IMyCustomProps {
    bSpin?: boolean;
}

export const PieChart = (props: IFortawesomeProps & IMyCustomProps) => {
    const { bSpin = false, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    return (
        <FontAwesomeIcon //
            icon={faChartPie}
            spin={bSpin}
            {...fortawesomeProps}
        />
    );
};
