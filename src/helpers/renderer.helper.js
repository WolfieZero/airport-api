const { RESPONSE } = require('../config');

/**
 * Preps the render function for Express controller.
 *
 * @param {Object} response
 * @param {Function} next
 */
const renderer = (response, next) => {
  const success = (output, status) => {
    response.status(status).send(output);
    next();
  };

  const error = (output, status, error) => {
    response.status(status).send({
      error: output,
      reason: error.message.split('\n'),
    });
    next();
  };

  return {
    ok: output => success(output, RESPONSE.SUCCESS),
    created: output => success(output, RESPONSE.CREATED),
    accepted: output => success(output, RESPONSE.ACCEPTED),
    notFound: (output, errorResponse) => error(output, RESPONSE.NOT_FOUND, errorResponse),
    badRequest: (output, errorResponse) => error(output, RESPONSE.BAD_REQUEST, errorResponse),
    error: (output, errorResponse) => error(output, RESPONSE.ERROR, errorResponse),
  };
};

module.exports = renderer;
