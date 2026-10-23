# Environment Variables 

**Updated By: Charlie Miller**

**Updated On: 07/25/2025**

## Overview

Environment variables are a common means of configuring application behavior at runtime. Existing solutions provide secure ways of sharing and exposing data through environment variables. For these reasons, we provide a number of environment variables to make Primus configurable and adjustable to your needs.

However, working with environment variables can be cumbersome. Traditionally, they introduce ambiguity or uncertainty from the underlying system. They can also introduce new points of failure to your application. To help mitigate some of these problems, we've elected to adopt [T3 Env](https://env.t3.gg/) - a library that adds type-safety, auto-completion, and a runtime validation layer to the way we interface with environment variables. 

## Defining New Environment Variables

### Updating env schemas 
For reference, the [T3 Docs](https://env.t3.gg/docs/nextjs) explain how to appropriately update your schema.  

1. Depending on whether the new environment variable needs to be exposed to the client, or just the server, open the appropriate file under `src/env`.
2. Use [zod](https://zod.dev/) to type and apply constraints to suit the needs of your new environment variable, and its related functionality. 

<i> [Note:](https://nextjs.org/docs/pages/guides/environment-variables#bundling-environment-variables-for-the-browser) </i> If you're exposing an environment variable to the client, you must prefix your environment variable name with 'NEXT_PUBLIC'.

<i> Note: </i> If you're exposing an environment variable to the client, you must also manually destructure it in the schema's `runtimeEnv` object.

### Update project env variables 
The `.env.example` file should provide a valid and ready-to-use basis for a user's local `.env` file. I.e. A user should be able to copy the contents of `.env.example` to a new `.env` file, and expect the application to work correctly.

1. Update the `.env.example` to include the new environment variable you wish to introduce. Include explanatory comments that detail its usage. 
2. Update the `docker-compose.yml` file's services to include your new environment variable as needed.
3. Update your own local `.env` file to include the change previously introduced to `.env.example`.

### Validate you env variable
The `next.config.mjs` file is configured to check your `.env` variables against the env schemas under `src/env` at build-time.

1. Run `npm run build` and confirm that the application builds.