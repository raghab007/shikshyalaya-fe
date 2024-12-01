import React from 'react';
import BasicCard from '../components/CourseCard';
import springbootImg from '../assets/springboot.png';
import mernImg from '../assets/mern.png';
import uiuxImg from '../assets/ui_ux.png';
import javaImg from '../assets/java.png';
import jsImg from '../assets/js.jpg';
import pythonImg from '../assets/python.jpg';

export default function Course() {
  const courses = 
  [
      {
        price:'2000',
        description:'Html, CSS, Javascript, React',
        title:'Full web development',
        imageSrc:mernImg,
      },
      {
        price:'3000',
        description:'Java, Jsp, Servlet, Spring Boot',
        title:'Java Master Class',
        imageSrc:springbootImg,
      },
      {
        price:'2000',
        description:'UI/UX',
        title:'Java Master Class',
        imageSrc:uiuxImg,
      },
      {
        price:'2000',
        description:'UI/UX',
        title:'Java Master Class',
        imageSrc:uiuxImg,
      },
    ]

  
  return (
    <div>
      {/* <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '60px' }}>
        <BasicCard price={'2000'} description={'Html, CSS, Javascript, React'} title={'Full web development'} imageSrc={springbootImg} />
        <BasicCard price={'3000'} description={'Java, Jsp, Servlet, Spring Boot'} title={'Java masterclass'} imageSrc={mernImg} />
        <BasicCard price={'1000'} description={'Front end design'} title={'UI/UX'} imageSrc={uiuxImg} />

      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '50px' }}>
        <BasicCard price={'2000'} description={'Html, CSS, Javascript, React'} title={'Full web development'} imageSrc={javaImg} />
        <BasicCard price={'3000'} description={'Java, Jsp, Servlet, Spring Boot'} title={'Java masterclass'} imageSrc={jsImg} />
        <BasicCard price={'1000'} description={'Front end design'} title={'UI/UX'} imageSrc={pythonImg} />

      </div> */}
   
        {
            courses.map(course => {
              return (
                <div style={{marginTop:'20px'}}>
                  <BasicCard 
                    price={course.price} 
                    description={course.description} 
                    title={course.title} 
                    imageSrc={course.imageSrc} 
                />
                </div>
              );
            })
          }
    </div>
  );
}
