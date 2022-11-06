# Quick start

## Example dataset

As an example, let's pretend that your application has the following schema and dataset:

```ts
type BlogPost = {
  id: number
  title: string
  author: string
}

type User = {
  username: string
}

const data: Array<BlogPost> = [
  { id: 1, title: 'A blog post!', author: 'luke' },
  { id: 2, title: 'Another blog post!', author: 'luke' },
  { id: 3, title: 'My blog post!!!', author: 'notluke' },
]
```

## Row-level security

Now you can use CRLS to define a row-level security policy where the authenticated user can only
see posts that they authored:

```ts
const withRLS = crls<BlogPost, User>(data, (row, context) => {
  return row.author === context.username
})

const lukePosts = withRLS({ username: 'luke' })
// => Array containg blog posts #1 and #2 (but not #3)

const notLukePosts = withRLS({ username: 'notluke' })
// => Array containing blog post #3 (but not #1 or #2)

const bobPosts = withRLS({ username: 'bob' })
// => Empty array
```

## Column-level security

Column-level security can be applied by returning a `Set<string>` of column names in the security
expression (instead of a `boolean`, as demonstrated above in the row-level example).

In this example, users can see all _columns_ (properties) of the blog post object, unless they have
a username of `'luke'` (in which case, they cannot see IDs):

```ts
const withCLS = crls<BlogPost, User>(data, (row, context) => {
  return context.username === 'luke'
    ? new Set(['title', 'author'])
    : new Set(['id', 'title', 'author'])
})
```

::: tip
With column-level security, you can simply return `true` instead of manually creating a `Set<string>`
with all column names!
:::

## Row and column-level combined

Now let's combine the previous row and column-level security policies so both are simultaneously
active:

```ts
const withCRLS = crls<BlogPost, User>(data, (row, context) => {
  // Users cannot see posts that they didn't author
  if (row.author !== context.username) return false
  // If the user is 'luke', they cannot see IDs
  else if (context.username === 'luke') return new Set(['title', 'author'])
  // Otherwise, they can see the post
  else return true
})
```

::: info
You may notice that we've refactored the security expression to use guard clauses in order of least
to most permissive. As your security expression becomes more complex, you'll find that structuring it
this way leads to much greater readability!
:::
