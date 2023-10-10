import supertest from "supertest";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import app from "../api";
import User from "../models/User";

config();

describe("messages", () => {
  describe("url generating", () => {
    it("should return 403 for if the message is empty", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/messages/someRandomUserPath")
        .send({ message: "" });

      expect(statusCode).toBe(403);
      expect(body).toHaveProperty("errors");
      expect(Array.isArray(body.errors)).toBeTruthy();
      expect(body.errors[0]).toEqual({
        location: "body",
        msg: "please provide a 'message' with the request",
        param: "message",
        value: "",
      });
    });

    it("should return 404 if the userPath does not exist", async () => {
      jest.spyOn(User, "findOne").mockResolvedValueOnce(undefined);

      const { statusCode, body } = await supertest(app)
        .post("/messages/someRandomUserPath")
        .send({ message: "some random message" });

      expect(statusCode).toBe(404);
      expect(body).toHaveProperty("error", "invalid URL");
    });

    it("should save the message to the specified user in the database then return 201", async () => {
      const pushMessageMock = jest.fn((msg: string) => {});
      const saveUserMock = jest.fn(async () => {});

      jest.spyOn(User, "findOne").mockResolvedValueOnce({
        save: saveUserMock,
        messages: {
          push: pushMessageMock,
        },
      });

      const { statusCode, body } = await supertest(app)
        .post("/messages/someRandomUserPath")
        .send({ message: "some random message" });

      expect(pushMessageMock).toBeCalledWith("some random message");
      expect(saveUserMock).toBeCalledTimes(1);
      expect(statusCode).toBe(201);
      expect(body).toEqual({ message: "message sent successfully" });
    });
  });

  describe("getting messages", () => {
    it("should return an empty array when no messages found", async () => {
      const userId = "some user id";

      jest.spyOn(User, "findById").mockResolvedValueOnce({ messages: [] });

      const { statusCode, body } = await supertest(app)
        .get("/messages")
        .set(
          "authorization",
          `Bearer ${jwt.sign({ userId }, process.env.SECRET_KEY)}`
        );

      expect(statusCode).toBe(200);
      expect(body).toEqual({ messages: [] });
    });

    it("should return array of messages when found", async () => {
      const userId = "some user id";

      const messages = ["1st message", "2nd message", "3rd message"];

      jest.spyOn(User, "findById").mockResolvedValueOnce({ messages });

      const { statusCode, body } = await supertest(app)
        .get("/messages")
        .set(
          "authorization",
          `Bearer ${jwt.sign({ userId }, process.env.SECRET_KEY)}`
        );

      expect(statusCode).toBe(200);
      expect(body).toEqual({ messages });
    });
  });
});
