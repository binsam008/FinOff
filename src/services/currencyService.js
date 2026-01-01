/* =====================================================
   OFFLINE FX FALLBACK TABLE (APP-SAFE)
   Update occasionally (monthly is enough)
===================================================== */

const OFFLINE_RATES_TO_INR = {
  USD: 83.0,
  EUR: 90.0,
  GBP: 105.0,
  AED: 22.6,
  BHD: 220.0,
  SAR: 22.1,
  QAR: 22.8,
  KWD: 270.0,
  OMR: 216.0,
  INR: 1,
};

/* =====================================================
   CONVERT ANY CURRENCY → INR
   Online → Cache → Offline → Safe
===================================================== */

export const convertToINR = async (amount, fromCurrency) => {
  const safeAmount = Number(amount) || 0;

  if (!fromCurrency || fromCurrency === "INR") {
    return {
      inrValue: safeAmount,
      rate: 1,
      source: "base",
    };
  }

  const cacheKey = `FX_${fromCurrency}_INR`;

  /* ================= TRY ONLINE ================= */
  try {
    const res = await fetch(
      `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=INR`
    );

    const data = await res.json();
    const rate = Number(data?.rates?.INR);

    if (rate && !isNaN(rate)) {
      // Cache rate
      localStorage.setItem(cacheKey, rate.toString());

      return {
        inrValue: Number((safeAmount * rate).toFixed(2)),
        rate: Number(rate.toFixed(4)),
        source: "live",
      };
    }
  } catch (err) {
    console.warn("Live FX failed, trying cache");
  }

  /* ================= TRY CACHE ================= */
  const cachedRate = Number(localStorage.getItem(cacheKey));
  if (cachedRate && !isNaN(cachedRate)) {
    return {
      inrValue: Number((safeAmount * cachedRate).toFixed(2)),
      rate: Number(cachedRate.toFixed(4)),
      source: "cache",
    };
  }

  /* ================= OFFLINE FALLBACK ================= */
  const offlineRate = OFFLINE_RATES_TO_INR[fromCurrency];
  if (offlineRate) {
    return {
      inrValue: Number((safeAmount * offlineRate).toFixed(2)),
      rate: offlineRate,
      source: "offline",
    };
  }

  /* ================= FINAL SAFETY ================= */
  return {
    inrValue: safeAmount,
    rate: 1,
    source: "fallback",
  };
};
