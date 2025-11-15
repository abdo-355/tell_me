import supertest from "supertest";

jest.mock("@clerk/clerk-sdk-node", () => ({
  Clerk: jest.fn(),
  ClerkExpressRequireAuth: jest.fn(() => (req: any, res: any, next: any) => {
    req.auth = { userId: "testUserId" };
    next();
  }),
  clerkClient: {
    users: {
      getUser: jest.fn(() => Promise.resolve({
        firstName: "Test",
        lastName: "User",
        emailAddresses: [{ emailAddress: "test@example.com" }],
      })),
    },
  },
}));

import app from "../app";
import User from "../models/User";

describe("messages", () => {
  describe("url generating", () => {
    it("should return 403 for if the message is empty", async () => {
      const { statusCode, body } = await supertest(app)
        .post("/api/messages/someRandomUserPath")
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
        .post("/api/messages/someRandomUserPath")
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
        .post("/api/messages/someRandomUserPath")
        .send({ message: "some random message" });

      expect(pushMessageMock).toBeCalledWith("some random message");
      expect(saveUserMock).toBeCalledTimes(1);
      expect(statusCode).toBe(201);
      expect(body).toEqual({ message: "message sent successfully" });
    });
  });

  describe("getting messages", () => {
    it("should return an empty array when no messages found", async () => {
      jest.spyOn(User, "findOne").mockResolvedValueOnce({ messages: [] });

      const { statusCode, body } = await supertest(app).get("/api/messages");

      expect(statusCode).toBe(200);
      expect(body).toEqual({ messages: [] });
    });

    it("should return array of messages when found", async () => {
      const messages = ["1st message", "2nd message", "3rd message"];

      jest.spyOn(User, "findOne").mockResolvedValueOnce({ messages });

      const { statusCode, body } = await supertest(app).get("/api/messages");

      expect(statusCode).toBe(200);
      expect(body).toEqual({ messages });
    });
  });
});
