#!/usr/bin/env node
const inquirer = require("inquirer");
const { writeFileSync } = require("fs");
const shell = require('shelljs');

const reactAirbnbConfing = require("../config/react-with-airbnb-config.json");
const tsLintConfig = require("../config/ts-eslint")
const tsconfig = require("../config/ts-without-style-guide.json")
const reactWithoutStyleGuid = require("../config/without-styleguide.json");
const prettierConfig = require("../config/prettierrc.json");

const eslintConfig = {
    "react-with-airbnb-config": JSON.stringify(reactAirbnbConfing),
    "without-style-guide": JSON.stringify(reactWithoutStyleGuid),
    "ts-without-style-guide": JSON.stringify(tsconfig),
};

const configPromot = {
    type: "list",
    name: "eslint",
    message:
        "Please pick your favoriate eslint configuration along with prettier!",
    choices: ["React", "Typescript", "NodeJS"],
    filter: function (val) {
        return val.toLowerCase();
    },
};

const reactPromot = {
    type: "list",
    name: "react",
    message: "Please choose your eslint style guide!",
    choices: [
        "react-with-airbnb-config",
        "without-style-guide",
        "react-with-standard-js",
    ],
};
const typescriptPromot = {
    type: "list",
    name: "typescript",
    message: "Please choose your typescript eslint style guide!",
    choices: [
        "ts-without-style-guide",
        "typescript-react"
    ],
};


function main() {
    inquirer.prompt(configPromot).then(({ eslint }) => {
        if (eslint === "react") {
            reactConfig();
        } else if (eslint === "typescript") {
            typeScriptConfig();
        } else {
            console.log(
                "==== Sorry, NodeJS version Will be added to the next version ======"
            );
        }
    });
}

function typeScriptConfig() {
    inquirer.prompt(typescriptPromot).then(({ typescript }) => {
        let choice = eslintConfig[typescript];

        if (typescript === "typescript-react") {
            console.log("==== Will be added to the next version ======");
        } else {
            const cwd = process.cwd();
            console.log("==== Installing dependencies");
            shell.exec('yarn add --dev typescript')
            shell.exec('yarn add --dev @typescript-eslint/parser')
            shell.exec('yarn add --dev prettier')
            writeFileSync(cwd + "/.eslintrc", JSON.stringify(tsLintConfig));
            writeFileSync(cwd + "/.prettierrc", JSON.stringify(prettierConfig));
            writeFileSync(cwd + "/tsconfig.json", choice);
            console.log(
                "\x1b[32m",
                `🎉 🎉 Eslint and prettier config successfully generated for ${typescript} 🎉 🎉 `
            );
        }
    });
}

function reactConfig() {
    inquirer.prompt(reactPromot).then(({ react }) => {
        let choice = eslintConfig[react];

        if (react === "react-with-standard-js") {
            console.log("==== Will be added to the next version ======");
        } else {
            const cwd = process.cwd();

            writeFileSync(cwd + "/.eslintrc", choice);
            writeFileSync(cwd + "/.prettierrc", JSON.stringify(prettierConfig));
            console.log(
                "\x1b[32m",
                `🎉 🎉 Eslint and prettier config successfully generated for ${react} 🎉 🎉 `
            );
        }
    });
}

main();
