import { AsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../AppRouter";

// -----------------------------------------------------------------------------------
// helper interfaces
type fetched = "TRUE" | "FALSE" | "ERROR" | "FETCHING";

type Fn = ( ...args: any ) => any;

type WithArg<Arg> = {
    arg: Arg;
};

type WithoutArg = {
    arg?: undefined;
};

type InferArg<Arg> = Arg extends void ? WithoutArg : WithArg<Arg>;

type Query<Arg, Ret> = {
    action: AsyncThunk<Ret, Arg, any>;
    /**
     * condition for query action to be dispatched
     * @default true
     */
    condition?: boolean;
    callback?: ( err: any, data: Ret | null ) => void;
} & InferArg<Arg>;

// -----------------------------------------------------------------------------------
/* eslint-disable */
export interface QueryDispatchOptions<Arg, Ret, C extends Fn = any> {
    query: Query<Arg, Ret>;
    cleanup?: {
        action: C;
        args: Parameters<Fn>;
    };
    dependency?: React.DependencyList;
}

// ------------------------------------------------------------------------------------
// constants

const defaultQueryCondition = true;

// ------------------------------------------------------------------------------------

const useQueryDispatch = <Ret, Arg, C extends Fn = any> (
    options: QueryDispatchOptions<Arg, Ret, C>
) => {
    const { cleanup, dependency, query } = options;

    const dispatch = useAppDispatch();

    const [fetched, setFetched] = useState<fetched>( "FALSE" );

    const api = () => {
        const condition = query.condition ?? defaultQueryCondition;
        if ( !condition ) return;

        // TODO: find solution to remove ignore comment
        // @ts-ignore
        let action = query.action( query.arg );
        const promise = dispatch( action );

        setFetched( "FETCHING" );
        promise
            .then( unwrapResult )
            .then( ( data: any ) => {
                query.callback?.( null, data );
                setFetched( "TRUE" );
            } )
            .catch( ( e: any ) => {
                query.callback?.( e, null );
                setFetched( "ERROR" );
            } );

        return promise;
    };

    useEffect( () => {
        const promise = api();

        return () => {
            // cancel prev request, if any
            promise?.abort();

            // dispatch cleanup actions
            if ( cleanup ) dispatch( cleanup.action( ...cleanup.args ) );
        };
    }, dependency ?? [] );

    return Object.freeze( {
        fetch: api,
        match: ( state: fetched ) => {
            return fetched === state;
        },
        isLoading: () => ["FALSE", "FETCHING"].includes( fetched ),
        error: fetched === "ERROR"
    } );
};

export { useQueryDispatch };
