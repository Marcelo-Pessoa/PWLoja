import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';

dotenv.config();

const doc = {
  info: {
    title: 'API da loja virtual',
    description: 'Documentação da API',
  },
  host: `${process.env.HOST}: ${process.env.PORT}`,
  definitions: {
    CreateProductDto: {
      name: 'Modern Soft Sausages',
      price: 2699.0,
      stockQuantity: 9,
    },
    Product: {
      id: '8a2053de-5d92-4c43-97c0-c9b2b0d56703',
      name: 'Modern Soft Sausages',
      price: 2699.0,
      stockQuantity: 9,
      createdAt: '2023-11-07T19:27:15.645Z',
      updatedAt: '2023-11-07T19:27:15.645Z',
    },
  },
};

const outputFile = './swagger-output.json';
const routes = ['./src/router/*.ts'];

swaggerAutogen()(outputFile, routes, doc);
