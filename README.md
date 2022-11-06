# CRLS

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
// const crls = require('crls')
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

const withCRLS = crls<Post, Context>(data, (row, context) => {
  // Users cannot see posts that they haven't authored
  if (row.author !== context.username) return false
  // If the user is "luke", they cannot see post IDs
  else if (context.username === 'luke') return new Set(['title', 'author'])
  // If the user is the author, and they aren't "luke"
  else return true
})

const lukePosts = withRLS({ username: 'luke' })
// => [{ title: "A blog post!", author: "luke" }, { title: "Another blog post!", author: "luke" }]

const notLukePosts = withRLS({ username: 'notluke' })
// => [{ id: 3, title: "My blog post!!!", author: "notluke" }]

const bobPosts = withRLS({ username: 'bob' })
// => []
```

**View full documentation at [crls.js.org](https://crls.js.org)!**

## 📃 License

CRLS is licensed under the [`MIT License`](LICENSE).
