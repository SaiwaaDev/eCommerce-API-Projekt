import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

export type RequestSchemas = {
  body?: ZodType<unknown>;
  params?: ZodType<unknown>;
  query?: ZodType<unknown>;
};

export const validateRequest = (schemas: RequestSchemas) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      req.validated ??= {
        body: undefined,
        params: undefined,
        query: undefined
      };

      // Pro Segment (Body, Params, Query) separat validieren und danach typisiert ablegen.
      if (schemas.body) {
        req.validated.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.validated.params = schemas.params.parse(req.params);
      }

      if (schemas.query) {
        req.validated.query = schemas.query.parse(req.query);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
