const _getType = type => {
    return Object.prototype.toString.call(type).slice(8, -1);
};

const _copyArray = array => {
    return array.map( el => {
        if ( _getType( el ) === 'Object' ) {
            return _copyObject( el );
        } else if ( _getType( el ) === 'Array' ) {
            return _copyArray( el );
        } else {
            return el;
        }
    });
};

const _copyObject = obj => {
    const copyObj = {};

    for( let key in obj ){
        let
            type = _getType( obj[ key ] );

        if ( type === 'Object' ) {
            copyObj[ key ] = _copyObject( obj[ key ] );
        } else if( type === 'Array' ){
            copyObj[ key ] = _copyArray( obj[ key ] );
        } else {
            copyObj[ key ] = obj[ key ];
        }
    }

    return copyObj;
};

const _extend = (obj1, obj2) => {
    const resObj = {};

    let type = null;

    for( let key in obj1 ){
        if ( obj2[ key ] === undefined ) {

            type = _getType( obj1[ key ] );

            if ( type === 'Object' ) {
                resObj[ key ] = _copyObject(obj1[ key ]);
            } else if ( type === 'Array' ) {
                resObj[ key ] = _copyArray(obj1[ key ]);
            } else {
                resObj[ key ] = obj1[ key ];
            }

        } else {

            type = _getType( obj2[ key ] );

            if ( type === 'Object' ) {
                resObj[ key ] = _copyObject(obj2[ key ]);
            } else if ( type === 'Array' ) {
                resObj[ key ] = _copyArray(obj2[ key ]);
            }  else {
                resObj[ key ] = obj2[ key ];
            }

        }
    }
    return resObj;
};

export default _copyObject;