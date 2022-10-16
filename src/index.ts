/**
 * Returns a function for performing column and/or row-level security on an array of objects.
 * 
 * @param data The original dataset (or function producing the dataset) to apply column and/or row-level security to.
 * @param security The predicate functions for column and row-level security.
 * @returns A function that can filter the original dataset given a provided context.
 */
export default function <T extends object, U = unknown> (data: T[] | (() => T[]), security?: {
  row?: (row: T, context: U) => boolean,
  column?: (row: T, context: U) => Set<keyof T> | true,
}): (context: U) => Partial<T>[]  {
  // Cache the column and row-level security predicates
  const rowPredicate = security?.row ?? (() => true);
  const columnPredicate = security?.column ?? (() => true);

  return function(context: U) {
    // Evaluate the data parameter if it was supplied as a producing function.
    const rows = typeof data === "function" ? data() : data;

    // If no security has been applied, return the original dataset
    if (typeof security?.row === "undefined" && typeof security?.column === "undefined") return rows;

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
}