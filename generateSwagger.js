const options = {
    swaggerDefinition: {
      info: {
        title: 'Trabalho de API',
        version: '1.0.00',
        description: 'API veterinária',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor de desenvolvimento',
        },
      ],
    },
    apis: ['./router/*.js'],
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
  fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
  