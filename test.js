const idle = require(process.cwd()+"/index.js");

idle.setAccount(process.env.username, process.env.pass, process.env.games.split(", ").map(Number));

idle.startClient(process.env.username);