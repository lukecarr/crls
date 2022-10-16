function crls <T extends object, U = unknown> (data: T[], security?: {
  row?: (row: T, context: U) => boolean,
  column?: (row: T, context: U) => Set<keyof T> | true,
}): (context: U) => Partial<T>[];

function crls <T extends object, U = unknown> (data: () => Promise<T[]>, security?: {
  row?: (row: T, context: U) => boolean,
  column?: (row: T, context: U) => Set<keyof T> | true,
}): (context: U) => Promise<Partial<T>[]>;

/**
 * Returns a function for performing column and/or row-level security on an array of objects.
 * 
 * @param data The original dataset (or function producing the dataset) to apply column and/or row-level security to.
 * @param security The predicate functions for column and row-level security.
 * @returns A function that can filter the original dataset given a provided context.
 */
function crls <T extends object, U = unknown> (data: T[] | (() => Promise<T[]>), security?: {
  row?: (row: T, context: U) => boolean,
  column?: (row: T, context: U) => Set<keyof T> | true,
}): ((context: U) => Partial<T>[]) | ((context: U) => Promise<Partial<T>[]>)  {
  // Cache the column and row-level security predicates
  const rowPredicate = security?.row ?? (() => true);
  const columnPredicate = security?.column ?? (() => true);

  if (typeof data === "function") {
    return async function (context: U): Promise<Partial<T>[]> {
      const rows = await data();
      if (typeof security?.row === "undefined" && typeof security?.column === "undefined") return rows;
      return filterRows(rows, context, rowPredicate, columnPredicate);
    }
  }

  return function (context: U): Partial<T>[] {
    if (typeof security?.row === "undefined" && typeof security?.column === "undefined") return data;
    return filterRows(data, context, rowPredicate, columnPredicate);
  }
}

function filterRows <T extends object, U> (rows: T[], context: U, rowPredicate: (row: T, context: U) => boolean, columnPredicate: (row: T, context: U) => Set<keyof T> | true): Partial<T>[] {
  let filtered = [] as Partial<T>[];

  for (let row of rows) {
    // Evaluate the RLS predicate for the current row and provided context
    // If the RLS returns false, exclude the row
    if (!rowPredicate(row, context)) continue;

    // Evaluate the CLS predicate for the current row and provided context
    let cols = columnPredicate(row, context);

    // If the CLS returns true, include the entire row
    if (cols === true) {
      filtered.push(row);
      continue;
    }
    
    let transformed = {} as Partial<T>;

    for (const [col, val] of Object.entries(row)) {
      // Exclude the column if the CLS doesn't return the column name
      if (!cols.has(col as keyof T)) continue;
      
      // Include the column if the CLS returns the column name
      transformed[col as keyof T] = val;
    }

    // Include the transformed row
    filtered.push(transformed);
  }

  // Return the filtered dataset
  return filtered;
}

export default crls;
