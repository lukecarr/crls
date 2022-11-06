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
import crls from 'crls'

// or CommonJS
// const crls = require("crls");
```

### Start filtering data

```ts
import crls from 'crls'

type Post = {
  id: number
  title: string
  author: string
}

type Context = {
  username: string
}

const data: Array<Post> = [
  { id: 1, title: 'A blog post!', author: 'luke' },
  { id: 2, title: 'Another blog post!', author: 'luke' },
  { id: 3, title: 'My blog post!!!', author: 'notluke' },
]

const withRLS = crls<Post, Context>(data, function(row, context) {
  // Users cannot see posts that they haven't authored
  if (row.author !== context.username) return false

  // If the user is "luke", they cannot see post IDs
  if (context.username === 'luke') return new Set(['title', 'author'])

  // If the user is the author, and they aren't "luke"
  return true
})

const lukePosts = withRLS({ username: 'luke' })
// => [{ title: "A blog post!", author: "luke" }, { title: "Another blog post!", author: "luke" }]

const notLukePosts = withRLS({ username: 'notluke' })
// => [{ id: 3, title: "My blog post!!!", author: "notluke" }]

const bobPosts = withRLS({ username: 'bob' })
// => []
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

const withRLS = crls<Post, Context>(getPosts, ...);
// => You now need to call withRLS using `await`: `getPosts will be evaluated every time!
```

This is designed to be useful for applications where you want to define your data retrieval and crls logic once, then make queries many times (i.e. per request to an API endpoint).

## 📃 License

crls is licensed under the [`MIT License`](LICENSE).
