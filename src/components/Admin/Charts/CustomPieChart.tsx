import React from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import Title from "../Title/Title";
import {motion} from "framer-motion"
// Dữ liệu cho biểu đồ hình tròn 1
export const chartData01 = [
  { name: "Category A", value: 400 },
  { name: "Category B", value: 300 },
  { name: "Category C", value: 300 },
  { name: "Category D", value: 200 },
];

// Dữ liệu cho biểu đồ hình tròn 2
export const chartData02 = [
  { name: "Category E", value: 300 },
  { name: "Category F", value: 200 },
  { name: "Category G", value: 100 },
  { name: "Category H", value: 400 },
];


const CustomPieChart = ({variants}:{variants:any}) => {
  return (
    <motion.div 
      variants={variants}
      className="h-96 rounded-xl bg-white p-5 dark:bg-slate-600
     dark:text-slate-300 sm:h-[450px] xl:w-[400px]">
      <Title>Sales by Category</Title>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData01}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={60}
            fill="#8884d8"
            nameKey="name"
            label
          />
          <Pie
            data={chartData02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={60}
            fill="#82ca9d"
            nameKey="name"
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default CustomPieChart;
