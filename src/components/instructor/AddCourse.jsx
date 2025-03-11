import { Category } from "@mui/icons-material";
import axios from "axios";
import { useRef, useState } from "react";

function AddCourse() {
    const courseName = useRef(null);
    const courseDescription = useRef(null);
    const coursePrice = useRef(null);
    const courseImage = useRef(null);
    const [courseCategory, setCourseCategory] = useState(null);
    const [allCategories, setAllCourseCatgores] = useState([]);


    useState(()=>{
        async function getCourseCategories() {
            const response = await axios.get("http://localhost:8085/course/course_category")
            const course_categories = response.data;
            console.log(course_categories)
            setCourseCategory(course_categories[0].categoryId)
            setAllCourseCatgores(course_categories)
        }

        getCourseCategories();
    },[])

  async function addCourse(){
        const name = courseName.current.value;
        const description = courseDescription.current.value;
        const price = coursePrice.current.value;
        const image = courseImage.current.files;

        const course  = {
           categoryId:parseInt(courseCategory),
            courseName:name,
            courseDescription:description,
            coursePrice:price,
            courseImage:image,
        }

        if(image==null){
            alert("File cannot be empty")
            return;
        }
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8085/instructor/course", course, { headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`
          }})


          console.log(response.status)
          alert(response.data)
          console.log(response)

    }

    if(allCategories.length==0){
        return <h1>
            loading page....
        </h1>
    }

  
    return (
        <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg space-y-6 mt-10">
            <div>
                <label class="block text-lg font-medium text-gray-700 mb-2" for="courseName">Course Name</label>
                <input ref={courseName} id="courseName" class="w-full h-12 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" placeholder="Course name" />
            </div>

            <div>
                <label class="block text-lg font-medium text-gray-700 mb-2" for="courseDescription">Course Description</label>
                <input ref={courseDescription} id="courseDescription" class="w-full h-12 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" type="text" placeholder="Course description" />
            </div>

            <div>
                <label class="block text-lg font-medium text-gray-700 mb-2" for="coursePrice">Course Price</label>
                <input ref={coursePrice} id="coursePrice" class="w-full h-12 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" type="number" placeholder="Course price" />
            </div>

            <div>
                <label class="block text-lg font-medium text-gray-700 mb-2" for="courseImage">Course Image</label>
                <input ref={courseImage} id="courseImage" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" type="file" />
            </div>
            <label class="block text-lg font-medium text-gray-700 mb-2" for="courseImage">Course Image</label>


            <div>
                <label htmlFor="courseCategory"></label>
                <select name="" id="courseCategory" value={courseCategory}
                onChange={e=> {
                  console.log(e.target.value);
                setCourseCategory(e.target.value)}}>
                 {
                   allCategories.map(category=>{
                    return <option key={category.courseCategoryId} value={category.courseCategoryId}>{category.courseCategoryName}</option>
                   })
                 }

                </select>
            </div>

            <div>
                <button onClick={addCourse} class="w-full py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Save Changes</button>
            </div>
        </div>

    )
}




export default AddCourse;
