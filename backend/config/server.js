module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'ec8d2f75c1cdfdd3408d2dec4d4ccf62'),
    },
  },
});
