function FilterEnrolledCourse() {
  return (
    <>
      <div
        style={{
          height: "100px",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid red",
            alignItems: "center",
            justifyContent: "space-around",
            width: "30%",
          }}
        >
          <p>Sort by</p>
          <div>
            {" "}
            <button style={{ border: "1px solid black" }}>Title a-z</button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid red",
            alignItems: "center",
            justifyContent: "space-around",
            width: "30%",
          }}
        >
          <p>Filter by</p>
          <div style={{ display: "flex", justifyContent:"space-around" }}>
            <div>
              <button>Categories</button>
            </div>
            <div>
              <button>Instructor</button>
            </div>
          </div>
        </div>

        <div style={{ border: "1px solid red", width: "30%", display:"flex", flexDirection:"row",justifyContent:"space-around", alignItems:"center" }}>
          <div>
            <input
              style={{
               
                border: "1px solid black",
              }}
              type="search"
              placeholder="Search your courses"
            />
          </div>


        <div>
            <button>Search</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterEnrolledCourse;
