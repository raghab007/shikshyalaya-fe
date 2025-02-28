import { useRef } from "react";

function AddCourse() {
    const courseName = useRef(null);
    const courseDescription = useRef(null);
    const coursePrice = useRef(null);
    const courseImage = useRef(null);

  async function addCourse(){
        const name = courseName.current.value;
        const description = courseDescription.current.value;
        const price = coursePrice.current.value;
        const image = courseImage.current.files;


        const course  = {
            courseName:name,
            courseDescription:description,
            coursePrice:price,
            courseImage:image,
        }


        
    
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
                <label class="block text-lg font-medium text-gray-700 mb-2" for="courseDuration">Course Duration (in hours)</label>
                <input id="courseDuration" class="w-full h-12 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" type="number" placeholder="Course duration" />
            </div>

            <div>
                <label class="block text-lg font-medium text-gray-700 mb-2" for="courseImage">Course Image</label>
                <input ref={courseImage} id="courseImage" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" type="file" />
            </div>

            <div>
                <button onClick={addCourse} class="w-full py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Save Changes</button>
            </div>
        </div>

    )
}


export default AddCourse;
