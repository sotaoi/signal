declare class SignalContract {
  public uid = null;
  public packageJson = null;

  constructor(
    packageJson: { [key: string]: any },
    deploymentKeys: (argv: any) => Promise<any>,
    deploymentCentral: (argv: any) => Promise<any>,
    install: (argv: any) => Promise<any>,
    prepare: (argv: any) => Promise<any>,
    load: (argv: any) => Promise<any>,
    bootstrap: (argv: any) => Promise<any>,
    config: (argv: any) => Promise<any>,
    setup: (argv: any) => Promise<any>,
    init: (argv: any) => Promise<any>
  );

  reload(argv: any): Promise<any>;

  console(argSlice?: null | string[]): this;

  command(
    signature: string,
    description: string,
    positional: (yargs: any) => any,
    handler: (argv: { [key: string]: string }) => Promise<any>
  ): this;

  run(argSlice?: any): this;

  validateCommand(command: any): boolean;

  deploymentKeys(argv: any): Promise<any>;

  deploymentCentral(argv: any): Promise<any>;

  install(argv: any): Promise<any>;

  prepare(argv: any): Promise<any>;

  load(argv: any): Promise<any>;

  bootstrap(argv: any): Promise<any>;

  config(argv: any): Promise<any>;

  setup(argv: any): Promise<any>;

  init(argv: any): Promise<any>;
}

export { SignalContract };
