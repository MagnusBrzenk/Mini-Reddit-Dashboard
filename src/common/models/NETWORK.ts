/**
 * Interfaces for objects to be JSON.stringified/parsed and sent/received across networks
 */
export namespace NETWORK {
    //

    export interface IMessageOnly {
        message?: string;
        success?: boolean;
    }

    export interface IMiscPayload<TPayload> {
        message?: string;
        success?: boolean;
        payload: TPayload;
    }
}
