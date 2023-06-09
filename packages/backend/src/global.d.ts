/** This file is used to declare typescript modules for any imports we may use that don't have any @types **/

/** Shortcut to combine both undefined and null into one type for interface definitions **/
declare type nil = undefined | null;

/** Shortcut to create a simple, plain, generic, anything object that is indexed. **/
declare type TypicalObject<T = any> = Record<string, T>;
