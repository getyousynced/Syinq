/**
 * Petrol-price data layer for the savings calculator.
 *
 * India has no free, key-less, reliable public petrol-price API (prices are
 * proprietary to OMCs and vary by state). So this is a live-READY integration
 * with honest fallback:
 *   - If PETROL_PRICE_API_URL is configured, it is fetched (daily ISR cache),
 *     optionally with PETROL_PRICE_API_KEY as a Bearer token. Expected JSON:
 *     { "price": <number ₹/L> }  (also accepts { petrol } or { value }).
 *   - Otherwise it returns a clearly-labelled reference value (NCR / UP belt),
 *     exactly like the reference sites show "₹110/L (fallback)".
 *
 * Wire any provider (PurePrice, Zyla, RapidAPI, a gov-data mirror, or your own
 * backend route) by setting PETROL_PRICE_API_URL — no code change needed.
 */

export type PetrolPrice = {
  price: number; // ₹ per litre
  source: "live" | "reference";
  asOf: string; // ISO date
};

// Reference for the Delhi-NCR / Greater Noida (UP) beachhead. Update if it drifts.
const REFERENCE_PRICE = 96.5;

export async function getPetrolPrice(): Promise<PetrolPrice> {
  const url = process.env.PETROL_PRICE_API_URL;
  const today = new Date().toISOString().slice(0, 10);

  if (!url) {
    return { price: REFERENCE_PRICE, source: "reference", asOf: today };
  }

  try {
    const key = process.env.PETROL_PRICE_API_KEY;
    const res = await fetch(url, {
      headers: key ? { Authorization: `Bearer ${key}` } : undefined,
      next: { revalidate: 86400 }, // refresh at most once a day
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data: unknown = await res.json();
    const raw =
      typeof data === "object" && data !== null
        ? (data as Record<string, unknown>)
        : {};
    const value = Number(raw.price ?? raw.petrol ?? raw.value);
    if (!Number.isFinite(value) || value <= 0) throw new Error("no usable price");
    return { price: Math.round(value * 10) / 10, source: "live", asOf: today };
  } catch {
    // Graceful degradation — never break the page on a flaky upstream.
    return { price: REFERENCE_PRICE, source: "reference", asOf: today };
  }
}
