const Auditoria = require("../models/auditoria");
const mongoose = require("mongoose");

exports.getLogs = async(req, res) => {
    try
    {
        const logs = await Auditoria.find().populate("userId", "name email").sort({ timestamp: -1 });
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

        const log = await Auditoria.findById(id).populate("userId", "name email");
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
        const { userId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(userId))
        {
            return res.status(400).json({msg: "Invalid user ID"});
        }

        const logs = await Auditoria.find({userId: userId}).populate("userId", "name email").sort({ timestamp: -1 });

        res.status(200).json(logs);
    }
    catch(error)
    {
        res.status(500).json({error: "Error while retrieving user logs", errorMSG: error});
    }
}