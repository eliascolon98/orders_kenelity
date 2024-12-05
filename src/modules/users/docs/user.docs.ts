import { ApiResponseOptions } from '@nestjs/swagger';

const ApiResponseRegister_: ApiResponseOptions = {
  status: 201,
  description:
    'The user has been successfully created and the body contains the user.',
  schema: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            example: 'userexamen111@gmail.com',
          },
          password: {
            type: 'string',
            example: 'password123',
          },
          name: {
            type: 'string',
            example: 'User22',
          },
          phone: {
            type: 'string',
            example: '123422890',
          },

          role: {
            type: 'string',
            example: 'CUSTOMER',
          },
          corporate_user: {
            type: 'boolean',
            example: false,
          },
          lastLoginAt: {
            type: 'string',
            example: null,
            nullable: true, // Indica que puede ser null
          },
          id: {
            type: 'number',
            example: 5,
          },
          createdAt: {
            type: 'string',
            example: '2024-10-01T16:23:40.631Z',
          },
          updatedAt: {
            type: 'string',
            example: '2024-10-01T16:23:40.631Z',
          },
          deletedAt: {
            type: 'string',
            example: null,
            nullable: true, // Indica que puede ser null
          },
          is_active: {
            type: 'boolean',
            example: true,
          },
        },
      },
    },
  },
};



const ApiResponseMe_: ApiResponseOptions = {
  status: 200,
  description:
    'The response is the data of the user who is logged in at the moment',
  schema: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        example: 1,
      },
      createdAt: {
        type: 'string',
        example: '2024-09-26T18:31:15.132Z',
      },
      updatedAt: {
        type: 'string',
        example: '2024-09-26T18:31:15.132Z',
      },
      deletedAt: {
        type: 'string',
        example: null,
        nullable: true,
      },
      photo: {
        type: 'string',
        example: null,
      },
      name: {
        type: 'string',
        example: 'User1',
      },
      phone: {
        type: 'string',
        example: '1234567890',
      },
      document_type: {
        type: 'string',
        example: 'C.C',
      },
      document_number: {
        type: 'string',
        example: '1234567890',
      },
      address: {
        type: 'string',
        example: 'xxxxx 333',
      },

      domiciliary_id: {
        type: 'number',
        example: null,
      },
      email: {
        type: 'string',
        example: 'userexamen1@gmail.com',
      },
      role: {
        type: 'string',
        example: 'CUSTOMER',
      },
      corporate_user: {
        type: 'boolean',
        example: false,
      },
      permissions: {
        type: 'string',
        example: null,
      },
      is_active: {
        type: 'boolean',
        example: true,
      },
      lastLoginAt: {
        type: 'string',
        example: null,
        nullable: true,
      },
    },
  },
};


export {
  ApiResponseRegister_,
  ApiResponseMe_,
};
