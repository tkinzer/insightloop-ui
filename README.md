# InsightLoop

## ToDo

- [x] CRUD journal and insight entries
- [x] Fix UI for tabs
- [x] Display journal and insight entries for a user
- [x] Clean up UI for the Journal
- [x] Clean up UI for the Insights
- [x] Clean up UI for the Profile

## NextSteps

- [x] For the next version. See this [PR](https://github.com/tkinzer/insightloop-ui/pull/1)
- [x] CRUD Journal. See this [PR](https://github.com/tkinzer/insightloop-ui/pull/1)

---

## Bit.dev Component Library

npx @teambit/bvm install
bit new react my-wiki --default-scope my-org.wiki
bit start
bit init
bit install (recommended for workspace dependecy installation)
bit start # to see the component rendered in isolation
bit compile # to ensure compilation is successful
bit test # run all tests in isolation
bit check-types # validate type script types

### Bit inside a monorepo

If your project is using any monorepo tool, ensure you still run bit init at the root directory of your project. Not in any of the sub-projects of the monorepo.
It is recommended to use Bit to track components from any sub-project, keep a single .bitmap and workspace.jsonc files for managing configuration and workflow.

### Running dev services

Dev services are component development procedures that are provided by envs. Even though different envs provide different implementations of these dev services, they all use the same standardized interfaces.

For example, run the following command to compile your components' code:

bit compile

#### Copy

The output lists all components affected by the compilation. Notice how the custom env and the component that uses it, were both compiled. That is so, even though each of them uses a different env.

To learn more about specific development services see the following:

Compiler
Tester
Builder
Linter
Formatter
Generator (component templates)
Docs
Compositions

## Package

This starter uses following libraries:

- Vite
- React
  - React Router
- TypeScript
- Tailwind CSS
  - daisyUI
- Firebase(v9, modular)
- ESLint
- Prettier

## Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/) is modern utility-first CSS framework. It provides many CSS rules, but these are purged when production builds. So developers do not worry about CSS asset size for performance optimization.

In VSCode, I recommend to use [intellisense extension](https://tailwindcss.com/docs/intellisense).

Frequently, React developers are worried about how to write CSS in TSX(JSX) template. You must choose from CSS Modules, [styled-components](https://styled-components.com/), [linaria](https://github.com/callstack/linaria), and so on.
Additionally, CSS architecture is difficult about scoping, e.g. BEM, FLOCSS.

When you decide to use Tailwind, you only write utility-first CSS classes, you don't have to worry about them!

### daisyUI

[daisyUI](https://daisyui.com/) is Tailwind CSS Components library.

It prepares components CSS classes such as 'btn'. If you provide 'btn' class to `<button>` element, then there should be placed completely designed button.

If you don't want to use it, just remove the package and remove config in `tailwind.config.js`.

## Firebase

[Firebase](https://firebase.google.com/) is a PaaS that makes us create hi-quality apps so easy and so fast.

This library is not suitable for everyone, but I think it is one of the best libraries for prototyping. Therefore, I have added it to this repository.

The Firebase js SDK has become very useful in version 9, with [optimizations that greatly reduce bundle size](https://firebase.google.com/docs/web/modular-upgrade).

### How to Use

Please look at [firebase.ts](https://github.com/TeXmeijin/vite-react-ts-tailwind-starter/blob/main/src/lib/firebase.ts).

There you will find a set of utility functions to manipulate Firebase for the environment in which the Emulator is used.

## Formatter and Linter

Already set up [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). You can customize the rules.

NOTICE: The template does not use [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) and [prettier-eslint](https://github.com/prettier/prettier-eslint). So I recommend that running commands individually. e.g. `prettier && eslint`.

Please read: https://prettier.io/docs/en/integrating-with-linters.html.

### Package ToDo

- [x] install and set up [TailwindCSS/JIT](https://github.com/tailwindlabs/tailwindcss-jit) see this [PR](https://github.com/TeXmeijin/vite-react-ts-tailwind-starter/pull/1)
- [x] install and set up [Lerna](https://github.com/lerna) see this [PR](https://github.com/tkinzer/insightloop-ui/pull/3)
