const amqp = require('amqplib');

let canal; // Variável global para guardar a conexão

async function conectarRabbitMQ() {
    try {
        const conexao = await amqp.connect('amqp://localhost');
        canal = await conexao.createChannel();

        const exchange = 'notificacoes_exchange';
        await canal.assertExchange(exchange, 'fanout', { durable: true });

        await canal.assertQueue('fila_email', { durable: true });
        await canal.assertQueue('fila_sms', { durable: true });
        await canal.assertQueue('fila_telegram', { durable: true });

        await canal.bindQueue('fila_email', exchange, '');
        await canal.bindQueue('fila_sms', exchange, '');
        await canal.bindQueue('fila_telegram', exchange, '');

        console.log("RabbitMQ conectado e infraestrutura configurada.");
    } catch (erro) {
        console.error("Erro crítico no RabbitMQ:", erro);
        throw erro;
    }
}

// Função para outros arquivos pegarem a conexão já aberta
function getCanal() {
    if (!canal) throw new Error("Canal do RabbitMQ não foi inicializado!");
    return canal;
}

module.exports = { conectarRabbitMQ, getCanal };