const Auditoria = require("../models/auditoria");

const sanitizar = (texto) => {
    if (!texto) return "";

    return texto.toString().replace(/[\r\n]/g, "");
};

const auditoriaMiddleware = (req, res, next) => {
    // Solo se auditan modificaciones
    const metodosAuditables = ["POST", "PUT", "DELETE"];

    if (!metodosAuditables.includes(req.method)) {
        return next();
    }

    // Se guardamétodo original de respuesta
    const originalJson = res.json;

    res.json = async function (body) {
        try {
            const log = {
                timestamp: new Date(),
                originIP: sanitizar(
                    req.ip || req.connection.remoteAddress
                ),

                userId: req.body.userId || null,

                action: sanitizar(req.method),

                methodHTTP: sanitizar(req.method),

                endpoint: sanitizar(req.originalUrl),

                statusCode: res.statusCode
            };

            await Auditoria.create(log);

        } catch (error) {
            console.error("Audit log error:", error.message);
        }

        return originalJson.call(this, body);
    };

    next();
};

module.exports = auditoriaMiddleware;