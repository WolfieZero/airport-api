const Convert = require('unit-converter-pro');

exports.handler = async event => {
  const length = new Convert.Length();

  const from = event.queryStringParameters.from;
  const to = event.queryStringParameters.to;
  const amount = event.queryStringParameters.amount;

  const result = length[from](amount)[to]();

  return {
    statusCode: 200,
    body: `${amount} ${from} is ${result} ${to}`,
  };
};
