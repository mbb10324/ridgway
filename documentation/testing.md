# Testing

**Updated By: Miles Breman**

**Updated On: 9/9/2024**

## Overview

Effective testing is critical to ensuring the stability and reliability of Primus. We use two main tools for testing: Vitest for unit tests and Cypress for end-to-end (E2E) tests. Below are detailed instructions on how to run these tests, along with links to relevant documentation for a deeper understanding. For more information on our testing methodology and best practices, please refer to `developer-guidelines.md`.

## Unit Testing

For unit tests, we use [Vitest](https://vitest.dev/), a fast unit testing framework that’s built with TypeScript support. It integrates seamlessly with our project, allowing you to write isolated tests for each component or function.

`npm run test`: This command is for running unit tests during development. Use it regularly to ensure your code works as expected.

`npm run coverage`: Generates a test coverage report. Our goal is to maintain high code coverage, aiming for at least 80%, ensuring critical functionality is always tested.

#### What is Unit Testing?

Unit testing focuses on testing individual units of code in isolation, such as functions or components, to verify they work as intended. Unit tests should be fast, covering various use cases, including edge cases.

## E2E Testing

We use [Cypress](https://docs.cypress.io/guides/overview/why-cypress) for E2E tests, which are designed to simulate real user interactions and verify that all parts of the application function together as expected. Cypress provides an easy-to-use API and automatic browser control, making it a great fit for complex testing scenarios. Before running the following commands, ensure you have docker-desktop installed and that your development suite is capable of running the app.

`npm run cypress-open`: Builds and runs the application within Docker, then opens Cypress for interactive testing. This command lets you see tests running in a browser and debug any issues visually.

`npm run cypress-terminal`: Runs Cypress tests directly from the terminal, without launching the GUI. This is ideal for CI environments or when you need faster feedback.

#### What is E2E Testing?

End-to-end testing ensures that the entire application works as expected by testing the whole workflow from start to finish. This type of testing is especially useful for testing how different parts of the application integrate and function together.
