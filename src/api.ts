const BASE_URL = "https://api.coinpaprika.com/v1";

const COIN_URL = `${BASE_URL}/coins`;
const COIN_DETAIL_URL = `${BASE_URL}/coins`;
const TICKER_URL = `${BASE_URL}/tickers`;
const CHART_URL = `https://ohlcv-api.nomadcoders.workers.dev?coinId`;

export function fetchCoins() {
  return fetch(COIN_URL).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${COIN_DETAIL_URL}/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchPriceInfo(coinId: string) {
  return fetch(`${TICKER_URL}/${coinId}`).then((response) => response.json());
}

export function fetchCoinHistory(coinId: string) {
  return fetch(`${CHART_URL}=${coinId}`).then((response) => response.json());
}
