# Using asynchronously

As an alternative to the [quick start demo](/guide/quick-start), CRLS can be used asynchronously.

Just supply a function that returns a promise of your data to receive an asynchronous closure:

```ts
import crls from 'crls'

type BlogPost = ...

type Context = ...

async function getPosts(): Promise<Post> {
  // Some query logic here (e.g. access your database)
}

const withRLS = crls<Post, Context>(getPosts, security: { ... });
// => You now need to call withRLS using await
// => getPosts() will be evaluated every time withRLS is called
```
