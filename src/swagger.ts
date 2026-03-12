// Die Spezifikation ist absichtlich im Code gehalten, damit du sie direkt nachvollziehen kannst.
export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'eCommerce API',
    version: '1.0.0',
    description: 'CRUD API fuer Benutzer, Kategorien, Produkte und Bestellungen.'
  },
  servers: [
    {
      url: 'http://localhost:3000'
    }
  ],
  tags: [{ name: 'Users' }, { name: 'Categories' }, { name: 'Products' }, { name: 'Orders' }],
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Category: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          price: { type: 'number' },
          categoryId: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      OrderItem: {
        type: 'object',
        properties: {
          productId: { type: 'string' },
          quantity: { type: 'integer', minimum: 1 }
        },
        required: ['productId', 'quantity']
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          userId: { type: 'string' },
          products: {
            type: 'array',
            items: { $ref: '#/components/schemas/OrderItem' }
          },
          totalAmount: { type: 'number' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      }
    }
  },
  paths: {
    '/api/users': {
      get: { tags: ['Users'], responses: { '200': { description: 'OK' } } },
      post: { tags: ['Users'], responses: { '201': { description: 'Created' } } }
    },
    '/api/users/{id}': {
      get: {
        tags: ['Users'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' } }
      },
      put: {
        tags: ['Users'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' } }
      },
      delete: {
        tags: ['Users'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '204': { description: 'No Content' } }
      }
    },
    '/api/categories': {
      get: { tags: ['Categories'], responses: { '200': { description: 'OK' } } },
      post: { tags: ['Categories'], responses: { '201': { description: 'Created' } } }
    },
    '/api/categories/{id}': {
      get: {
        tags: ['Categories'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' } }
      },
      put: {
        tags: ['Categories'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' } }
      },
      delete: {
        tags: ['Categories'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '204': { description: 'No Content' } }
      }
    },
    '/api/products': {
      get: { tags: ['Products'], responses: { '200': { description: 'OK' } } },
      post: { tags: ['Products'], responses: { '201': { description: 'Created' } } }
    },
    '/api/products/{id}': {
      get: {
        tags: ['Products'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' } }
      },
      put: {
        tags: ['Products'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' } }
      },
      delete: {
        tags: ['Products'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '204': { description: 'No Content' } }
      }
    },
    '/api/orders': {
      get: { tags: ['Orders'], responses: { '200': { description: 'OK' } } },
      post: { tags: ['Orders'], responses: { '201': { description: 'Created' } } }
    },
    '/api/orders/{id}': {
      get: {
        tags: ['Orders'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' } }
      },
      put: {
        tags: ['Orders'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' } }
      },
      delete: {
        tags: ['Orders'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '204': { description: 'No Content' } }
      }
    }
  }
};
