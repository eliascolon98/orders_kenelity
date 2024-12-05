export const jwtConfig = () => ({
  key: process.env.JWT_KEY || 'secret',
  expires: process.env.JWT_EXPIRES || '12h',
});

export default jwtConfig();
