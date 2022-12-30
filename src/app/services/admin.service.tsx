import { toast, CommonOptions, ToastOptions, Flip } from "react-toastify";
import { AxiosError } from "axios";

class admin {
    toast = new toastConstructor();
}

// ------------------------ toast constructor -----------------------

class toastConstructor {
    private config: CommonOptions = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "normal--toast",
        transition: Flip,
    };

    error = ( message: string ) => {
        toast.error( message, this.config );
    };

    info = ( message: string ) => {
        toast.info( message, this.config );
    };

    success = ( message: string ) => {
        toast.success( message, this.config );
    };

    warn = ( message: string ) => {
        toast.warn( message, this.config );
    };

    default = (
        message: string | React.ReactNode,
        config: ToastOptions = {}
    ) => {
        return toast( message, Object.assign( {}, this.config, config ) );
    };

    update = ( toastId: number | string, config: ToastOptions = {} ) => {
        toast.update( toastId, Object.assign( {}, this.config, config ) );
    };

    dismiss = ( toastId?: number | string ) => {
        toast.dismiss( toastId );
    };

    done = ( toastId: number | string ) => toast.done( toastId );

    throwError = (
        e: AxiosError | any,
        fallbackMsg: string,
        force?: boolean
    ) => {
        console.error( fallbackMsg, ":\n", e );
        let message = '';
        if ( e?.name === "AbortError" ) return;

        if ( !e.response ) {
            if (
                e.message?.includes( "timeout" ) &&
                e.message?.includes( "exceeded" )
            )
                return toast.error( "Request Timed Out", this.config );
            return toast.error(
                e.message && force ? e.message : fallbackMsg,
                this.config
            );
        }
        const { data } = e.response;
        if ( Array.isArray( data ) ) message = data[0];
        else if ( typeof data === "string" ) {
            if ( data.includes( "duplicate key value" ) )
                message = "Duplicate Entry / Check recycle bin";
            else if ( data.includes( "ProtectedError" ) )
                message = "Record already in use";
            else if ( data.length > 50 ) message = fallbackMsg;
            else message = data;
        } else if ( typeof data === "object" ) {
            if ( data["detail"] ) message = data["detail"];
            else if ( data["details"] ) message = data["details"];
            else message = JSON.stringify( data );
        }
        toast.error( message, this.config );
    };
}

const ADMIN = new admin();

export { ADMIN };
