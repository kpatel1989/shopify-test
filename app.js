global.ROOT_PATH = __dirname;
global.SERVER_PATH = global.ROOT_PATH + "/server";
global.CLIENT_PATH = global.ROOT_PATH + "/client";

var Server = require(global.SERVER_PATH + "/server");
Server.start();