const express = require('express')
const animalRouter = require('./router/animal_router');
const proprietarioRouter = require('./router/proprietario_router');

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Trabalho de Serviços e APIs<h1>')
})

app.use('/api/animais', animalRouter);
app.use('/api/proprietarios', proprietarioRouter);

app.listen(port, () => {
    console.log('Rodando')
})