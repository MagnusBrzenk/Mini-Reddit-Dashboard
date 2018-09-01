import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faStreetView from "@fortawesome/fontawesome-free-solid/faStreetView";
import IFortawesomeProps from "__COMPONENTS/@FortawesomeWrappers/@FortawesomeProps";

interface IMyCustomProps {
    bSpin?: boolean;
}

export const StreetView = (props: IFortawesomeProps & IMyCustomProps) => {
    const { bSpin = false, ...fortawesomeProps }: IFortawesomeProps & IMyCustomProps = props;
    return (
        <FontAwesomeIcon //
            icon={faStreetView}
            spin={bSpin}
            {...fortawesomeProps}
        />
    );
};
