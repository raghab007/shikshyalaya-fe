function FilterEnrolledCourse() {
  return (
    <>
      <h1
        style={{ justifySelf: "center", fontSize: "30px", fontWeight: "bold" }}
      >
        My Courses
      </h1>

    
      <div
        style={{
          background: "green",
          height: "100px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >

        <div style={{ display: "flex", flexDirection: "column" ,border:"1px solid red",alignItems:"center",justifyContent:"space-around"}}>
          <p>Sort by</p>
          <div> <button>Title a-z</button></div>
        </div>


        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid red",
            alignItems:"center"
            ,justifyContent:"space-around"
          }}
        >
          <p>Filter by</p>
          <div style={{display:"flex"}}>
            <div>
              <button>Categories</button>
            </div>
            <div>
              <button>Instructor</button>
            </div>
          </div>
        </div>

        <div  style={{border:"1px solid red"}}>
          <input style={{marginTop:"35px",marginLeft:"0px",}} type="search"  placeholder="Search your courses" />
          <button>Search</button>

        </div>
      </div>

  
    </>
  );
}

export default FilterEnrolledCourse;
