// import { combineReducers } from "redux-immutable"; //Use if your state is composed of immutables; else use combineReducers from "redux"
// import { getImType } from "__METATYPING";
import { ROOTSTATE } from "__MODELS";
import { Reducer, combineReducers } from "redux";

// Substate reducers
import { subredditDataReducer } from "__REDUX/reducers/subredditDataReducer";
import { subredditSearchReducer } from "__REDUX/reducers/subredditSearchReducer";
import { routerReducer } from "__REDUX/reducers/routerReducer";

const reducerMappings: IReducerMappings = {
    subredditData: subredditDataReducer,
    subredditSearch: subredditSearchReducer,
    router: routerReducer
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DO NOT EDIT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\

// This is a Mapped Type mapping ROOTSTATE.Interface to a Redux-Reducer Type acting on that
// interface cast to its corresponding immutable; only edit/add-to `reducerMappings` above!
type IReducerMappings = { [K in keyof ROOTSTATE.Interface]: Reducer<ROOTSTATE.Interface[K]> };
export const rootReducer = combineReducers(reducerMappings);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ \\
