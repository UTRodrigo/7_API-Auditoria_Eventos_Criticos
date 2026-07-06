const Usuario = require("../models/usuario");

exports.createUsuario = async(req, res) => {
    try
    {
        const {name, email} = req.body;

        let usuario = await Usuario.findOne({email});
        if(usuario)
        {
            return res.status(400).json({msg: "User already exists"});
        }

        usuario = new Usuario({name, email});
        await usuario.save();
        res.status(201).json({msg: "User created successfully"});
    }
    catch(error)
    {
        res.status(500).json({error: "Error while creating user", errorMSG: error});
    }
}

exports.getUsuario = async(req, res) => {
    try{
        const {id} = req.params;
        const usuario = await Usuario.findById(id);

        if(!usuario)
        {
            return res.status(404).json({msg: "User not found"});
        }
        res.status(200).json({usuario});
    }
    catch(error)
    {
        res.status(500).json({error: "Error while retrieving user", errorMSG: error});
    }
}

exports.getAllUsuarios = async(req, res) => {
    try{
        const usuarios = await Usuario.find();
        if(usuarios.length === 0)
        {
            return res.status(404).json({msg: "Cant find any users"});
        }
        res.status(200).json(usuarios);
    }
    catch(error)
    {
        res.status(500).json({error: "Error while retrieving all users", errorMSG: error});
    }
}

exports.updateUsuario = async(req, res) => {
    try
    {
        const {id} = req.params;
        const {name, email} = req.body;

        let usuario = await Usuario.findById(id);
        if(!usuario)
        {
            return res.status(404).json({msg: "User not found to update"});
        }

        if(name !== undefined)
        {
            usuario.name = name;
        }
        if(email !== undefined)
        {
            usuario.email = email;
        }

        await usuario.save();
        res.status(200).json({msg: "User updated successfully"});

    }
    catch(error)
    {
        res.status(500).json({error: "Error while updating user", errorMSG: error});
    }
}

exports.deleteUsuario = async(req, res) => {
    try
    {
        const {id} = req.params;
        const usuario = await Usuario.findById(id);

        if(!usuario)
        {
            return res.status(404).json({msg: "User not found for delete"});
        }

        await usuario.deleteOne();
        res.status(200).json({msg: "User deleted successfully"});
    }
    catch(error)
    {
        res.status(500).json({error: "Error while deleting a user", errorMSG: error});
    }
}