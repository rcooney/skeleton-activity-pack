if (process.argv.length === 3) {
    // An activity name was provided
    createActivity(getActivityFilePath(process.argv[2]));
} else {
    // Prompt for the activity name
    prompt("Enter an activity name: ", function(name) {
        if (name) {
            createActivity(getActivityFilePath(name));
        }
        process.exit();
    });
}

function prompt(question, callback) {
    var stdin = process.stdin;
    var stdout = process.stdout;
    stdin.resume();
    stdout.write(question);
    stdin.once("data", function(data) {
        callback(data.toString().trim());
    });
}

function getActivityFilePath(name) {
    if (!/\.tsx?$/.test(name)) {
        // If it doesn't end with .ts or .tsx make it .ts
        name = name + ".ts";
    }
    return "./src/activities/" + name;
}

function createActivity(filePath) {
    var prefix = "./src";
    var fs = require("fs");
    var path = require("path");

    if (fs.existsSync(filePath)) {
        // Don't overwrite
        console.log(`    '${filePath}' already exists.\n`);
        return;
    }

    // Read or generate the UUID.
    var uuid;
    var uuidPath = "./.build/uuid.txt";
    if (fs.existsSync(uuidPath)) {
        uuid = fs.readFileSync(uuidPath).toString();
    }
    if (!uuid) {
        uuid = require("uuid/v4")();
        fs.writeFileSync(uuidPath, uuid);
        console.log(`    Generated unique activity pack identifier '${uuidPath}'`);
    }

    // Find the activity template
    var template;
    var examplePath = ".build/examples/" + path.basename(filePath);
    if (fs.existsSync(examplePath)) {
        template = fs.readFileSync(examplePath).toString();
    } else {
        var baseName = path.basename(filePath, ".ts");
        baseName = path.basename(baseName, ".tsx");

        // Replace activity name tokens
        var replaceToken = /_Activity/g;
        template = fs.readFileSync("./.build/templates/Activity.ts").toString();
        template = template.replace(replaceToken, baseName);
    }

    // Replace uuid tokens
    var generateToken = /<generate:(.*?)>/g;
    template = template.replace(generateToken, function() {
        return "uuid:" + uuid;
    });

    fs.writeFileSync(filePath, template);
    console.log(`    Created activity '${filePath}'.`);

    // Add the activity as an export of index.ts
    var cleaner = /\.tsx?/g;
    var relPath = filePath.replace(prefix + "/", "").replace(cleaner, "");
    var indexPath = prefix + "/index.ts";
    var index = fs.readFileSync(indexPath).toString();
    var newline = index.indexOf("\r\n") >= 0 ? "\r\n" : "\n";
    index += 'export * from "./file";'.replace("file", relPath) + newline;
    fs.writeFileSync(indexPath, index);
    console.log(`    Registered activity in '${indexPath}'.`);
    console.log(`    Open '${filePath}' to begin coding your activity.\n`);
}
