var PORT = 57999;
var WEBROOT = __dirname + "/../dist";

if (process.argv.indexOf("-watch") >= 0) {
    console.log("Starting the development server...");

    var express = require("express");
    var app = express();
    var cors = require("cors");
    var serveIndex = require("serve-index");
    app.use(cors());
    app.use(express.static(WEBROOT));
    app.use(serveIndex(WEBROOT));

    var fs = require("fs");
    var options = {
        key: fs.readFileSync(__dirname + "/localhost.key"),
        cert: fs.readFileSync(__dirname + "/localhost.crt"),
    };

    var server = require("https").createServer(options, app);
    server.listen(PORT);
    console.log(`    https://localhost:${PORT}/\n`);
}

require("typescript/lib/tsc");
