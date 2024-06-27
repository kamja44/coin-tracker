import { useParams, useLocation } from "react-router";
import { Container, Header, Loader, Title } from "../components/component";
import { useEffect, useState } from "react";

interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const API_URL = "https://api.coinpaprika.com/v1/coins";
const TICKER_URL = "https://api.coinpaprika.com/v1/tickers";
function Coin() {
  const { coinId } = useParams();
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const [ionfo, setInfo] = useState<IInfo>();
  const [price, setPrice] = useState<IPrice>();

  useEffect(() => {
    (async () => {
      const infoData = await (await fetch(`${API_URL}/${coinId}`)).json();
      const priceData = await (await fetch(`${TICKER_URL}/${coinId}`)).json();
      console.log(infoData, priceData);
      setInfo(infoData);
      setPrice(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}
export default Coin;
