import { type EnvironmentSchema, type TConfig } from "./libs/types/types.js";

class Config implements TConfig {
  public ENV: EnvironmentSchema;

  public constructor() {
    this.ENV = this.envSchema;
  }

  private get envSchema(): EnvironmentSchema {
    return {
      API: {
        URL: import.meta.env.VITE_APP_API_URL,
      },
      SECRET_TOKEN: import.meta.env.VITE_APP_SECRET_TOKEN,
    };
  }
}

export { Config };
