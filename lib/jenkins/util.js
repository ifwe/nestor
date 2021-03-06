var text = require('bagoftext');

/**
 * Handle success simply by passing result's (response) body through to callback.
 *
 * @param {Object} result: result of the sent request
 * @param {Function} cb: standard cb(err, result) callback
 */
function passThroughSuccess(result, cb) {
  cb(null, result.body);
}

/**
 * Parse HTML error page from Jenkins, pass the error message to the callback.
 * This error is usually the response body of error 400.
 *
 * @param {Object} result: result of the sent request
 * @param {Function} cb: standard cb(err, result) callback
 */
function htmlError(result, cb) {
  var message = result.body
    .match(/<h1>Error<\/h1>.+<\/p>/).toString()
    .replace(/<h1>Error<\/h1>/, '')
    .replace(/<\/?p>/g, '');
  cb(new Error(message));
}

/**
 * Create a 'job not found' error handler function.
 *
 * @param {String} name: the job name
 * @return a handler function 
 */
function jobNotFoundError(name) {
  return function (result, cb) {
    cb(new Error(text.__('Job %s does not exist', name)));
  };
}

/**
 * Create a 'view not found' error handler function.
 *
 * @param {String} name: the view name
 * @return a handler function 
 */
function viewNotFoundError(name) {
  return function (result, cb) {
    cb(new Error(text.__('View %s does not exist', name)));
  };
}

exports.passThroughSuccess = passThroughSuccess;
exports.htmlError          = htmlError;
exports.jobNotFoundError   = jobNotFoundError;
exports.viewNotFoundError  = viewNotFoundError;