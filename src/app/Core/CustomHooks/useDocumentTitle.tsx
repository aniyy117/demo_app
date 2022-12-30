import { useEffect } from "react";

// ----------------------------------------------------------------------------------

const useDocumentTitle = ( title: string ) => {
    useEffect( () => {
        document.title = `${title} | React App`;
        return () => {
            document.title = "React App";
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );
};

// ----------------------------------------------------------------------------------

export { useDocumentTitle };
