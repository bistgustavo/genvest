import React, { useState } from "react";

const MarketData = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D");
  const [selectedMarket, setSelectedMarket] = useState("NEPSE");

  // Sample market data - replace with actual data from your API
  const marketData = {
    NEPSE: {
      currentValue: "2,145.67",
      change: "+15.23",
      percentChange: "+0.72%",
      volume: "12.5M",
      turnover: "NPR 2.8B",
    },
  };

  const timeframes = ["1D", "1W", "1M", "3M", "6M", "1Y", "YTD"];
  const markets = ["NEPSE", "Banking", "Hydropower", "Insurance", "Hotels"];

  return (
    <main className="pt-[80px]">
      {/* Market Overview Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Market Overview
              </h1>
              <div className="flex space-x-2">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      selectedTimeframe === timeframe
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedTimeframe(timeframe)}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500 mb-1">Index Value</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {marketData.NEPSE.currentValue}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500 mb-1">Change</h3>
                <p className="text-2xl font-bold text-green-600">
                  {marketData.NEPSE.change}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500 mb-1">% Change</h3>
                <p className="text-2xl font-bold text-green-600">
                  {marketData.NEPSE.percentChange}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500 mb-1">Volume</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {marketData.NEPSE.volume}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-500 mb-1">Turnover</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {marketData.NEPSE.turnover}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Market Performance
              </h2>
              <div className="flex space-x-2">
                {markets.map((market) => (
                  <button
                    key={market}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      selectedMarket === market
                        ? "bg-teal-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedMarket(market)}
                  >
                    {market}
                  </button>
                ))}
              </div>
            </div>

            {/* Placeholder for chart */}
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart will be implemented here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Movers Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Gainers */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Top Gainers
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-3">Symbol</th>
                      <th className="pb-3">LTP</th>
                      <th className="pb-3">Change</th>
                      <th className="pb-3">% Change</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {/* Sample data - replace with actual data */}
                    <tr className="border-t">
                      <td className="py-3">ABC</td>
                      <td>450.00</td>
                      <td className="text-green-600">+45.00</td>
                      <td className="text-green-600">+10.00%</td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Losers */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Top Losers
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-3">Symbol</th>
                      <th className="pb-3">LTP</th>
                      <th className="pb-3">Change</th>
                      <th className="pb-3">% Change</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {/* Sample data - replace with actual data */}
                    <tr className="border-t">
                      <td className="py-3">XYZ</td>
                      <td>280.00</td>
                      <td className="text-red-600">-28.00</td>
                      <td className="text-red-600">-10.00%</td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market News Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Latest Market News
            </h2>
            <div className="space-y-6">
              {/* Sample news items - replace with actual data */}
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  NEPSE implements new trading system
                </h3>
                <p className="text-gray-600 mb-2">
                  The Nepal Stock Exchange has successfully implemented a new
                  trading system to improve market efficiency...
                </p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              {/* Add more news items as needed */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MarketData;
