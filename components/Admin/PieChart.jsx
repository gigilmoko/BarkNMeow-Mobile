import { View, Dimensions, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { PieChart } from "react-native-chart-kit";
/* import { colors } from "../styles/styles"; */

const colorss = {
    color1: '#FFFF00', // yellow
    color2: '#FFffff', // orange
  };

const screenWidth = Dimensions.get("screen").width - 0 - 75;

let colors = ['#FFFF00', '#FFEA00', '#FFD300', '#FFBB00', '#FFA200'];

function getRandomColorComplimentaryToYellow() {
    if (colors.length === 0) {
        // Reset colors if all have been used
        colors = ['#FFFF00', '#FFEA00', '#FFD300', '#FFBB00', '#FFA200'];
    }

    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedColor = colors[randomIndex];

    // Remove the selected color from the array
    colors = colors.filter((color, index) => index !== randomIndex);

    return selectedColor;
}


export default OrderStatusPieChart = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    /* console.log('console log from pie chart data:',data); */
    useEffect(() => {
        if (data && Array.isArray(data.orderDetails)) {
            const transformedData = data.orderDetails.map(item => ({
                name: item.status,
                population: item.count,
                color: getRandomColorComplimentaryToYellow(), // Call the function here
                legendFontColor: colorss.color2, // Replace with actual color
            }));
            
            setChartData(transformedData);
            /* console.log('console log from pie chart transformedData:', transformedData); */
        }
    }, [data]);

    return (
        <View>
            <PieChart
                data={chartData}
                width={screenWidth}
                height={200}
                chartConfig={{
                    backgroundGradientFrom: colorss.color1,
                    backgroundGradientTo: colorss.color2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        </View>
    );
}