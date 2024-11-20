import React from 'react'
import Title from '../Title/Title';
import {motion} from "framer-motion"

const recentActivities = [
    {
      id: 1,
      name: "Activity One",
      activity: "Completed the first module.",
      img: "https://example.com/image1.jpg"
    },
    {
      id: 2,
      name: "Activity Two",
      activity: "Participated in the group discussion.",
      img: "https://example.com/image2.jpg"
    },
    {
      id: 3,
      name: "Activity Three",
      activity: "Submitted the assignment.",
      img: "https://example.com/image3.jpg"
    },
    {
      id: 4,
      name: "Activity Four",
      activity: "Attended the webinar.",
      img: "https://example.com/image4.jpg"
    }
  ];
  

const Activity = ({variants}:{variants:any}) => {
    return (
      <motion.div>
        <Title>Recent Activities</Title>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-center gap-4">
              <div>
                <img
                  src={activity.img}
                  alt={activity.name}
                  className="h-10 w-10 rounded-full border-2 border-teal-600"
                />
              </div>
              <div>
                <h3 className='font-medium'>{activity.name}</h3>
                <p className='text-sm text-gray-400'>{activity.activity}</p>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>
    );
  };
  
  export default Activity;
  