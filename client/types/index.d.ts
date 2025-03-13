// Этот файл содержит объявления типов для обхода проблемы
// "Expression produces a union type that is too complex to represent"

// Отключение проверки сложных типов для определенных модулей
declare module "@cosmos-kit/*";
declare module "interchain/*";
declare module "@cosmjs/*";
declare module "akash/*";

export interface ComplexTypeHelper {
  [key: string]: any;
}

export type MaybeUndefined<T> = T | undefined;

export type MaybeNull<T> = T | null;

export type Nullable<T> = T | null | undefined;
