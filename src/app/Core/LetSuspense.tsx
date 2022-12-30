// react
import React, { Fragment, useEffect, useState } from "react";

import { times } from "lodash";

// TODO: improve retry component to take error object to display iocons for server error, server connection lost timed out etc
interface ILetSuspense {
    /**
     * - true -> render the children
     * - false -> render loadingPlaceholder
     * @default false
     */
    condition?: boolean;
    /**
     * @default false
     */
    errorCondition?: boolean;
    /**
     * Component to rendered if loading is true
     * - Constructor of component
     */
    loadingPlaceholder: React.ComponentType<any>;
    /**
     * The number of placeholders to be rendered
     * @default 1
     */
    multiplier?: number;
    /**
     * Component to rendered if error occurs
     * - Instance of component
     */
    errorPlaceholder?: React.ReactNode;
    /**
     * The actual component(s) that will be rendered when the condition is true
     * @default undefined
     */
    children?: React.ReactNodeArray | React.ReactNode;
    /**
     * Minimum time in milliseconds before a component is rendered
     * @default 0
     */
    initialDelay?: number;
}

const LetSuspense: React.FC<ILetSuspense> = props => {
    // ----------------------------------------- props --------------------------------------

    const {
        children,
        errorPlaceholder,
        loadingPlaceholder: LoadingPlaceholder,
        condition = false,
        multiplier = 1,
        errorCondition = false,
        initialDelay = 0,
    } = props;

    // ---------------------------------------- states --------------------------------------

    const [component, setComponent] = useState<React.ReactNodeArray>( [] );

    // ------------------------------------- side effects ----------------------------------

    useEffect( () => {
        let timeout: any = null;

        // if error placeholder has to be shown in case of error
        if ( errorPlaceholder && errorCondition ) {
            setComponent( [errorPlaceholder] );
        } else if ( condition ) {
            // if condition evaluates true
            if ( initialDelay ) {
                // show loding till timeout ends
                setComponent(
                    times( multiplier, index => (
                        <LoadingPlaceholder key={ index } />
                    ) )
                );

                timeout = setTimeout( () => {
                    // return children if timeout complete
                    setComponent( [children] );
                }, initialDelay );
            } else {
                // render childern
                setComponent( [children] );
            }
        } else {
            // if !condition (condition evaluates false) render loading placeholders
            setComponent(
                times( multiplier, index => <LoadingPlaceholder key={ index } /> )
            );
        }
        return () => {
            // cleanup on component unmount
            if ( timeout ) clearTimeout( timeout );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children, condition, errorCondition] );

    return (
        <Fragment>
            { component.map( ( component, index ) => (
                <Fragment key={ index }>{ component } </Fragment>
            ) ) }
        </Fragment>
    );
};

export default LetSuspense;
