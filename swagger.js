const swaggerAutogen = require ('swagger-autogen')

const doc = {
    info: {
        title: 'Tooth Lengths API',
        description: 'API for managing approximate tooth lengths',
    },
    host: 'localhost:3000',
    schemes: ['http'],
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);