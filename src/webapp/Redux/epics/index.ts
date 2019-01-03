import { epicDependencies } from '__REDUX/epics/epicDependencies';
import { AppActions } from '__REDUX/actions';
import { ROOTSTATE, SUBREDDITDATA, SUBREDDITDATUM } from '__MODELS';
import { from, Observable, of, merge } from 'rxjs'; //Get types and/or observable-creation functions
import { mergeMap, map } from 'rxjs/operators'; //Get piping operators
import { combineEpics, ofType, Epic } from 'redux-observable';
import { Action, AnyAction } from 'redux';

const allEpics: TEpic[] = [
    function searchForSubreddit(
        action$: Observable<AnyAction>,
        rootState: { value: ROOTSTATE.Interface },
        dependencies: typeof epicDependencies
    ) {
        return action$.pipe(
            ofType(AppActions.Types.SEARCH_FOR_SUBREDDIT),
            mergeMap((action: ReturnType<typeof AppActions.searchForSubreddit>) =>
                from(dependencies.searchForSubreddit(action.payload)).pipe(
                    map((response: any) => AppActions.searchForSubredditFulfilled(response))
                )
            )
        );
    },

    function updateSubredditDatum(
        action$: Observable<AnyAction>,
        rootState: { value: ROOTSTATE.Interface },
        dependencies: typeof epicDependencies
    ) {
        return action$.pipe(
            ofType(AppActions.Types.UPDATE_SUBREDDIT_DATUM),
            mergeMap((action: ReturnType<typeof AppActions.updateSubredditDatum>) =>
                from(
                    dependencies.fetchUpdatedSubredditDatum(
                        //1st Arg: subredditDatum (existence just verified/established by this action)
                        rootState.value.subredditData.subredditDatums.find(el => el.name === action.payload),
                        //2nd Arg: maxXRange
                        rootState.value.subredditData.maxXRange //.get('subredditData').get('maxXRange')
                    )
                ).pipe(map((response: SUBREDDITDATUM.Interface) => AppActions.updateSubredditDatumFulfilled(response)))
            )
        );
    }
];

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DO NOT EDIT! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
export const rootEpic = combineEpics.apply(combineEpics, allEpics);
type TEpic = Epic<AnyAction, AnyAction, ROOTSTATE.Interface, typeof epicDependencies>;
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
