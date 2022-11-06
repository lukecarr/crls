import { describe, expect, it } from 'vitest'
import crls from '../src'

type Unarray<T> = T extends Array<infer U> ? U : T

const dataset = [
  { id: 1, title: 'This is a blog post!', tenant: 123, content: 'This is the content of the blog post!' },
  { id: 2, title: 'This is another blog post!', tenant: 123, content: 'This can only be seen by our tenant!' },
  {
    id: 3,
    title: "This is our organisation's secret blog post!",
    tenant: 456,
    content: 'This is the secure/secret content of the blog post!',
    secret: true,
  },
]

describe('crls', () => {
  it('should apply row-level security', () => {
    const withRLS = crls<Unarray<typeof dataset>, { tenant: number }>(dataset, function(row, context) {
      return row.tenant === context.tenant
    })

    let filtered = withRLS({ tenant: 123 })
    expect(filtered).toHaveLength(2)
    expect(filtered[0].id).toBe(1)
    expect(filtered[1].id).toBe(2)

    filtered = withRLS({ tenant: 456 })
    expect(filtered).toHaveLength(1)
    expect(filtered[0].id).toBe(3)

    filtered = withRLS({ tenant: 789 })
    expect(filtered).toHaveLength(0)
  })

  it('should apply column-level security', () => {
    const withCLS = crls<Unarray<typeof dataset>, undefined>(dataset, function(row) {
      return new Set(row.tenant === 456 ? ['id', 'title', 'content', 'secret'] : ['id', 'title', 'content'])
    })

    let filtered = withCLS(undefined)
    expect(filtered).toHaveLength(3)
    expect(Object.keys(filtered[0])).toStrictEqual(['id', 'title', 'content'])
    expect(Object.keys(filtered.find(({ id }) => id === 3) ?? {})).toStrictEqual(['id', 'title', 'content', 'secret'])
  })

  it('should return original dataset if no options provided', () => {
    const withCLS = crls<Unarray<typeof dataset>, undefined>(dataset)

    let filtered = withCLS(undefined)
    expect(filtered).toStrictEqual(dataset)
  })

  it('should accept a producer function for the dataset', async () => {
    let state = 0
    const withRLS = crls<{ state: number }, undefined>(async () => {
      state++
      return [{ state }]
    })

    const first = await withRLS(undefined)
    expect(first).toHaveLength(1)
    expect(first[0].state).toBe(1)

    const second = await withRLS(undefined)
    expect(second).toHaveLength(1)
    expect(second[0].state).toBe(2)
  })
})
