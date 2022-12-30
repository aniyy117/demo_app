export const numberFormat = ( value: any ) =>
    new Intl.NumberFormat( "en-IN", {
        style: "currency",
        currency: "INR"
    } ).format( value );