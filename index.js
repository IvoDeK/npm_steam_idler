const steamUser = require('steam-user');

const users = new Map();

class user {
    constructor(accountName, password, gameids) {
        this.sUser = new steamUser();
        this.accountName = accountName;
        this.password = password;
        this.gameids = gameids;
    }

    LogIn() {
        LoginUser(this.sUser, this.accountName, this.password);
        return this;
    }

    StartIdle() {
        Idle(this.sUser, this.accountName, this.password, this.gameids);
        return this;
    }
}

function LoginUser(sUser, accountName, password) {
    sUser.logOff();
    sUser.logOn({
        accountName: accountName,
        password: password,
        rememberPassword: true,
        promptSteamGuardCode: true
    });

    sUser.on('error', err => {
        return undefined;
    });
}

function Idle(sUser, accountName, password, gameids) {
    LoginUser(sUser, accountName, password);

    sUser.on("loggedOn", () => {
        sUser.setPersona(steamUser.EPersonaState.Online);
        sUser.gamesPlayed(gameids);
        console.log(`Idling: ${gameids.length} game${gameids.length > 1? "s":""} on: ${sUser.vanityURL || sUser.steamID}`);
    });
}

/**
 *
 * @param {string} username - Put your steam username here
 * @param {string} password - Put your steam password here
 * @param {number[]} gameids - Put several or one steam game id in here
 *
 */

module.exports.setAccount = function({username, password, gameids}) {
    if (!username || typeof username !== "string") return console.log(`\x1b[5m\x1b[30m\x1b[41m✗\x1b[0m \x1b[31mInvalid username.\x1b[0m`);
    if (!password || typeof password !== "string") return console.log(`\x1b[5m\x1b[30m\x1b[41m✗\x1b[0m \x1b[31mInvalid password.\x1b[0m`);
    if (!gameids || gameids.find(id => typeof id !== "number")) return console.log(`\x1b[5m\x1b[30m\x1b[41m✗\x1b[0m \x1b[31mInvalid gameids.\x1b[0m`);
    if (users.has(username)) return console.log(`\x1b[5m\x1b[30m\x1b[41m✗\x1b[0m \x1b[31mThis account already exists.\x1b[0m`);
    users[username] = new user(username, password, gameids);
    users[username].LogIn();
    return console.log(`\x1b[5m\x1b[30m\x1b[42m✓\x1b[0m \x1b[32mAdded ${username}'s account!\x1b[0m`);
}

/**
 *
 * @param {string} username - Put a steam username here
 *
 */

module.exports.startClient = function(username) {
    if (users[username]) return users[username].StartIdle();
    return console.log(`\x1b[5m\x1b[30m\x1b[41m✗\x1b[0m \x1b[31mNo account could be found.\x1b[0m`);
}