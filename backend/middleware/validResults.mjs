import { validationResult } from "express-validator";

export const validResult = (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(200).send({ status: 400, content: result.array() });
  next();
};

export const validResultEmail = (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(200).send({ status: 400, msg: "invalid Email" });
  next();
};

export const validResultPrivate = (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(200).send({
      status: 400,
      title: "Invalid Verification Link",
      msg: "The link you used is invalid. Please check your email for a valid verification link or request a new one if needed.",
    });

  next();
};
