require('dotenv').config();
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: process.env.ES_HOST });

module.exports = client;
