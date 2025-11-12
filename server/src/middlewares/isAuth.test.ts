import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import isAuth from "./isAuth";
import { config } from "../config";

const req = {
  headers: {},
} as Request;
const res = {
  json: jest.fn((obj: Object) => {}),
  status: jest.fn((num: Number) => res),
} as unknown as Response;

describe("auth middleware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 status code with a message if no token was provided", () => {
    const resMessage = {
      message: "No 'authorization' header was provided",
    };

    isAuth(req, res, () => {});

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith(resMessage);
  });

  it("should return 401 status code with a message if the token expired", () => {
    req.headers.authorization =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2NhZTY2ZTc2N2I0NTIxZjg5YWU3YTQiLCJpYXQiOjE2NzQ3NDY4NDYsImV4cCI6MTY3NDc0Njg2MX0.haOddMemPIxKgbwfgdv5qKWheEhvGUMEaeXXqh6QnXY";

    const resMessage = {
      message: "jwt expired",
    };

    isAuth(req, res, () => {});

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith(resMessage);
    req.headers = {};
  });

  it("should add the user Id to the request body then redirect to the controller for valid token", () => {
    const userId = "userIdFromtheDb";

    req.headers.authorization = `Bearer ${jwt.sign(
      { userId },
      config.secretKey
    )}`;

    const next = jest.fn(() => {});

    isAuth(req, res, next);

    expect(req).toHaveProperty("userId", userId);
    expect(next).toBeCalledTimes(1);
  });
});
