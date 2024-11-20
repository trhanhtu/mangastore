import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar, LabelList } from 'recharts';
import Title from "../Title/Title";
import { motion } from "framer-motion";
import AnalysisApi from '../../../apis/AnalysisApi';
import { useState, useEffect } from 'react';
import { MangaDoc } from '../../../constrants/apiResponse';
import { FaTrophy } from 'react-icons/fa';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px' }}>
        <p style={{ color: '#000', fontWeight: 'bold' }}>{payload[0].payload.name}</p>
        <p style={{ color: '#333' }}>Views: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const text: string = payload.value;

  const words = text.split(' ');
  const lineLimit = 10;
  let formattedText: string[] = [''];

  words.forEach((word: string) => {
    const currentLineIndex = formattedText.length - 1;
    if (formattedText[currentLineIndex].length + word.length <= lineLimit) {
      formattedText[currentLineIndex] += ` ${word}`;
    } else {
      formattedText.push(word);
    }
  });

  return (
    <g transform={`translate(${x},${y})`}>
      {formattedText.map((line, index) => (
        <text key={index} x={0} y={index * 12} dy={12} textAnchor="middle" fill="#666">
          {line.trim()}
        </text>
      ))}
    </g>
  );
};

const CustomBarChart = ({ variants }: { variants: any }) => {
  const [topData, setTopData] = useState<MangaDoc[]>([]);
  const [yAxisDomain, setYAxisDomain] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const fetchTopManga = async () => {
      try {
        const response = await AnalysisApi.getStatisticsView();
        if (response.message === "Thành công") {
          const data = response.data.docs.slice(0, 5);
          setTopData(data);
  
          // Calculate min and max views for Y-axis
          const viewsArray = data.map((item) => item.views);
          const maxViews = Math.max(...viewsArray);
  
          // Determine the padding
          const padding = maxViews * 0.1;
  
          // Set yAxisMin to zero and calculate yAxisMax based on max views
          const yAxisMin = 0;
          const yAxisMax = maxViews + padding || 10; // Minimum upper bound for visibility
  
          setYAxisDomain([yAxisMin, yAxisMax]);
        }
      } catch (error) {
        console.error("Failed to fetch top manga:", error);
      }
    };
  
    fetchTopManga();
  }, []);
  
  

  return (
    <motion.div 
      variants={variants}
      className="h-[450px] w-full rounded-xl bg-white p-4 pb-20 dark:bg-slate-600 dark:text-slate-300 xl:flex-1">
      <Title>Top truyện có lượt xem nhiều nhất</Title>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={topData}>
        <XAxis 
        dataKey="name"  
        tick={ { fill: 'orange' }} 
      />
      <YAxis 
        domain={yAxisDomain} 
        width={80} 
        tickFormatter={(value) => {
          if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
          if (value >= 1e3) return `${(value / 1e3).toFixed(1)}k`;
          return value;
        }}
        tick={{ fill: 'orange' }} 
      />


          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="views" fill="#14b8a6">
            <LabelList
              dataKey="views"
              position="top"
              content={({ index = 0, x, y }) => (
                
                <g transform={`translate(${x},${10})`}>
                <FaTrophy fill="#FFB300" fontSize="16px" />
                <text dx={30} dy={16} fill="#FFB300" textAnchor="middle" fontWeight="bold">
                  #{index + 1}
                </text>
              </g>
              )}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default CustomBarChart;
