class appError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }

  toJSON() {
    return { name: this.name, message: this.message };
  }
}

module.exports = appError;
