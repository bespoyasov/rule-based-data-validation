export const exists = <TEntity>(entity: TEntity) => !!entity;
export const contains = (value: string, pattern: RegExp) => value.search(pattern) >= 0;

export const inRange = (value: Comparable, min: Comparable, max: Comparable) =>
  value >= min && value <= max;

export const yearsOf = (date: TimeStamp): NumberYears =>
  new Date().getFullYear() - new Date(date).getFullYear();
