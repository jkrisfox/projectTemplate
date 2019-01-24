import express from "express";
import request from "supertest";
import { Connection } from "typeorm";
import { DBConnection } from "../../connection";
import { Session, User } from "../../entity";
import { Server } from "../../server";

import { getConnection } from "typeorm";

describe("/login", () => {
  let app: express.Application;
  let connection: Connection;

  function clearDB(): Promise<any> {
    return connection
      .getRepository(Session)
      .delete({})
      .then(() => {
        return connection.getRepository(User).delete({});
      });
  }

  beforeAll(async () => {
    app = await new Server().getMyApp();
    connection = getConnection();
    await connection.synchronize();
    await clearDB();
    await connection.manager.insert(User, {
      emailAddress: "test@test.com",
      firstName: "test",
      lastName: "test",
      password: "password",
    });
  });

  afterAll(async () => {
    await DBConnection.closeConnection();
  });

  test("should login successfully", done => {
    request(app)
      .post("/login")
      .send({ emailAddress: "test@test.com", password: "password" })
      .expect(200)
      .then((res: request.Response) => {
        expect(res.body.token).toBeDefined();
        done();
      });
  });
});
