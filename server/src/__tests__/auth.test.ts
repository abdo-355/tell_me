import app from "../app";
import supertest from "supertest";

import { signupInput } from "./fixtures/input-data";
import User from "../models/User";

describe("Sign up", () => {
  describe("invalid input", () => {
    it("should send an error with 400 with the array of the errors if recieved invalid input", async () => {
      const res = await supertest(app)
        .post("/auth/signup")
        .send({ firstName: "test" });

      expect(res.status).toEqual(400);
      expect(Array.isArray(res.body.message)).toBe(true);
    });
  });

  describe("valid input", () => {
    jest.setTimeout(50000);
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
});
