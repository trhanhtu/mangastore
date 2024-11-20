import { motion } from 'framer-motion'
import React from 'react'
import Activity from '../../../components/Admin/Activity/Activity'
import Card from '../../../components/Admin/Cards/Card'
import CustomBarChart from '../../../components/Admin/Charts/CustomBarChart'
import CustomPieChart from '../../../components/Admin/Charts/CustomPieChart'
import Table from '../../../components/Admin/Table/Table'

const containerVariants = {
    hidden: { opacity: 0, scale:0.9},
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type:"string",
        stiffness: 80,
        damping: 20,
        staggerChildren: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y:0,
      transition: {
        duration: 0.5,
        ease:"easeOut",
      },
    },
  };
const Analysis = () => {
  return (
    <>
        <Card/>
        <motion.div className="translate-all flex flex-col gap-4 p-4 
        duration-300 sm:px-7 sm:py-1 xl:flex-row"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <CustomBarChart variants={itemVariants}/>
        </motion.div>
        <motion.div className="translate-all flex flex-col gap-4 p-4 
        duration-300 sm:px-7 sm:py-1 xl:flex-row"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* <CustomPieChart variants={itemVariants}/> */}
        </motion.div>
        <motion.div className="translate-all flex flex-col gap-4 p-4 
        duration-300 sm:px-7 sm:py-1 xl:flex-row"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Table variants={itemVariants}/>
            {/* <Activity variants={itemVariants}/> */}
        </motion.div>
        
    </>
  );
}

export default Analysis;