import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { config } from "./app.config";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description:
        "API Documentation for a powerful and scalable multi-tenancy project management system built with Node.js, MongoDB, and React. Designed for real-world B2B needs, this project delivers features like Google Sign-In, workspace management, project tracking, task collaboration, role-based permissions, and more."
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
        description: "For Development",
        variables: {
          port: {
            default: config.PORT
          },
          basePath: {
            default: config.BASE_PATH
          },
          version: {
            default: "1.0.0"
          }
        }
      },
      {
        url: `https://api.minhdev.top`,
        description: "For Production",
        variables: {
          version: {
            default: "1.0.0"
          },
          basePath: {
            default: config.BASE_PATH
          }
        }
      }
    ]
  },
  apis: ["../src/routes/*.ts"]
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
