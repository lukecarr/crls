# crls

> 🔒 Dead easy column and row-level security

[![npm](https://img.shields.io/npm/v/crls?color=blue)](https://npmjs.com/package/crls)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/crls?color=success)](https://bundlephobia.com/package/crls)
[![npm install size](https://packagephobia.com/badge?p=crls)](https://packagephobia.com/result?p=crls)
[![maintainability](https://img.shields.io/codeclimate/maintainability/lukecarr/crls)](https://codeclimate.com/github/lukecarr/crls)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/crls)
[![dependencies](https://img.shields.io/badge/dependencies-0-success)](https://www.npmjs.com/package/crls?activeTab=dependencies)

## 🚀 Quick Start

### Install

```bash
# Use your favorite package manager!
pnpm add -E crls
```

### Import

```ts
// ESM / TypeScript
import crls from "crls";

// or CommonJS
// const crls = require("crls");
```

### Start filtering data

```ts
import crls from "crls";

type Post = {
  id: number;
  title: string;
  author: string;
};

type Context = {
  username: string;
};

const data: Array<Post> = [
  { id: 1, title: "A blog post!", author: "luke" },
  { id: 2, title: "Another blog post!", author: "luke" },
  { id: 3, title: "My blog post!!!", author: "notluke" },
];

const withRLS = crls<Post, Context>(data, security: {
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

## ⏱ Asynchronous

As an alternative to the quick start demo, crls can be used asynchronously.

Just supply a function that returns a `Promise<>` of your data to receive an asynchronous closure:

```ts
import crls from "crls";

type Post = ...;

type Context = ...;

async function getPosts(): Promise<Post> {
  // Some query logic here (e.g. access your database)
}

const withRLS = crls<Post, Context>(getPosts, security: { ... });
// => You now need to call withRLS using `await`!
```

This is designed to be useful for applications where you want to define your data retrieval and crls logic once, then make queries many times (i.e. per request to an API endpoint).

## 📃 License

crls is licensed under the [`MIT License`](LICENSE).
