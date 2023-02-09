import supertest from "supertest";

import app from "../app";
import User from "../models/User";

describe("messages", () => {
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
