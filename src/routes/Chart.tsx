import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
interface IContext {
  coinId: string;
}
interface IData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<IContext>();
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data!.map((item) => [
                item.time_open,
                Number(item.open),
                Number(item.high),
                Number(item.low),
                Number(item.close),
              ]),
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
            },
            theme: {
              mode: isDark ? "light" : "dark",
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
