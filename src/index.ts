function crls<T extends object, U = unknown>(
  data: T[],
  security?: (row: T, context: U) => true | Set<keyof T> | false,
): (context: U) => Partial<T>[]

function crls<T extends object, U = unknown>(
  data: () => Promise<T[]>,
  security?: (row: T, context: U) => true | Set<keyof T> | false,
): (context: U) => Promise<Partial<T>[]>

/**
 * Returns a function for performing column and/or row-level security on an array of objects.
 *
 * @param data The original dataset (or function producing the dataset) to apply column and/or row-level security to.
 * @param security The predicate functions for column and row-level security.
 * @returns A function that can filter the original dataset given a provided context.
 */
function crls<T extends object, U = unknown>(
  data: T[] | (() => Promise<T[]>),
  security: (row: T, context: U) => true | Set<keyof T> | false = () => true,
): ((context: U) => Partial<T>[]) | ((context: U) => Promise<Partial<T>[]>) {
  if (typeof data === 'function') {
    return async (context) => {
      const rows = await data()
      return filterRows(rows, context, security)
    }
  }

  return (context) => filterRows(data, context, security)
}

function filterRows<T extends object, U>(
  rows: T[],
  context: U,
  predicate: (row: T, context: U) => true | Set<keyof T> | false,
): Partial<T>[] {
  let filtered = [] as Partial<T>[], i = 0, l = rows.length

  while (i < l) {
    const row = rows[i]
    i++

    // Evaluate the security predicate for the current row and provided context
    const security = predicate(row, context)

    // If the predicate returns false, exclude the row
    if (security === false) continue

    // If the predicate returns true, include the row
    if (security === true) {
      filtered.push(row)
      continue
    }

    let transformed = {} as Partial<T>, keys = Object.keys(row), j = 0, m = keys.length

    while (j < m) {
      const col = keys[j] as keyof T, val = row[col]

      // Include the column if the CLS contains the column name
      if (security.has(col)) transformed[col as keyof T] = val

      j++
    }

    // Include the transformed row
    filtered.push(transformed)
  }

  // Return the filtered dataset
  return filtered
}

export default crls
