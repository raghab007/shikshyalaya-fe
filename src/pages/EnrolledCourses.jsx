import { Outlet } from "react-router-dom";
import EnrolledCourseCard from "../components/course/EnrolledCourseCard";
import FilterEnrolledCourse from "../components/course/FilterEnrolledCourse";
import { useState } from "react";

function EnrolledCoursesPage() {
  const buttonStyle = {
    fontSize: "15px",
    fontWeight: "600",
  };

  return (
    <div>
      <div style={{ backgroundColor: "#1d2e3a", height: "100px" }}>
        <h1
          style={{
            justifySelf: "center",
            fontSize: "30px",
            fontWeight: "bold",
            color:"white"
          }}
        >
          My Courses
        </h1>
        <EnrollCourseTab></EnrollCourseTab>
      </div>
        
      <Outlet></Outlet>
    </div>
  );
}

function EnrolledCourses() {
  const courses = [
    {
      courseId: 1,
      courseInstructor: "Raghab pokhrel",
      courseImageSrc:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      courseDescrption: "this is course",
    },
    {
      courseId: 2,
      courseInstructor: "Aastha Aryal",
      courseImageSrc:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      courseDescrption: "this is course",
    },
  ];
  return (
    <>
      <FilterEnrolledCourse></FilterEnrolledCourse>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: "200px",
        }}
      >
        {courses.map((course) => (
          <EnrolledCourseCard
          key={course.courseId}
            courseId={course.courseId}
            courseDescrption={course.courseDescrption}
            courseInstructor={course.courseInstructor}
            courseImageSrc={course.courseImageSrc}
          ></EnrolledCourseCard>
        ))}
      </div>
    </>
  );
}

function ArchivedCourses() {
  return (
   <div style={{marginBottom:"300px"}}>
     <h1>This is
     Archived Courses page  Lorem ipsum dolor sit amet consectetur
     , adipisicing elit. Deleniti unde, natus perferendis, nesciunt corrupti nisi iste consectetur esse est sed,
      cupiditate magni laborum in similique magnam id cumque vero ut.x
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam nihil rem mollitia asperiores omnis consequuntur eum possimus ratione dolorem sequi nobis laudantium, natus delectus atque voluptate rerum molestias harum similique quisquam veniam eveniet, cum sunt cupiditate voluptates. Adipisci dolore consequuntur quas, beatae deleniti natus voluptate accusamus, necessitatibus quod cumque voluptatum voluptates dolorum. Earum incidunt nisi praesentium tenetur nostrum autem nam temporibus eius laudantium, inventore maxime fugit molestias odit atque deleniti iusto aspernatur numquam pariatur. Dolorem eaque reiciendis vitae. Sit nulla culpa deleniti sint illo tempora itaque quod dolore quos obcaecati est modi ducimus placeat, facere veniam sapiente autem pariatur possimus.
      
      </h1>
   </div>
  )
  
}

function EnrollCourseTab() {
    const [currentTab, setCurrentTab] = useState(true);

    function changeTab(){
        setCurrentTab(!currentTab)
    }

   
  return (
    <div
      style={{
        width: "40%",
        display: "flex",
        margin: "auto",
        justifyContent: "space-between",
    border:"1px",
        height: "50%",
        color:"white"
      }}
    >
      <button>
        <a style={{textDecorationStyle:"double"}} href="/enrolled/allcourses">My courses</a>
      </button>
      <button>
        <a href="/enrolled/archived">Archived Courses</a>
      </button>
    </div>
  );
}

export { EnrolledCoursesPage, ArchivedCourses, EnrolledCourses };
