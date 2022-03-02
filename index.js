let uid = -1;
const privatesc = {};
const yargs = require("yargs");

class SignalContract {
  uid = null;
  packageJson = null;

  constructor(
    packageJson,
    {
      integrity = null,
      deploymentKeys = null,
      deploymentCentral = null,
      install = null,
      prepare = null,
      load = null,
      bootstrap = null,
      config = null,
      setup = null,
      init = null
    }
  ) {
    if (
      typeof packageJson !== "object" ||
      !Object.keys(packageJson) ||
      !packageJson.name ||
      !packageJson.version
    ) {
      throw new Error("Signal contract is broken: bad package.json");
    }
    if (
      !this.validateCommand(integrity) ||
      !this.validateCommand(deploymentKeys) ||
      !this.validateCommand(deploymentCentral) ||
      !this.validateCommand(install) ||
      !this.validateCommand(prepare) ||
      !this.validateCommand(load) ||
      !this.validateCommand(bootstrap) ||
      !this.validateCommand(config) ||
      !this.validateCommand(setup) ||
      !this.validateCommand(init)
    ) {
      throw new Error("Signal contract is broken: bad core commands");
    }
    uid++;
    this.uid = uid;

    privatesc[this.uid] = {
      integrity,
      deploymentKeys,
      deploymentCentral,
      install,
      prepare,
      load,
      bootstrap,
      config,
      setup,
      init,
      yargs: null
    };

    this.packageJson = packageJson;
  }

  async reload(argv) {
    try {
      await privatesc[this.uid].integrity(argv);

      console.info(`Signal reloading "${this.packageJson.name || "???"}"...`);
      await this.install(argv);
      await this.prepare(argv);
      await this.load(argv);
      await this.bootstrap(argv);
      await this.config(argv);
      await this.setup(argv);
      await this.init(argv);
      console.info(`Signal "${this.packageJson.name || "???"}" reload done!`);
    } catch (err) {
      console.error(err);
    }
  }

  console(argSlice = process.argv.slice(2)) {
    privatesc[this.uid].yargs = yargs(argSlice)
      .scriptName("./signal")
      .command(
        "version",
        "-->  Show the app version",
        (yargs) => {
          return yargs;
        },
        async (argv) => {
          await privatesc[this.uid].integrity(argv);

          console.info(`App version is "${this.packageJson.version}"`);
        }
      );
    return this;
  }

  command(signature, description, positional, handler) {
    typeof description === "number" && (description = description.toString());
    typeof description !== "string" && (description = "Missing description...");
    description = "-->  " + description;
    typeof positional !== "function" && (positional = () => null);
    privatesc[this.uid].yargs = privatesc[this.uid].yargs.command(
      signature,
      description,
      positional,
      async (argv) => {
        console.info(`Signal running command "${signature}"...`);
        await privatesc[this.uid].integrity(argv);
        await handler(argv);
        console.info(`Signal command "${signature}" done!`);
      }
    );
    return this;
  }

