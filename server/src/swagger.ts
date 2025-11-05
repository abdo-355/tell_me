import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TellMe API',
      version: '1.0.0',
      description: 'API documentation for TellMe messaging application',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              description: 'User first name',
            },
            lastName: {
              type: 'string',
              description: 'User last name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            verified: {
              type: 'boolean',
              description: 'Whether the user email is verified',
            },
            path: {
              type: 'string',
              description: 'Unique path for receiving messages',
            },
            messages: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of received messages',
            },
          },
        },
        SignupRequest: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            firstName: {
              type: 'string',
              description: 'User first name (alphanumeric, English/Arabic)',
              minLength: 1,
            },
            lastName: {
              type: 'string',
              description: 'User last name (alphanumeric, English/Arabic)',
              minLength: 1,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Valid email address',
            },
            password: {
              type: 'string',
              description: 'Password (minimum 8 characters)',
              minLength: 8,
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
            },
            password: {
              type: 'string',
              description: 'User password',
              minLength: 8,
            },
          },
        },
        MessageRequest: {
          type: 'object',
          required: ['message'],
          properties: {
            message: {
              type: 'string',
              description: 'Message content to send',
              minLength: 1,
            },
          },
        },
        ResendEmailRequest: {
          type: 'object',
          required: ['token'],
          properties: {
            token: {
              type: 'string',
              description: 'JWT token for user authentication',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  msg: {
                    type: 'string',
                  },
                  param: {
                    type: 'string',
                  },
                  location: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT authentication token',
            },
          },
        },
        PathResponse: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              description: 'Unique path for receiving messages',
            },
          },
        },
        MessagesResponse: {
          type: 'object',
          properties: {
            messages: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array of received messages (most recent first)',
            },
            path: {
              type: 'string',
              description: 'User path',
            },
          },
        },
        HealthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok',
            },
          },
        },
      },
    },
    paths: {
      '/api': {
        get: {
          summary: 'API status check',
          description: 'Check if the API is running',
          responses: {
            200: {
              description: 'API is working',
              content: {
                'text/plain': {
                  schema: {
                    type: 'string',
                    example: 'The server is working',
                  },
                },
              },
            },
          },
        },
      },
      '/health': {
        get: {
          summary: 'Health check',
          description: 'Check the health status of the server',
          responses: {
            200: {
              description: 'Server is healthy',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/HealthResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth': {
        get: {
          summary: 'Auth route status',
          description: 'Check if auth routes are working',
          responses: {
            200: {
              description: 'Auth route is working',
              content: {
                'text/plain': {
                  schema: {
                    type: 'string',
                    example: 'the auth route',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/signup': {
        post: {
          summary: 'User signup',
          description: 'Register a new user account',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SignupRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'email verification sent',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Validation error or email already exists',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/verify-email/{verificationCode}': {
        get: {
          summary: 'Verify email',
          description: 'Verify user email using verification code',
          parameters: [
            {
              name: 'verificationCode',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'Email verification code',
            },
          ],
          responses: {
            302: {
              description: 'Email verified successfully, redirects to frontend',
            },
            404: {
              description: 'Invalid verification code',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/resend-email': {
        post: {
          summary: 'Resend verification email',
          description: 'Resend email verification link',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ResendEmailRequest',
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Verification email sent',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Email verification sent successfully',
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'Invalid token',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/login': {
        post: {
          summary: 'User login',
          description: 'Authenticate user and return JWT token',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginRequest',
                },
              },
            },
          },
          responses: {
            202: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AuthResponse',
                  },
                },
              },
            },
            400: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            403: {
              description: 'Incorrect password',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/getuser': {
        get: {
          summary: 'Get user token',
          description: 'Get user authentication token (used for OAuth flows)',
          responses: {
            200: {
              description: 'User token retrieved',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/AuthResponse',
                  },
                },
              },
            },
            default: {
              description: 'No user found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'No user found',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/messages/path': {
        get: {
          summary: 'Get user message path',
          description: 'Get or generate a unique path for receiving messages',
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'User path retrieved/generated',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PathResponse',
                  },
                },
              },
            },
            401: {
              description: 'Unauthorized',
            },
            500: {
              description: 'Internal server error',
            },
          },
        },
      },
      '/api/messages/{userpath}': {
        post: {
          summary: 'Send message',
          description: 'Send a message to a user via their unique path',
          parameters: [
            {
              name: 'userpath',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'User unique path for receiving messages',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/MessageRequest',
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Message sent successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'message sent successfully',
                      },
                    },
                  },
                },
              },
            },
            403: {
              description: 'Validation error',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Error',
                  },
                },
              },
            },
            404: {
              description: 'Invalid user path',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'invalid URL',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'something went wrong',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/messages': {
        get: {
          summary: 'Get user messages',
          description: 'Get all messages received by the authenticated user',
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: 'Messages retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/MessagesResponse',
                  },
                },
              },
            },
            401: {
              description: 'Unauthorized',
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: {
                        type: 'string',
                        example: 'an error occured',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], // No need for JSDoc annotations since we're defining everything here
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };