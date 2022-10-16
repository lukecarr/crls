# crls

> 🔒 Column and row-level security for TypeScript

[![npm](https://img.shields.io/npm/v/crls?color=blue)](https://npmjs.com/package/crls)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/crls?color=success)](https://bundlephobia.com/package/crls)
[![npm install size](https://packagephobia.com/badge?p=crls)](https://packagephobia.com/result?p=crls)
[![maintainability](https://img.shields.io/codeclimate/maintainability/lukecarr/crls)](https://codeclimate.com/github/lukecarr/crls)
[![code coverage](https://img.shields.io/codeclimate/coverage/lukecarr/crls)](https://codeclimate.com/github/lukecarr/crls)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/crls)
[![dependencies](https://img.shields.io/badge/dependencies-0-success)](https://www.npmjs.com/package/crls?activeTab=dependencies)

- 💪 **TypeScript.** Fully typed and self-documenting!

## 🚀 Quick Start

### Install

```bash
# npm
npm i crls

# or yarn
yarn add crls

# or pnpm
pnpm add crls
```

### Import

```ts
// ESM / TypeScript
import crls from "crls";

// or CommonJS
const crls = require("crls");
```

### Start filtering data

```ts
import crls from "crls";

type BlogPost = {
  id: number;
  title: string;
  author: string;
};

type User = {
  username: string;
};

const data: Array<BlogPost> = [
  { id: 1, title: "A blog post!", author: "luke" },
  { id: 2, title: "Another blog post!", author: "luke" },
  { id: 3, title: "My blog post!!!", author: "notluke" },
];

const withRLS = crls<BlogPost, User>(data, security: {
  row(row, context) {
    return row.author === context.username;
  },
});

const lukePosts = withRLS({ username: "luke" });
// => Array containg blog posts #1 and #2 (but not #3)

const notLukePosts = withRLS({ username: "notluke" });
// => Array containing blog post #3 (but not #1 or #2)

const bobPosts = withRLS({ username: "bob" });
// => Empty array
```

## 📃 License

crls is licensed under the [`MIT License`](LICENSE).
