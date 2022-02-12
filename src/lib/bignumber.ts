import BigNumberJS from 'bignumber.js'

declare module 'bignumber.js' {
  export default class BigNumberJS extends BigNumber {
    toFixedOrUndefined(
      decimalPlaces: number,
      roundingMode?: BigNumberJS.RoundingMode
    ): string | undefined
    toFixedOrUndefined(): string | undefined
    toStringOrUndefined(base?: number): string | undefined
  }
}

BigNumberJS.prototype.toFixedOrUndefined = function (
  ...args: Parameters<BigNumberJS['toFixed']>
) {
  if (this.isNaN()) {
    return undefined
  }

  return this.toFixed(...args)
}

BigNumberJS.prototype.toStringOrUndefined = function (
  ...args: Parameters<BigNumberJS['toStringOrUndefined']>
) {
  if (this.isNaN()) {
    return undefined
  }

  return this.toString(...args)
}

export const BigNumber = BigNumberJS

export const newBigNumberIfDefined = <
  T extends BigNumberJS.Value | undefined | null
>(
  value: T
): T extends BigNumberJS.Value ? BigNumberJS : undefined => {
  if (value == undefined) {
    // @ts-ignore
    return undefined
  }

  // @ts-ignore
  return new BigNumberJS(value)
}