  run() {
    privatesc[this.uid].yargs
      .command(
        "install",
        "-->  Missing description",
        () => null,
        async (argv) => {
          try {
            await privatesc[this.uid].integrity(argv);

            await this.install(argv);
          } catch (err) {
            console.error(err);
          }
        }
      )
      .command(
        "deployment:keys [url] [clientName] [clientId] [securityKey] [clientSecret]",
        "-->  Missing description",
        () => null,
        async (argv) => {
          try {
            await privatesc[this.uid].integrity(argv);

            await this.deploymentKeys(argv);
          } catch (err) {
            console.error(err);
          }
        }
      )
      .command(
        "deployment:central",
        "-->  Missing description",
        () => null,
        async (argv) => {
          try {
            await privatesc[this.uid].integrity(argv);

            await this.deploymentCentral(argv);
          } catch (err) {
            console.error(err);
          }
        }
      )
      .command(
        "prepare",
        "-->  Missing description",
        () => null,
        async (argv) => {
          try {
            await privatesc[this.uid].integrity(argv);

            await this.prepare(argv);
          } catch (err) {
            console.error(err);
          }
        }
      )
      .command(
        "load",
        "-->  Missing description",
        () => null,
        async (argv) => {
          try {
            await privatesc[this.uid].integrity(argv);

            await this.load(argv);
          } catch (err) {
            console.error(err);
          }
        }
      )
      .command(
        "bootstrap",
        "-->  Missing description",
        () => null,
        async (argv) => {
          try {
            await privatesc[this.uid].integrity(argv);

            await this.bootstrap(argv);
          } catch (err) {
            console.error(err);
          }
        }
      )
      .command(
        "config",
        "-->  Missing description",
        () => null,
        async (argv) => {
          try {
            await privatesc[this.uid].integrity(argv);

            await this.config(argv);
          } catch (err) {
            console.error(err);
          }
        }
      )
      .command(
        "setup",
        "-->  Missing description",
        () => null,
        async (argv) => {
          try {
            await privatesc[this.uid].integrity(argv);

            await this.setup(argv);
          } catch (err) {
            console.error(err);
          }
        }
      )
      .command(
        "init",
        "-->  Missing description",
        () => null,
        async (argv) => {
          try {
            await privatesc[this.uid].integrity(argv);

            await this.init(argv);
          } catch (err) {
            console.error(err);
          }
        }
      )
      .command(
        "reload",
        "--> Missing description",
        () => null,
        async (argv) => {
          try {
            await this.reload(argv);
          } catch (err) {
            console.error(err);
          }
        }
      )
      .strictCommands()
      .version(this.packageJson.version)
      .help()
      .alias("help", "h").argv;
    return this;
  }

  validateCommand(command) {
    return typeof command === "function";
  }

  deploymentKeys(argv) {
    console.info(
      `Signal "${
        this.packageJson.name || "???"
      }" running deployment:keys command...`
    );
    const result = privatesc[this.uid].deploymentKeys(argv);
    console.info(
      `Signal "${this.packageJson.name || "???"}" deployment:keys command done!`
    );
    return result;
  }

  deploymentCentral(argv) {
    console.info(
      `Signal "${
        this.packageJson.name || "???"
      }" running deployment:central command...`
    );
    const result = privatesc[this.uid].deploymentCentral(argv);
    console.info(
      `Signal "${
        this.packageJson.name || "???"
      }" deployment:central command done!`
    );
    return result;
  }

  install(argv) {
    console.info(`Signal installing "${this.packageJson.name || "???"}"...`);
    const result = privatesc[this.uid].install(argv);
    console.info(`Signal "${this.packageJson.name || "???"}" install done!`);
    return result;
  }

  prepare(argv) {
    console.info(`Signal preparing "${this.packageJson.name || "???"}"...`);
    const result = privatesc[this.uid].prepare(argv);
    console.info(`Signal "${this.packageJson.name || "???"}" prepare done!`);
    return result;
  }

  load(argv) {
    console.info(`Signal loading "${this.packageJson.name || "???"}"...`);
    const result = privatesc[this.uid].load(argv);
    console.info(`Signal "${this.packageJson.name || "???"}" loading done!`);
    return result;
  }

  bootstrap(argv) {
    console.info(`Signal bootstrapping "${this.packageJson.name || "???"}"...`);
    const result = privatesc[this.uid].bootstrap(argv);
    console.info(`Signal "${this.packageJson.name || "???"}" bootstrap done!`);
    return result;
  }

  config(argv) {
    console.info(`Signal config "${this.packageJson.name || "???"}"...`);
    const result = privatesc[this.uid].config(argv);
    console.info(`Signal "${this.packageJson.name || "???"}" config done!`);
    return result;
  }

  setup(argv) {
    console.info(`Signal setting up "${this.packageJson.name || "???"}"...`);
    const result = privatesc[this.uid].setup(argv);
    console.info(`Signal "${this.packageJson.name || "???"}" setup done!`);
    return result;
  }

  init(argv) {
    console.info(`Signal init "${this.packageJson.name || "???"}"...`);
    const result = privatesc[this.uid].init(argv);
    console.info(`Signal "${this.packageJson.name || "???"}" init done!`);
    return result;
  }
}

module.exports = { SignalContract };
