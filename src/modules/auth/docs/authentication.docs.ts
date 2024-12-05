import { ApiResponseOptions } from '@nestjs/swagger';

const ApiResponseLogin: ApiResponseOptions = {
  status: 200,
  description:
    'Login Response: - Access Token and user information. the answer changes according to the role',
  schema: {
    type: 'object',
    properties: {
      data: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            example:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJjdXN0b21lckBnaW1hZ2luYW1vcy5jb20iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3Mjc3MTM3NjMsImV4cCI6MTc1OTI0OTc2M30.V7ku2vdaOJnFw5OJ-24gS6TyZe_D_yOC8cEkqfG2WCo',
          },
          user: {
            type: 'object',
            properties: {
              id: {
                type: 'number',
                example: 1,
              },
              email: {
                type: 'string',
                example: 'test@gmail.com',
              },
            },
          },
        },
      },
    },
  },
};

export { ApiResponseLogin };
