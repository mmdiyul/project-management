exports.schema = {
    nama:{
        isString: true,
        trim: true,
        isEmpty: false,
    },
    alamat:{
        isString: true,
        trim: true,
        isEmpty: false
    },
    telepon:{
        isString: true,
        isEmpty: false,
        trim: true
    },
    email:{
        isEmpty:false,
        isString: true,
        trim: true
    },
    website:{
        isEmpty: false,
        isString: true,
        trim: true
    }
}