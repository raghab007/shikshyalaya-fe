import EnrolledCourseCard from "../components/course/EnrolledCourseCard"
import FilterEnrolledCourse from "../components/course/FilterEnrolledCourse"

function EnrolledCourses() {

    const courses = [
        {
            courseId: 1, courseInstructor: "Raghab pokhrel", courseImageSrc: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", courseDescrption: "this is course"
        }, {
            courseId: 2, courseInstructor: "Aastha Aryal", courseImageSrc: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", courseDescrption: "this is course"
        },
       
      
       

    ]
    return (
        <div>
              <FilterEnrolledCourse></FilterEnrolledCourse>
            <div style={{ display: "flex", flexDirection: "row",justifyContent:"space-around" ,marginBottom:"200px",marginTop:"20px"}}>
           
            {
                courses.map(course =>
                    <EnrolledCourseCard courseId={course.courseId} courseDescrption={course.courseDescrption} courseInstructor={course.courseInstructor} courseImageSrc={course.courseImageSrc}></EnrolledCourseCard>
                )

            }
           
        </div>

        </div>
        
    )
}


export default EnrolledCourses