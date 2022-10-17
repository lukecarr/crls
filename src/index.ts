function crls <T extends object, U = unknown> (
  data: T[],
  security: (row: T, context: U) => true | Set<keyof T> | false,
): (context: U) => Partial<T>[];

function crls <T extends object, U = unknown> (
  data: () => Promise<T[]>,
  security: (row: T, context: U) => true | Set<keyof T> | false,
): (context: U) => Promise<Partial<T>[]>;

/**
 * Returns a function for performing column and/or row-level security on an array of objects.
 * 
 * @param data The original dataset (or function producing the dataset) to apply column and/or row-level security to.
 * @param security The predicate functions for column and row-level security.
 * @returns A function that can filter the original dataset given a provided context.
 */
function crls <T extends object, U = unknown> (
  data: T[] | (() => Promise<T[]>),
  security: (row: T, context: U) => true | Set<keyof T> | false = () => true,
): ((context: U) => Partial<T>[]) | ((context: U) => Promise<Partial<T>[]>)  {
  if (typeof data === "function") {
    return async function (context: U): Promise<Partial<T>[]> {
      const rows = await data();
      return filterRows(rows, context, security);
    }
  }

  return function (context: U): Partial<T>[] {
    return filterRows(data, context, security);
  }
}

function filterRows <T extends object, U> (rows: T[], context: U, predicate: (row: T, context: U) => true | Set<keyof T> | false): Partial<T>[] {
  let filtered = [] as Partial<T>[];

  for (let row of rows) {
    // Evaluate the security predicate for the current row and provided context
    // If the predicate returns false, exclude the row
    const security = predicate(row, context);
    if (security === false) continue;

    // If the predicate returns true, include the row
    if (security === true) {
      filtered.push(row);
      continue:
    }

    let transformed = {} as Partial<T>;

    for (const [col, val] of Object.entries(row)) {
      // Exclude the column if the CLS doesn't contain the column name
      if (!security.has(col as keyof T)) continue;
      
      // Include the column if the CLS contains the column name
      transformed[col as keyof T] = val;
    }

    // Include the transformed row
    filtered.push(transformed);
  }

  // Return the filtered dataset
  return filtered;
}

export default crls;
