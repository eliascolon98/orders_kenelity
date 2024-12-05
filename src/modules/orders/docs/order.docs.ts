import { ApiResponseOptions } from '@nestjs/swagger';

const ApiResponseNewOrder: ApiResponseOptions = {
  status: 201,
  description:
    'The order has been successfully created and the body contains the details of the new order.',
  schema: {
    type: 'object',
    properties: {
      clientName: {
        type: 'string',
        example: 'Juan',
      },
      total: {
        type: 'number',
        example: 100,
      },
      products: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '6750c9eaf0c93d2b3b7c523f',
            },
            quantity: {
              type: 'number',
              example: 5,
            },
            name: {
              type: 'string',
              example: 'Product1',
            },
            picture: {
              type: 'string',
              example:
                'C:\\Users\\Usuario\\Desktop\\base\\backend-orders\\uploads\\1733347284133_69A9385.webp',
            },
            price: {
              type: 'number',
              example: 1000,
            },
          },
        },
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2024-12-04T22:37:30.973Z',
      },
      orderNumber: {
        type: 'number',
        example: 559131,
      },
      _id: {
        type: 'string',
        example: '6750d9aaa6fe197050c96610',
      },
    },
  },
};

const ApiResponseAllOrders: ApiResponseOptions = {
  status: 200,
  description:
    'Returns a list of all orders with pagination metadata and their respective details.',
  schema: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '6750a81b6df7719fae9e2a7b',
            },
            clientName: {
              type: 'string',
              example: 'Juan',
            },
            total: {
              type: 'number',
              example: 100,
            },
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '6750c7d4cf8a2ca2735196d2',
                  },
                  quantity: {
                    type: 'number',
                    example: 5,
                  },
                  name: {
                    type: 'string',
                    example: 'Product1',
                  },
                  picture: {
                    type: 'string',
                    example:
                      'C:\\Users\\Usuario\\Desktop\\base\\backend-orders\\uploads\\1733347284133_69A9385.webp',
                  },
                  price: {
                    type: 'number',
                    example: 1000,
                  },
                  productId: {
                    type: 'string',
                    example: '1',
                  },
                },
                required: ['quantity', 'productId'],
              },
            },
            orderNumber: {
              type: 'number',
              example: 747715,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-12-04T19:06:03.626Z',
            },
          },
        },
      },
      meta: {
        type: 'object',
        properties: {
          page: {
            type: 'string',
            example: '1',
          },
          take: {
            type: 'string',
            example: '10',
          },
          total: {
            type: 'number',
            example: 0,
          },
          pageCount: {
            type: 'number',
            example: 0,
          },
          hasPreviousPage: {
            type: 'boolean',
            example: false,
          },
          hasNextPage: {
            type: 'boolean',
            example: false,
          },
        },
      },
    },
  },
};

export { ApiResponseNewOrder, ApiResponseAllOrders };
