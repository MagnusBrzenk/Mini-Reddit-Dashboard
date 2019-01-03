import { LOCATION_CHANGE, CALL_HISTORY_METHOD } from 'react-router-redux';
import { AnyAction, Reducer } from 'redux';
import { ROUTERSTATE } from '__MODELS';

export const routerReducer: Reducer<ROUTERSTATE.Interface, AnyAction> = function(
    substate0: ROUTERSTATE.Interface = { ...ROUTERSTATE.Default },
    action: AnyAction
): ROUTERSTATE.Interface {
    //

    switch (action.type) {
        case CALL_HISTORY_METHOD:
            //Logic TBD
            return substate0;

        case LOCATION_CHANGE:
            const newRouterState: ROUTERSTATE.Interface = {
                location: (action.payload && action.payload.location) || action.payload,
                action: (action.payload && action.payload.action) || null
            };
            return newRouterState;

        default:
            return substate0;
    }
};
