import express from "express";
import { Server } from "../../server";

export default class ServerConfig {

  public static getApplication(): Promise<express.Application> {
    if (ServerConfig.server) {
      return ServerConfig.server;
    } else {
      ServerConfig.server = new Server().appPromise;
      return ServerConfig.server;
    }
  }

  private static server: Promise<express.Application>;
}
