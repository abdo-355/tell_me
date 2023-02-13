import app from "../app";
import supertest from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { signupInput, loginInput } from "../fixtures/input-data";
import User from "../models/User";

describe("Sign up", () => {
  it("should send an error with 400 with the array of the errors if recieved invalid input", async () => {
    const res = await supertest(app)
      .post("/auth/signup")
      .send({ firstName: "test" });

    expect(res.status).toEqual(400);
    expect(Array.isArray(res.body.message)).toBe(true);
  });

  it("should return a message with a 400 status if the user exists", async () => {
    const userFindMock = jest
      .spyOn(User, "findOne")
      //@ts-ignore
      .mockReturnValueOnce(true);

    const res = await supertest(app).post("/auth/signup").send(signupInput);

    expect(userFindMock).toBeCalledWith({ email: signupInput.email });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "this email already exists");
  });

  it("should return a message with a 201 status", async () => {
    const userFindMock = jest
      .spyOn(User, "findOne")
      //@ts-ignore
      .mockReturnValueOnce(false);

    jest.spyOn(User.prototype, "save").mockReturnValueOnce({});

    const res = await supertest(app).post("/auth/signup").send(signupInput);

    expect(userFindMock).toBeCalledWith({ email: signupInput.email });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "user signed up successfully");
  });
});

describe("Login", () => {
  it("should send an error with 400 with the array of the errors if recieved invalid input", async () => {
    const res = await supertest(app)
      .post("/auth/login")
      .send({ email: "test" });

    expect(res.status).toEqual(400);
    expect(Array.isArray(res.body.message)).toBe(true);
  });

  it("should return a 404 with a message if the user doesn't exist", async () => {
    //@ts-ignore
    jest.spyOn(User, "findOne").mockReturnValueOnce(false);

    const { statusCode, body } = await supertest(app)
      .post("/auth/login")
      .send(loginInput);

    expect(statusCode).toBe(404);
    expect(body).toHaveProperty("message", "No such user exists");
  });

  it("should return a 403 for incorrect password", async () => {
    //@ts-ignore
    jest.spyOn(User, "findOne").mockReturnValueOnce(true);
    //@ts-ignore
    jest.spyOn(bcrypt, "compare").mockReturnValueOnce(false);

    const { statusCode, body } = await supertest(app)
      .post("/auth/login")
      .send(loginInput);

    expect(statusCode).toBe(403);
    expect(body).toHaveProperty("message", "Incorrect Password");
  });

  it("should return a 200 with a token", async () => {
    jest
      .spyOn(User, "findOne")
      //@ts-ignore
      .mockReturnValueOnce({ email: loginInput.email, _id: "userId" });
    //@ts-ignore
    jest.spyOn(bcrypt, "compare").mockReturnValueOnce(true);

    const jwtSign = jest.spyOn(jwt, "sign");
    //@ts-ignore
    jwtSign.mockReturnValueOnce("generated jwt token");

    const { statusCode, body } = await supertest(app)
      .post("/auth/login")
      .send(loginInput);

    expect(jwtSign).toBeCalled();
    expect(statusCode).toBe(202);
    expect(body).toHaveProperty("token", "generated jwt token");
  });
});
