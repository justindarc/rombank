import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpException } from '@exceptions/HttpException';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
};

// Simple alternative to "class-transformer" (https://www.npmjs.com/package/class-transformer)
function plainToInstance(cls: any, plain: any): any {
  const instance = new cls();
  for (const key in plain) {
    if (Object.prototype.hasOwnProperty.call(plain, key)) {
      const element = plain[key];
      if (element !== '') {
        instance[key] = element;
      }
    }
  }
  return instance;
}

export default validationMiddleware;
