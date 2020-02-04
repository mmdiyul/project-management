exports.schema = {
    nama:{
        isString: true,
        trim: true,
        isEmpty: false,
    },
    deskripsi: {
        isString: true,
        isEmpty: false
    },
    waktuPekerjaan:{
        trim: true,
        isEmpty: false
    },
    kesulitan:{
        isEmpty: false,
        trim: true
    },
    estimasiHarga:{
        isEmpty:false,
        trim: true
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