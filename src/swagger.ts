import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction
  ? 'https://stage-api.syinq.com'
  : `http://localhost:${process.env.PORT || 8001}`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Syinq API',
      version: '1.0.0',
      description: 'API documentation for the   Syinq platform',
      contact: {
        name: 'API Support',
        email: 'getyousync@gmail.com',
      },
    },
    servers: [
      {
        url: serverUrl,
        description: isProduction ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        refreshToken: {
          type: 'apiKey',
          in: 'header',
          name: 'X-Refresh-Token',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controller/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  // Swagger UI page
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
  }));

  // API docs in JSON format
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
