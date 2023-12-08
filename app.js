const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const animalRouter = require('./router/animal_router');
const proprietarioRouter = require('./router/proprietario_router');

const app = express()
const port = 3000

var swaggerDefinition ={
    info: {
        title: "Node Swagger",
        version: "1.0.00",
        description: "Documentação de API"
    },
    components: {
        schemas: require("./schemas.json")
    }
}

var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./router/*.js']
}

var swaggerSpec = swaggerJSDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));


app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Trabalho de Serviços e APIs<h1>')
})

app.use('/api/animais', animalRouter);
app.use('/api/proprietarios', proprietarioRouter);

app.listen(port, () => {
    console.log('Rodando')
})