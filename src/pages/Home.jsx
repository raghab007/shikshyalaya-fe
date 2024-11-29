import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import homeImage from '../assets/istockphoto-1919863292-1024x1024.jpg';




export default function Home() {
  return (
    <>
      <style>
        {`
          .home-container {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 100vh;
            padding: 0 20px;
            background-color: #f4f6f9;
            box-sizing: border-box;
          }

          .image-container {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .home-image {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
          }

          .text-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            padding: 20px;
          }

          .heading {
            font-size: 3rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
          }

          .subheading {
            font-size: 1.25rem;
            color: #555;
            margin-bottom: 25px;
          }

          .btn-courses {
            background-color: #3f51b5;
            color: white;
            padding: 12px 25px;
            font-size: 1.1rem;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }

          .btn-courses:hover {
            background-color: #283593;
          }
        `}
      </style>
      <div className="home-container">
        <div className="image-container">
          <img
            className="home-image"
            src={homeImage}
            alt="Learning"
          />
        </div>
        <div style={{marginLeft:'40px'}} className="text-container">
          <h1 className="heading">Welcome to Sikshyalaya</h1>
          <p className="subheading">A Place of Learning</p>
          <Link to="/courses">
            <Button className="btn-courses" variant="text">
              Courses
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
