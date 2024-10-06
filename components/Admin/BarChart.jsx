import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("screen").width - 20 - 50;

export default MostOrderedProductBarChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && data.mostOrderedProduct && data.mostOrderedProduct.length > 0) {
      const labels = data.mostOrderedProduct.map(item => item.name);
      const counts = data.mostOrderedProduct.map(item => item.count);

      const transformedData = {
        labels: labels,
        datasets: [
          {
            data: counts,
          },
        ],
      };

      setChartData(transformedData);
    }
  }, [data]);

  return (
    <View>
      {chartData && (
    <BarChart
      data={{
        ...chartData,
        labels: chartData.labels.map(label => label.length > 10 ? `${label.slice(0, 10)}...` : label)
      }}
      width={screenWidth}
      height={240}
      chartConfig={{
        backgroundGradientFrom: "#9F762D",
        backgroundGradientTo: "#000000",
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          r: "3", // Reduce the dot radius
          strokeWidth: "2",
          stroke: "#ffa726",
        },
      }}
      fromZero
        />
      )}
    </View>
  );
};