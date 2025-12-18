import type { Settings } from "../state/store";


export function khrToUsd(khr: number, settings: Settings): number {
  const usd = khr / settings.usdToKhr;
  return Math.round(usd / settings.roundingUsd) * settings.roundingUsd;
}

export function usdToKhr(usd: number, settings: Settings): number {
  const khr = usd * settings.usdToKhr;
  return Math.round(khr / settings.roundingKhr) * settings.roundingKhr;
}

export function usdToAud(usd: number, settings: Settings): number {
  const aud = usd * settings.usdToAud;
  return Math.round(aud / settings.roundingAud) * settings.roundingAud;
}

export function audToUsd(aud: number, settings: Settings): number {
  const usd = aud / settings.usdToAud;
  return Math.round(usd / settings.roundingUsd) * settings.roundingUsd;
}

export function khrToAud(khr: number, settings: Settings): number {
  const usd = khrToUsd(khr, settings);
  return usdToAud(usd, settings);
}

export function audToKhr(aud: number, settings: Settings): number {
  const usd = audToUsd(aud, settings);
  return usdToKhr(usd, settings);
}

export function sum(
  settings: Settings,
  aud: number = 0, 
  khr: number = 0, 
  usd: number = 0
): {
  aud: number,
  khr: number, 
  usd: number, 
} {
  const totalUsd = usd + (khr / settings.usdToKhr) + (aud / settings.usdToAud);

  return {
    aud: usdToAud(totalUsd, settings),
    khr: usdToKhr(totalUsd, settings),
    usd: Math.round(totalUsd / settings.roundingUsd) * settings.roundingUsd,
  };
}