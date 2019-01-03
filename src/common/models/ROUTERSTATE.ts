/**
 * It seems to be the case that the routerstate simple stores one redux action at a time
 * See: https://github.com/gajus/redux-immutable
 */
export namespace ROUTERSTATE {
    export interface Interface {
        readonly location: any;
        readonly action: any;
    }

    export const Default: Readonly<Interface> = {
        location: null,
        action: null
    };
}
