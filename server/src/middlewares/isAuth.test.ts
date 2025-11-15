import { Request, Response } from "express";

jest.mock("@clerk/clerk-sdk-node", () => ({
  Clerk: jest.fn(),
  ClerkExpressRequireAuth: jest.fn(() => (req: any, res: any, next: any) => {
    req.auth = { userId: "testUserId" };
    next();
  }),
}));

import isAuth from "./isAuth";

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

  it("should add the user Id to the request body then redirect to the controller for valid token", () => {
    const next = jest.fn(() => {});

    isAuth(req, res, next);

    expect(req).toHaveProperty("userId", "testUserId");
    expect(next).toBeCalledTimes(1);
  });
});
