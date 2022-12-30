import { encode, decode } from './encoder';

/**
 * @usage
 * ```js
 * const setToken = setItem.bind(sessionStorage,'token');
 * setToken('fghjklwelkdhbnqlme');
 * //or
 * setItem.call(sessionStorage,'token','fghjklwelkdhbnqlme');
 * ```
 */


export type ObjectType<T = any> = { [x: string]: T; };

/**get item from session storage by "key" name */
export function getItem ( this: Storage, key: string ) {
    key = encode( key );
    const value = this.getItem( key );
    if ( value ) return JSON.parse( decode( value ) );
};

/**get all cookies in form of an object */
export function getAll ( this: Storage ) {
    const EncodedKeysArr = keysList.call( this );
    const DecodedObj: {
        [x: string]: any;
    } = {};
    EncodedKeysArr.forEach( key => {
        DecodedObj[decode( key )] = JSON.parse( decode( getItem.call( this, key ) ) );
    } );
    return DecodedObj;
};

/**set item to storage */
export function setItem ( this: Storage, key: string, value: any ) {
    key = encode( key );
    if ( value === undefined || value === null ) return;
    value = encode( JSON.stringify( value ) );
    this.setItem( key, value );
};

/**set each "key", "value" pair in a object as an item in storage */
export function setItems ( this: Storage, obj: ObjectType ) {
    for ( let key in obj ) {
        setItem.call( this, key, obj[key] );
    }
};

export function addNewUserInUserArry (this: Storage, obj: ObjectType , key:string) {
    key = encode( key );
    const value = this.getItem( key );
    if ( value ) {
        const arr = JSON.parse( decode( value ) );
        arr.push(obj);
        this.setItem( key, encode( JSON.stringify( arr ) ) );
    } else {
        const arr = [];
        arr.push(obj);
        this.setItem( key, encode( JSON.stringify( arr ) ) );
    }
}

/**remove a single item in storage by its "key" */
export function removeItem ( this: Storage, key: string ) {
    key = encode( key );
    this.removeItem( key );
};

/**clear all the items in storage */
export function clear ( this: Storage ) {
    this.clear();
};

/**gives a list (array) of all key names for all the items in the storage */
export function keysList ( this: Storage ) {
    const EncodedKeysArr = Object.keys( this );
    return EncodedKeysArr.map( key => {
        return decode( key );
    } );
};

/**gives length of storage */
export function length ( this: Storage ) {
    return this.length;
};