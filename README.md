# Itemis Code Challenge

## :pushpin: Foreword

This code challenge places a strong emphasis on Test-Driven Development (**TDD**) and serves as a platform to delve into emerging technologies. The adoption of [Bun](https://bun.sh/) as the runtime was a calculated decision, attributed to its robust toolkit that markedly elevates the Developer Experience (**DX**). As a holistic full-stack solution, Bun efficiently mitigates complexities, centering on JavaScript/TypeScript. Such an approach not only paves the way for effortless project expansion but also guarantees a smooth onboarding process for developers.

## :clipboard: Requirements

### Apply Sales tax rules

- [x] Apply a basic sales tax of 10% on all goods, except for books, food, and medical products.
- [x] Apply an import duty of 5% on all imported goods, with no exemptions.

### Tax Calculation

- [x] For a tax rate n% and shelf price p, compute the sales tax as (np/100), rounded to the nearest 0.05.

### Application Output

- [x] The application takes a list of purchased items and outputs a structured receipt on the console, detailing taxed prices and total costs.

### Tests

- [x] 100% code coverage with unit tests

## :gear: Setup

1. First, clone the repository using the following command:
   ```bash
   git clone git@github.com:CottonEyeJoee/itemis.git
   ```
2. Next, navigate to the project directory:
   ```bash
   cd itemis
   ```
3. Finally, install the necessary dependencies:
   ```bash
   bun install
   ```

## :toolbox: Tooling

- **Bun**: Used as the primary runtime and provides useful Software Development-Kit (SDK) like test and file CRUD APIs.
- **TypeScript**: A superset of JavaScript that adds static types for better code quality and readability.

## :scroll: Scripts

- **Start**: To run the application, use the command:
  ```bash
  bun start
  ```
- **Test**: To run the tests, use the command (to display code coverage append `--coverage`):
  ```bash
  bun test
  ```

---

This project was created using `bun init` in bun v1.0.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
