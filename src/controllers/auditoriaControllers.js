const Auditoria = require("../models/auditoria");
const mongoose = require("mongoose");

exports.getLogs = async(req, res) => {
    try
    {
        const logs = await Auditoria.find().populate("usuarioId", "name email").sort({ timestamp: -1 });
        res.status(200).json(logs);
    }
    catch(error)
    {
        res.status(500).json({error: "Error while retrieving logs", errorMSG: error});
    }
}

exports.getLogById = async(req, res) => {
    try
    {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({msg: "Invalid log ID"});
        }

        const log = await Auditoria.findById(id).populate("usuarioId", "name email");
        if (!log)
        {
            return res.status(404).json({msg: "Log not found"});
        }

        res.status(200).json(log);
    }
    catch(error)
    {
        res.status(500).json({error: "Error while retrieving audit log", errorMSG: error});
    }
}

exports.getLogsByUser = async(req, res) => {
    try
    {
        const { usuarioId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(usuarioId))
        {
            return res.status(400).json({msg: "Invalid user ID"});
        }

        const logs = await Auditoria.find({usuarioId: usuarioId}).populate("usuarioId", "name email").sort({ timestamp: -1 });

        res.status(200).json(logs);
    }
    catch(error)
    {
        res.status(500).json({error: "Error while retrieving user logs", errorMSG: error});
    }
}