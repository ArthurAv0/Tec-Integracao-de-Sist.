const express = require('express');
const rotas = require('./routes/routes'); 
const { conectarRabbitMQ } = require('./config/rabbitmq'); 

const app = express();

app.use(express.json());
app.use(rotas);

const PORTA = 3000;

conectarRabbitMQ()
    .then(() => {
        app.listen(PORTA, () => {
            console.log(`Servidor rodando na porta ${PORTA}.`);
        });
    })
    .catch((erro) => {
        console.error("Falha ao iniciar o servidor por falta de mensageria.");
        process.exit(1);
    });