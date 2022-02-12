type Nil = null | undefined

export const isNil = <T>(value: T | Nil): value is Nil => value == null
export const isPresent = <T>(value: T | Nil): value is T => !isNil(value)
