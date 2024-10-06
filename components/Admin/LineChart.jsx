import React, { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("screen").width - 40 - 60;

export default OrderSumByMonthLineChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && Array.isArray(data.ordersSumByMonth)) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
      const transformedData = {
        labels: data.ordersSumByMonth.map(item => monthNames[item._id - 1]),
        datasets: [
          {
            data: data.ordersSumByMonth.map(item => item.totalAmount),
          },
        ],
      };
  
      setChartData(transformedData);
    }
  }, [data]);

  return (
    <View>
      {chartData && (
        <LineChart
          data={chartData}
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
          bezier
        />
      )}
    </View>
  );
};