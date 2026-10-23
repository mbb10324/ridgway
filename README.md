# Welcome to Primus, the XVIII ABC ODT starter app!

## Overview

Primus is a comprehensive solution designed to expedite the development of web applications tailored for the U.S. Army. This generator provides a robust starter app that leverages the powerful features of Next.js, ensuring both server-side and client-side rendering of React components. The application is containerized, fully STIG compliant, and integrates NextAuth for secure authentication. With a PostgreSQL database for data storage, this boilerplate generator is optimized to meet the stringent requirements of Army software development.

## Table Of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Authentication](#authentication)
4. [Design System](#design-system)
5. [Front-End](#front-end)
6. [Back-End](#back-end)
7. [Database](#database)
8. [STIG Compliance](#stig-compliance)
9. [Additional Information](#additional-information)
10. [Forking](#forking)
11. [Contact Information](#contact-information)

## Features

- **Next.js App Router:** Enables efficient server-side and client-side rendering of React components.
- **Next Node Environment API:** Utilizes Next.js's server capabilities for API routes.
- **NextAuth Integration:** Provides secure authentication out of the box.
- **PostgreSQL Database:** Robust data storage solution.
- **Containerization:** Fully containerized setup using Docker.
- **Testing:** Unit testing with vitest and E2E testing with Cypress.
- **STIG Compliance:** Adheres to Security Technical Implementation Guides (STIG) for enhanced security.
- **Approved by CDSO:** Officially approved through the Chief Digital and Software Office (CDSO).

## Getting Started

Follow these steps to get started with Primus:

### Prerequisites

Ensure you have the following tools installed globally on your machine:

- [Node.js](https://nodejs.org/en/download/): Install the latest stable version of Node.js to run the application and manage dependencies.

- [Docker Desktop](https://www.docker.com/products/docker-desktop/): Docker is required to containerize the application and manage its services. Install Docker Desktop to set up the development environment on your machine.

- IDE: Use an editor that supports ESLint and Prettier, as these are part of our code formatting and linting process. We have provided recommended extensions in the [`.vscode`](.vscode) directory for Visual Studio Code. If you're using another editor, ensure it supports these technologies.

### Installation & Usage

1. **Clone the Repository:**

   - `git clone https://gitlab.cenithinnovations.com/h2f/primus.git`

   - `cd primus`

2. **Install Dependencies:**

   - `npm install`

3. **Update Hosts:**

   - For macOS/Linux:

     1. Open a terminal and run: `sudo nano /etc/hosts`

     2. Add the following line at the end of the file: `127.0.0.1 keycloak`

     3. Save and exit the file by pressing `CTRL + X`, then `Y`, and `Enter`

   - For Windows:

     1. Open Notepad as an Administrator

     2. Navigate to the hosts file location: `C:\Windows\System32\drivers\etc\hosts`

     3. Add the following line at the end of the file: `127.0.0.1 keycloak`

     4. Save the file and exit

4. **Run the Application:**

   - For local docker development (rec​om​mend​ed): `docker-compose --profile next up`

   - For production: `docker-compose --profile next-prod up`

   - For local development: `npm run dev-local`

**Note:** If you choose to run the app locally and not within a local Docker container, you will need to set up a `.env` file with the appropriate environment variables. You can find an example of what it should look like from our [`.env.example`](.env.example) file.

## Authentication

Primus uses [NextAuth.js](https://next-auth.js.org/) for authentication. It supports various authentication providers and strategies, making it flexible for different use cases.

### Configuration

Configure NextAuth in [`src/auth.ts`](src/auth.ts). You can learn more about how we leverage different providers like EAMS-A in the [`documentation/providers.md`](documentation/providers.md)

## Design System

Primus uses [Tailwind CSS](https://tailwindcss.com/) as the default design framework for styling components, providing a minimal yet powerful approach to building consistent user interfaces. This allows developers to rapidly prototype and build UIs with ease, while also enabling full customization of the design system to meet specific project needs.

### Component Libraries

We’ve intentionally left the design system open-ended, giving teams the flexibility to introduce additional component libraries such as [Material UI (MUI)](https://mui.com/material-ui/) or [shadcn/ui](https://ui.shadcn.com/) without conflict. By doing so, Primus empowers developers to maintain creative freedom while still adhering to core design principles. You can mix and match the utility classes from Tailwind with pre-built components from your chosen libraries to enhance development speed while ensuring a consistent look and feel.

## Front-End

The frontend is configured using [Next.js](https://nextjs.org/) and is set up with Next's app router. This approach allows us to leverage Server-Side Rendering (SSR) primarily, while also rendering specific data or components on the client as needed. To understand how this functions, follow the data trail for the data displayed on the dashboard. For example, the overview section pulls data and renders server-side, whereas the other graphs on the dashboard pull data and render on the client side.

## Back-End

The backend, or API, for this app leverages Next.js's node environment. By doing this, we create a robust monolithic architecture capable of expanding to meet the needs of demanding applications. To learn more, you can explore our basic API setup in the [`src/app/api`](src/app/api) folder.

## Database

Primus uses [PostgreSQL](https://www.postgresql.org/) as the database. Ensure your database credentials are correctly set up. For the purposes of demonstrating our app, we have set up basic/default credentials.

### Database Migration

We utilize [Prisma](https://prisma.io/) as our ORM, and seed/migration tool. To run migrations locally, run `npm run db:migrate-dev`.

IMPORTANT: For your first run, you will need to seed the DB by running `npm run db:seed`.

## STIG Compliance

Our application adheres to the [Security Technical Implementation Guides (STIG)](https://public.cyber.mil/stigs/) to ensure compliance with military security standards. You can find extensive documentation on what we have done to maintain STIG compliance and what you will need to do to ensure your application adheres to the guidelines within [`documentation/stigs`](documentation/stigs/).

## Additional Information

### Schema

To get further information on how our schema is set up out-of-the box, you can check out a visual representation as well as further in-depth documentation within the [`documentation/schema`](documentation/schema) directory.

### Testing

For detailed information about our testing methodology and instructions on running tests, please refer to the [`documentation/testing.md`](./documentation/testing.md).

## Change Log

With each release of Primus we will provide brief descriptions of what all we changed compared to our previous editions. This change log can be found at [`documentation/change-log.md`](documentation/change-log.md).

### Code Of Conduct

Our code of conduct is intended to lay some standard conduct and behavior expectations for Primus contributors and can be found at [`documentation/code-of-conduct.md`](documentation/code-of-conduct.md).

### Developer Guidelines

We established basic guidelines for development. Feel free to leverage these guidelines to build a consistent project leveraging best practices. Also feel free to update this guideline to the best suite your teams objectives. This guiding document can be found at [`documentation/developer-guidelines.md`](documentation/developer-guidelines.md).

### Decisions

Throughout Primus' development process we made crucial decisions as a team that influenced Primus' features and design. We kept a running list of all decisions that we're made as a team, and this decision tree can be found at [`documentation/decisions.md`](./documentation/decisions.md)

### License

Our project is licensed with the Apache License V2.0. It can be found at [`LICENSE.md`](LICENSE.md).

### Clearing Out Docker

Since our application is deployed with docker containers, and during development you might need to frequently destroy and rebuild these containers; we've provided a simple script to easily destroy all containers which can be found and ran from [`scripts/cleanup_docker.sh`](scripts/cleanup_docker.sh).

## Forking

If you are interested in moving forward with basing your project off of Primus, we recommend you refer to our [forking-primus](./documentation/forking-primus.md) document.

## Contact Information

For more information and support, you can contact the Primus team at [primus.team.army@gmail.com](mailto:primus.team.army@gmail.com).
