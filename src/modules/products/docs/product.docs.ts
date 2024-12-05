import { ApiResponseOptions } from '@nestjs/swagger';

const ApiResponseProduct: ApiResponseOptions = {
  status: 201,
  description:
    'The product has been successfully created and the body contains the product.',
  schema: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            example: 'Product3',
          },
          sku: {
            type: 'string',
            example: '1234567892',
          },
          price: {
            type: 'string',
            example: '2000',
          },
          picture: {
            type: 'string',
            example:
              'C:\\Users\\Usuario\\Desktop\\base\\backend-orders\\uploads\\1733347818361_69A9369.webp',
          },
          _id: {
            type: 'string',
            example: '6750c9eaf0c93d2b3b7c523f',
          },
        },
      },
    },
  },
};

const ApiResponseAllProducts: ApiResponseOptions = {
  status: 200,
  description:
    'A list of products has been successfully retrieved along with metadata for pagination.',
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
              example: '6750c7d4cf8a2ca2735196d2',
            },
            name: {
              type: 'string',
              example: 'Product1',
            },
            sku: {
              type: 'string',
              example: '1234567890',
            },
            picture: {
              type: 'string',
              example:
                'C:\\Users\\Usuario\\Desktop\\base\\backend-orders\\uploads\\1733347284133_69A9385.webp',
            },
            price: {
              type: 'string',
              example: '1000',
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

export { ApiResponseProduct, ApiResponseAllProducts };
