const { getCanal } = require('../config/rabbitmq'); 

async function enviarNotificacao(req, res) {
    try {
        const payload = req.body;

        if (!payload.nome || !payload.evento) {
            return res.status(400).json({ erro: "Dados incompletos. 'nome' e 'evento' são obrigatórios." });
        }

        const canal = getCanal();
        const exchange = 'notificacoes_exchange';
        const mensagemBuffer = Buffer.from(JSON.stringify(payload));

        canal.publish(exchange, '', mensagemBuffer);

        console.log(`[x] Evento '${payload.evento}' para '${payload.nome}' enfileirado.`);
        
        return res.status(200).json({ mensagem: "Notificação enfileirada com sucesso!" });

    } catch (erro) {
        console.error("Erro no Controller de Notificação:", erro);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
}

module.exports = { enviarNotificacao };