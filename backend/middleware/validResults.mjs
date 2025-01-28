import { validationResult } from "express-validator";

export const validResult = (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return response
      .status(200)
      .send({ status: 400, msg: result.array()[0].msg });
  next();
};

export const validResultEmail = (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(200).send({ status: 400, msg: "invalid Email" });
  next();
};

export const validResultPassword = (request, response, next) => {
  const result = validationResult(request);
  if (!result.isEmpty())
    return response.status(200).send({
      status: 400,
      title: "Invalid Link",
      msg: "The link you used is invalid. Please check your email for a valid link or request a new one if needed.",
    });
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
