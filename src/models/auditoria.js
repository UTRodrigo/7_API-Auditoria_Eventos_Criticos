const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    originIP: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    action: {
        type: String,
        required: true
    },
    statusCode: {
        type: Number,
        required: true
    },
    methodHTTP: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Auditoria", auditSchema);