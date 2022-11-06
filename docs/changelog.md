# Changelog

Please visit the [CRLS release page](https://github.com/lukecarr/crls/releases) for all historical releases.

## [2.0.0](https://github.com/lukecarr/crls/releases/tag/v2.0.0)

Published on Sun Nov 06 2022.

### Simplified security expression

This update introduces a revamped security expression that combines column and row-level security into one
function parameter.

**v1.0.0**:

```ts
const withCRLS = crls<BlogPost, User>(data, security: {
  row(row, context) {
    return row.author === context.username;
  },
  column(row, context) {
    return context.username === 'luke'
      ? new Set(['title', 'author'])
      : new Set(['id', 'title', 'author'])
  }
})
```

**v2.0.0**:

```ts
const withCRLS = crls<BlogPost, User>(data, (row, context) => {
  if (row.author !== context.username) return false
  else if (context.username === 'luke') return new Set(['title', 'author'])
  else return true
})
```

## [1.0.0](https://github.com/lukecarr/crls/releases/tag/v1.0.0)

Published on Sun Oct 16 2022.

This tag marks the initial release of CRLS.
