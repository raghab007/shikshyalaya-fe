function Courses(){
    return (
        <>
            <h1 className="text-2xl font-semibold text-gray-700">This is Courses</h1>
            <form action="">
                <input type="text" placeholder='coursename' />
                <input type="text" placeholder='course description' />
                <input type="number" placeholder='course price' />
                <input type="number" placeholder='course duration' />
                <button type='submit'>Add Course</button>                  
            </form>
        </>
    )
}

export {Courses}