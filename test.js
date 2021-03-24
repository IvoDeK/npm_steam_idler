const idle = require(process.cwd()+"/index.js");

idle.setAccount({
    username: process.env.username,
    password: process.env.pass,
    gameids: [286570, 312150, 352520, 436150, 444090, 533300, 562220, 566160, 591420, 601220, 607880, 607890, 617670, 626690, 638650, 645090, 654900, 658560, 724740, 757330, 758100, 799070, 806140, 840720, 843890, 864300, 943700, 966630, 1054790, 1091470, 1098340, 1177070]
});

idle.startClient(process.env.username);