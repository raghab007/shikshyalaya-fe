import React from 'react';
import BasicCard from '../components/CourseCard';
import springbootImg from '../assets/springboot.png';
import mernImg from '../assets/mern.png';
import uiuxImg from '../assets/ui_ux.png';
import javaImg from '../assets/java.png';
import jsImg from '../assets/js.jpg';
import pythonImg from '../assets/python.jpg';

export default function Course() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '60px' }}>
        <BasicCard price={'2000'} description={'Html, CSS, Javascript, React'} title={'Full web development'} imageSrc={springbootImg} />
        <BasicCard price={'3000'} description={'Java, Jsp, Servlet, Spring Boot'} title={'Java masterclass'} imageSrc={mernImg} />
        <BasicCard price={'1000'} description={'Front end design'} title={'UI/UX'} imageSrc={uiuxImg} />

      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '50px' }}>
        <BasicCard price={'2000'} description={'Html, CSS, Javascript, React'} title={'Full web development'} imageSrc={javaImg} />
        <BasicCard price={'3000'} description={'Java, Jsp, Servlet, Spring Boot'} title={'Java masterclass'} imageSrc={jsImg} />
        <BasicCard price={'1000'} description={'Front end design'} title={'UI/UX'} imageSrc={pythonImg} />

      </div>
    </div>
  );
}
