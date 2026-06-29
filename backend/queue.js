const { Queue } = require('bullmq');

const connection = {
  host: 'localhost',
  port: 6379,
};

const submissionQueue = new Queue('submissionQueue', { connection });

module.exports = { submissionQueue, connection };