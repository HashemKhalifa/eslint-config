const inquirer = require("inquirer");
const { writeFileSync } = require("fs");
const reactAirbnbConfing = require("../config/react-with-airbnb-config.json");
const reactWithoutStyleGuid = require("../config/without-styleguide.json");
const prettierConfig = require("../config/prettierrc.json");

const eslintConfig = {
  "react-with-airbnb-config": JSON.stringify(reactAirbnbConfing),
  "without-style-guide": JSON.stringify(reactWithoutStyleGuid),
};

const configPromot = {
  type: "list",
  name: "eslint",
  message:
    "Please pick your favoriate eslint configuration along with prettier!",
  choices: ["React", "NodeJS", "Typescript"],
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

function main() {
  inquirer.prompt(configPromot).then(({ eslint }) => {
    if (eslint === "react") {
      reactConfig();
    } else if (eslint === "typescript") {
      console.log("====== Typescript will be added to the next setup=====");
    } else {
      console.log(
        "==== Sorry, NodeJS version Will be added to the next version ======"
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
        "\x1b[35m",
        `🎉 🎉 Eslint and prettier config successfully generated for ${react} 🎉 🎉 `
      );
    }
  });
}
main();
