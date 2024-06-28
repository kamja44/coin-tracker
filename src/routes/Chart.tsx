import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
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
  const { coinId } = useOutletContext<IContext>();
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => Number(price.close)) ?? [],
            },
          ]}
          options={{
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            stroke: {
              curve: "smooth",
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["blue"],
                stops: [0, 100],
              },
            },

            colors: ["red"],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
