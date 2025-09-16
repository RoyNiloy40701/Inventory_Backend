const serverlessExpress = require('@vendia/serverless-express');
const app = require('../../app'); // Import your app.js

exports.handler = serverlessExpress({ app });
