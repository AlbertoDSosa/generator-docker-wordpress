const Generator = require("yeoman-generator");
const yosay = require("yosay");
const os = require("os");
const address = require("address");
const chalk = require("chalk");

module.exports = class extends (
  Generator
) {
  username = os.userInfo().username;
  remoteHost = "";
  os = "";

  constructor(args, opts) {
    super(args, opts);

    this.option("skip-welcome-message", {
      desc: "Skips the welcome message",
      type: Boolean,
      default: false,
    });

    this.argument("appname", { type: String, required: true });

    this.destinationRoot(this.options.appname);

    if (os.type() === "Linux") {
      this.remoteHost = address.ip();
      this.os = "Linux";
    } else if (os.type() === "Darwin") {
      this.os = "MacOS";
      this.remoteHost = "host.docker.internal";
    } else if (os.type() === "Windows_NT") {
      this.os = "Windows";
      this.remoteHost = "host.docker.internal";
    }
  }

  initializing() {
    if (!this.options["skip-welcome-message"]) {
      this.log(
        yosay("Welcome to the workbench generator in Wordpress with Docker")
      );
    }

    // System Check

    this.log("--------------------------------------------------");
    this.log(chalk.green.bold("➤") + chalk.bold(" System Check"));
    this.log(`${chalk.yellow("•")} username: ${this.username}`);
    this.log(`${chalk.yellow("•")} hostRemote: ${this.remoteHost}`);
    this.log(`${chalk.yellow("•")} os: ${this.os}`);
    this.log("--------------------------------------------------");
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "username",
        message: "Your local username",
        default: this.username,
      },
      {
        type: "input",
        name: "remoteHost",
        message: "Your xdebug remote host",
        default: this.remoteHost,
      },
      {
        type: "input",
        name: "appDescription",
        message: "Your Wordpress application description",
        default: "Simple local Wordpress development environment",
      },
      {
        type: "input",
        name: "folderName",
        message: "Your Wordpress folder name",
        default: "wordpress",
      },
      {
        type: "input",
        name: "dbName",
        message: "Your database name",
        default: "wordpress_db",
      },
      {
        type: "input",
        name: "dbPassword",
        message: "Your database password",
        default: "secret",
      },
      {
        type: "input",
        name: "wordpressPort",
        message: "Your Wordpress port",
        default: "8000",
      },
      {
        type: "input",
        name: "phpMyAdminPort",
        message: "Your PhpMyAdmin port",
        default: "8080",
      },
    ]);
    this.log("--------------------------------------------------");
  }

  writing() {
    this.fs.copy(this.templatePath("src/**/*"), this.destinationPath());
    this.fs.copy(
      this.templatePath("src/.editorconfig"),
      this.destinationPath(".editorconfig")
    );
    this.fs.copyTpl(
      this.templatePath("_Dockerfile"),
      this.destinationPath("docker/build/Dockerfile"),
      { username: this.answers.username }
    );
    this.fs.copyTpl(
      this.templatePath("_docker-compose.yml"),
      this.destinationPath("docker-compose.yml"),
      {
        username: this.answers.username,
        remoteHost: this.answers.remoteHost,
        folderName: this.answers.folderName,
        dbName: this.answers.dbName,
        dbPassword: this.answers.dbPassword,
        wordpressPort: this.answers.wordpressPort,
        phpMyAdminPort: this.answers.phpMyAdminPort,
      }
    );
    this.fs.copyTpl(
      this.templatePath("_README.md"),
      this.destinationPath("README.md"),
      {
        appname: this.options.appname,
        appDescription: this.answers.appDescription,
        folderName: this.answers.folderName,
        wordpressPort: this.answers.wordpressPort,
        phpMyAdminPort: this.answers.phpMyAdminPort,
      }
    );
  }
};
