export type MoneyAmount = {
  usd: number
  khr: number
  aud: number
}

export type Settings = {
  usdToKhr: number
  usdToAud: number
  roundingUsd: number
  roundingKhr: number
  roundingAud: number
}

export const defaultSettings: Settings = {
  usdToKhr: 4000,
  usdToAud: 1.50,
  roundingUsd: 1,
  roundingKhr: 1000,
  roundingAud: 0.01,
}
