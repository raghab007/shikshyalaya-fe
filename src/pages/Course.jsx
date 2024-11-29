import React from 'react';
import BasicCard from '../components/CourseCard';
export default function Course(){
    return (<div> 
        
        <div style={{display:'flex',justifyContent:'space-around',marginTop:'60px'}}>
        {/* <VideoCard description={"Video"} title={"Video"} videoUrl={"/videos/video1.mp4"}></VideoCard>
        <VideoCard description={"Video"} title={"Video"} videoUrl={"/videos/video1.mp4"}></VideoCard>
        <VideoCard description={"Video"} title={"Video"} videoUrl={"/videos/video1.mp4"}></VideoCard> */}

        <BasicCard price={'2000'} description={'Html, CSS, Javascript, React'} title={'Full web development'} imageSrc={'public/springboot.png'}></BasicCard>
        <BasicCard price={'3000'} description={'Java, Jsp, Servlet,Spring Boot'} title={'Java masterclass'}  imageSrc={'public/mern.png'}></BasicCard>
        <BasicCard price={'1000'} description={'Front end design'} title={'UI/UX'}  imageSrc={'public/ui_ux.png'}></BasicCard>
        </div>
        <div style={{display:'flex',justifyContent:'space-around',marginTop:'40px'}}>
          
        <BasicCard price={'2000'} description={'Html, CSS, Javascript, React'} title={'Full web development'} imageSrc={'public/java.png'}></BasicCard>
        <BasicCard price={'3000'} description={'Java, Jsp, Servlet,Spring Boot'} title={'Java masterclass'}  imageSrc={'public/js.jpg'}></BasicCard>
        <BasicCard price={'1000'} description={'Front end design'} title={'UI/UX'}  imageSrc={'public/python.jpg'}></BasicCard>
        </div>
       </div>
    )
}