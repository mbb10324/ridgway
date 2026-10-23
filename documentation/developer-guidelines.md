# Primus developer guidelines

**Updated By: Miles Breman**

**Updated On: 9/4/2024**

## Overview

Welcome, Primus developer! These guidelines will help you contribute effectively to the Primus starter app and ensure consistency and best practices throughout the project.

Before continuing we recommend reading the code of conduct first at [Primus code of conduct](https://gitlab.cenithinnovations.com/h2f/primus/-/blob/main/documentation/code-of-conduct.md).

When contributing to Primus, it is essential to keep the principles defined below in mind. These principles will be the guidelines that reviewers follow during the review process. Therefore, developers are expected to consistently consider them throughout their development process and ensure that their code aligns with these principles.

Table of contents:

1. Branching and Git Workflow
2. Code Formatting and Linting
3. Testing Best Practices
4. Design Patterns

## Branching and Git Workflow

At Primus, we follow a collaborative Git workflow to ensure smooth collaboration and effective version control. For more information, see [Branching Strategy](./contributor/branching-strategy.md).

### Commit Messages

- Descriptive and Concise: Write clear and concise commit messages that describe the purpose and context of your changes. Start with a capitalized verb in the imperative tense, such as "Add," "Fix," "Update," or "Refactor." For example, "Add user authentication component" or "Fix form validation error handling.".
- Commit Scope: If your changes impact a specific component, module, or functionality, include the scope in square brackets at the beginning of the commit message. For example, "[Button] Update hover styles" or "[Form] Fix validation error message positioning."
- Separate Concerns: Avoid mixing unrelated changes in a single commit. Each commit should focus on a specific logical change or feature.

### Merge Requests

- Descriptive Merge Request Titles: Use descriptive titles for your merge requests that summarize the changes or feature being introduced. Be clear and concise in your title to provide a quick overview for reviewers. Along the same lines as commit messages you should start with a capitalized verb in the imperative tense, such as "Add," "Fix," "Update," or "Refactor." For example, "Add user authentication component" or "Fix form validation error handling.".
- Detailed Descriptions: Provide detailed descriptions in your merge requests, explaining the purpose, context, and implementation details of the changes. Include any relevant links, references, or screenshots to assist reviewers in understanding the changes.
- Reviewers and Assignees: Assign appropriate reviewers to your merge requests who are knowledgeable about the codebase and the specific changes being made. Assignees should be the developers responsible for the merge request.
- Addressing Feedback: Be responsive to feedback and suggestions provided by reviewers. Address all comments and iterate on the changes until the merge request is ready for merging.
- Merge Request Review: Participate actively in reviewing other developers' merge requests, providing constructive feedback and suggestions in a timely manner. Help ensure the quality, consistency, and adherence to guidelines in the codebase.

Remember, our Git workflow is designed to facilitate collaboration and maintain a clean and stable codebase. By following these guidelines, we can streamline the development process and ensure the integrity of Primus' codebase.

## Code Formatting and Linting

Primus relies on a combination of [next.js built in ESLINT configuration](https://nextjs.org/docs/pages/building-your-application/configuring/eslint) and our own Primus ESLINT rules based off the [typescript-elsint](https://typescript-eslint.io/) library. The ESLINT confiuration can be found in the root of the repository at `.eslintrc.cjs`. We rely on prettier for formatting, our prettier configuration can be found in the root of the repository at `.prettierrc`. By following these guidelines, and the recommend extensions located at `.vscode/extensions.json` we can ensure that the Primus codebase remains consistent, readable, and aligned with the project's established standards. Please keep the following guidelines in mind:

- ESLint Configuration: Primus uses the ESLint configuration provided by next.js and typescript-eslint, which includes rules for code quality and style. Make sure your code adheres to these rules.
- Single Quotes: All strings in Primus should use single quotes. This helps maintain consistency throughout the codebase. ESLint will enforce this rule, and merge requests will not be approved if double quotes or backticks are used for strings.
- Semicolons: Primus enforces the use of semicolons at the end of each statement. ESLint will flag missing semicolons as errors. Please ensure your code includes semicolons appropriately.
- Third-Party Linters: To maintain consistency and avoid conflicts, Primus does not reccomend the use of third-party linters in merge requests. Please ensure that only our built-in ESLint is used for linting your code.
- Code Beautifiers: The use of code beautifiers like Prettier is recomended only when utilizing the provided configuration. Merge requests that include automated code formatting from external tools will not be approved. Instead, rely on the ESLint configuration that aligns with the prettier formatting to maintain consistency.

## Testing Best Practices

Testing is a critical aspect of ensuring the quality, stability, and reliability of Primus. To maintain high standards of testing, we follow these guidelines and encourage all developers to actively contribute to the test suite as part of their development process.

### Testing Principles

- Robust Documentation: Clearly define the testing methodology. Documentation should explain why and how tests are written, ensuring developers can easily understand the purpose behind each test. It should act as a living document to guide current and future developers.
- Code Confidence: Tests are designed to provide confidence in the codebase. They should help detect issues early, validate new features, and prevent regressions. Aim to have enough coverage to trust your tests without over-testing trivial cases.
- Scrutiny in Reviews: When reviewing code, pay special attention to the tests. Reviewers should ensure that tests are clear, meaningful, and effective, without unnecessary complexity or bloat.
- Avoid Test Bloat: Write focused, concise tests that provide meaningful validation. Avoid duplicating tests or including tests that don’t contribute significant value. Every test should have a clear purpose.
- Continuous Testing: Ensure that tests are maintained and updated with every code change. This helps prevent stale tests and ensures the test suite evolves with the project.

### Unit Testing with React Testing Library and Vitest

- Thorough Testing: Write comprehensive unit tests for your code changes. Test both positive and negative scenarios, handle edge cases, and cover different user interactions. Ensure that your tests cover critical functionalities and use cases.
- Component Isolation: Aim to test components in isolation to ensure accurate and focused testing. Use appropriate mocking techniques to isolate external dependencies and provide controlled testing environments.
- Clear and Descriptive Test Cases: Use descriptive test names that clearly indicate the purpose and scenario of each test case. Write self-explanatory tests that are easy to understand, maintain, and debug.
- Testing Library Guidelines: Familiarize yourself with the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [vitest](https://vitest.dev/). Follow the recommended patterns for querying, rendering, and interacting with components, as well as assertions and matchers provided by vitest.
- Code Coverage: Strive to maintain a high code coverage percentage in Primus' unit tests. Aim for a coverage percentage of at least 80% or higher. This ensures that critical parts of the codebase are thoroughly tested and helps identify areas that need additional test coverage.

### End-to-End Testing with Cypress

- Comprehensive End-to-End Tests: Use [Cypress](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test) to write comprehensive end-to-end tests that cover critical user flows and functionalities of Primus. Test scenarios that involve multiple components, user interactions, and integration with external services.
- Realistic User Scenarios: Design end-to-end tests that closely mimic real user interactions and workflows. Test common use cases, edge cases, and error handling to ensure Primus functions as expected in different scenarios.
- Stable Test Environment: Set up a stable and reliable test environment for Cypress tests. Use fixtures, stubs, and custom commands to ensure consistent test data and interactions. Mock external services or dependencies when necessary to create reliable test conditions.
- Efficient Test Execution: Optimize test execution by leveraging Cypress's capabilities, such as parallelization and selective test execution. Organize tests into separate files or test suites based on functionality or feature areas to improve test execution efficiency.
- Visual Testing: Consider incorporating visual testing techniques, such as using Cypress's screenshot diffing capabilities, to catch visual regressions and ensure consistent UI rendering across different scenarios.

Remember, testing is a collaborative effort, and we encourage all developers to actively participate in testing and maintaining a high-quality codebase. By following these best practices, we can ensure the reliability and stability of Primus for all users.

## Design Patterns

Consistent and visually appealing desings is extrememly important for the success of Primus. When working on styling-related tasks:

- Adhere to the established design system and reference other areas of the codebase for best practices when constructing your html and styling.
- We leverage [tailwindcss](https://tailwindcss.com/) to maintain consistency and ease of use.
- Consider responsiveness and accessibility while applying styles to ensure compatibility across devices.
