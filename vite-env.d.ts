// Removed reference to vite/client to fix type definition error
// /// <reference types="vite/client" />

declare var process: {
  env: {
    API_KEY: string;
    [key: string]: string | undefined;
  }
};
