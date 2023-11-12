function CustomError(msgOrObj) {
  Object.entries(msgOrObj).forEach(([key, val]) => {
    this[key] = val;
  });
  this.name = msgOrObj.name || 'CustomError';
  this.message = msgOrObj?.message || message || '';
  let error = new Error(this.message?.message || this.message);
  error.name = this.name;
  this.stack = error.stack;
}

CustomError.prototype = Object.create(Error.prototype);



const validateRequiredFields = (fields) => {
  let requiredFields = "";

  Object.entries(fields).forEach(([key, value]) => {
    if (!value) {
      requiredFields += `${key}, `;
    }
  });

  if (requiredFields !== "") {
    throw new CustomError({ name: "ValidationError", statusCode: 400, message: `${requiredFields}must be provided`, });
  }
}

const validatePassword = (password) => {
  const regexs = [/[A-Z]/, /[a-z]/, /[0-9]/, /[!@#$%^&*()\-_=+]/];
  if (password.length < 6 || !regexs.every(rgx => password.match(rgx))) {
    throw new CustomError({ name: "ValidationError", statusCode: 400, message: "Password format didn't match. Format: Minimum of 6 characters. Consist of lowercase letters, and at least 1 uppercase letter, 1 number, and 1 symbol" });
  }
  return true;
}

const sequelizeErrorHandler = (error, { res }) => {
  if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(error.name)) {
    const errorFieldList = {};
    error?.errors?.map(err => {
      errorFieldList[err.path] = errorFieldList[err.path] ? errorFieldList[err.path].concat([err.message]) : [err.message];
    })
    return res.status(400).send({ message: `Error validation of: ${Object.keys(errorFieldList).join(", ")}`, errorField: errorFieldList, error });
  }
  return null;
}

module.exports = {
  sequelizeErrorHandler,
  validateRequiredFields,
  validatePassword,
}