function EnrolledCourseCard({courseId,courseInstructor,courseImageSrc, courseDescrption}){
    return (
        <div style={{width:"300px", height:"400px",border:"1px solid black", borderRadius:"11px",}} >
        <img src={courseImageSrc} style={{width:"300px",height:"300px",}} alt="" />
        <h1>CourseDescrption {courseDescrption}</h1>
        <h1>{courseInstructor}</h1>
        </div>
    )
}

export default EnrolledCourseCard;