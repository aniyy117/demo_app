// react
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// vendors
// services
// utils
// core
// ui-components
// others
// scss
import "./Static.scss";

interface StaticProps {
    /**string - based on this corresponding "Page" is rendered */
    page: "unauthorized" | "pageNotFound" | "serverConnectionLost";
}

/**
 * renders a static page based on "page" prop.
 */
const Static = ( props: StaticProps ) => {
    const [data, setData] = useState<{ code: number; message: string; }>( {
        code: NaN,
        message: "",
    } );
    useEffect( () => {
        switch ( props.page ) {
            case "unauthorized":
                setData( { code: 401, message: "Unauthorized" } );
                break;
            case "pageNotFound":
                setData( { code: 404, message: "Page Not Found" } );
                break;
            case "serverConnectionLost":
                setData( { code: 503, message: "Server Connection Lost" } );
                break;
            default:
                break;
        }
    }, [props.page] );
    return (
        <div className="flex-center position-ref full-height">
            <span className="display-flex">
                <div className="code">{ data.code } </div>
                <div className="message">{ data.message } </div>
            </span>
            <NavLink to="/" className="goHomeLink">
                Go Home
            </NavLink>
        </div>
    );
};

export default Static;
