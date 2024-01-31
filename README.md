# cy-ui-aws-manager

NOTE: git lfs install will show an error:

```
Hook already exists: pre-push

#!/usr/bin/env sh
. "${0%/*}/h"
```

The hooks now live in .husky/{post-checkout,post-commit,post-merge,pre-push} and pre-commit being the one used to run lint/testing for our JS project.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is a submodule of [cy-aws-manager](https://github.com/hagan/cy-aws-manager)
Best to git clone that project and then setup ui submodule.

## Getting Started

Make sure and install [nvm](https://github.com/nvm-sh/nvm) following nvm's instructions.
Install the current 'stable' release of npm/node

```
  cd <the cy-aws-manager project dir>/src/ui
  npm install stable
  nvm use v21.6.1
  echo "v21.6.1" > .nvmrc
  npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

#### setup / install

Install develop dependencies

```
    npm i -D typescript \
    @types/node \
    nodemon \
    ts-node \
    @vercel/ncc \
    jest \
    ts-jest \
    @types/jest \
    @storybook/addon-essentials \
    @storybook/addon-interactions \
    @storybook/addon-links \
    @storybook/blocks \
    @storybook/nextjs \
    @storybook/react \
    @storybook/test \
    eslint \
    eslint-config-next \
    eslint-plugin-storybook \
    prettier \
    storybook
```

Install modules

```
    npm i @emotion/react \
    @emotion/styled \
    @fontsource/inter \
    @mui/icons-material \
    @mui/joy \
    @types/jest \
    @types/node \
    @types/react \
    @types/react-dom \
    next \
    numeral \
    react \
    react-dom \
    typescript
```

Husky .git hooks (may not be needed after project created...)

```
    npx husky-init && npm install
    npm install husky --save-dev
    npx husky install

    npx husky add .husky/pre-commit "npm run format:staged"
    npx husky add .husky/pre-commit "npm test"
```
