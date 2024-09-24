import { validationResult } from "express-validator";

export const validResult = (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return setTimeout(() => {
      return response
        .status(200)
        .send({ status: 400, content: result.array() });
    }, 3000);
  next();
};
