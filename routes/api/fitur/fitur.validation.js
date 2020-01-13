exports.schema = {
    nama:{
        isString: true,
        trim: true,
        isEmpty: false,
    },
    waktuPekerjaan:{
        isString: true,
        trim: true,
        isEmpty: false
    },
    kesulitan:{
        isString: true,
        isEmpty: false,
        trim: true
    },
    estimasiHarga:{
        isEmpty:false,
        isString: true,
    },
    tipeId:{
        isEmpty:false,
    },
    parent:{
        isEmpty:false,
    },
    createdBy:{
        isEmpty:false,
    },
    updatedBy:{
        isEmpty:false
    }

}