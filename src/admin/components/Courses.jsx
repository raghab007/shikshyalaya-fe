export default function Courses(){
   
    return (
     <>
     <CourseCard title={"Java"} description={"This is descrption"} price={2000}></CourseCard>
     <CourseCard title={"Python"} description={"This is description"} price={2000}></CourseCard>
     <CourseCard title={"Python"} description={"This is description"} price={2000}></CourseCard>
     </>   
    )
}


function CourseCard({title, description, price}){

    return (
        <>
        <h1>{title}</h1>
        <h2>{description}</h2>
        <h3>{price}</h3>
        </>
    )

    
}