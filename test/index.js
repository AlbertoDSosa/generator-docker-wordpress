const helpers = require("yeoman-test");
const assert = require("yeoman-assert");

const path = require("path");
const fs = require("fs-extra");

describe("Generate a project", function () {
  it("should create the docker-compose.yml file ", function () {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withArguments(["docker-wordpress-test"])
      .withPrompts({
        username: "www-data",
        remoteHost: "0.0.0.0",
        folderName: "wordpress",
        dbName: "wordpress_db",
        dbPassword: "secret",
        wordpressPort: "8000",
        phpMyAdminPort: "8080",
      })
      .then(function () {
        const dockerComposeContent = fs.readFileSync(
          path.resolve(__dirname, "./fixtures/docker-compose.yml"),
          "utf8"
        );

        assert.file("docker-compose.yml");
        assert.fileContent("docker-compose.yml", dockerComposeContent);
      });
  });

  it("should create the README.md file ", function () {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withArguments(["docker-wordpress-test"])
      .withPrompts({
        appDescription: "Simple local Wordpress development environment",
        folderName: "wordpress",
        wordpressPort: "8000",
        phpMyAdminPort: "8080",
      })
      .then(function () {
        const readmeContent = fs.readFileSync(
          path.resolve(__dirname, "./fixtures/README.md"),
          "utf8"
        );

        assert.file("README.md");
        assert.fileContent("README.md", readmeContent);
      });
  });

  it("should create the Dockerfile file ", function () {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withArguments(["docker-wordpress-test"])
      .withPrompts({
        username: "www-data",
      })
      .then(function () {
        const dockerfileContent = fs.readFileSync(
          path.resolve(__dirname, "./fixtures/Dockerfile"),
          "utf8"
        );

        assert.file("docker/build/Dockerfile");
        assert.fileContent("docker/build/Dockerfile", dockerfileContent);
      });
  });

  it("should copy the .editorconfig file ", function () {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withArguments(["docker-wordpress-test"])
      .then(function () {
        assert.file(".editorconfig");
      });
  });

  it("should copy the uploads.ini file ", function () {
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withArguments(["docker-wordpress-test"])
      .then(function () {
        assert.file("docker/config/uploads.ini");
      });
  });
});
