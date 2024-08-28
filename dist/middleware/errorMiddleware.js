"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorMiddleware;
function errorMiddleware(err, req, res, next) {
    console.log('errorMiddleware exception', err);
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.json({
        status,
        message,
    });
}
