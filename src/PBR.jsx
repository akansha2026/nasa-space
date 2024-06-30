import React, { useContext, useState } from "react";
import styled from "styled-components";

import { AiOutlineCloudDownload } from "react-icons/ai";
import ThemeContext from "./ThemeContext";
import axios from "axios";
import useInput from "./useInput";
const StyledDiv = styled.div`
  position: relative;
  flex-grow: 1;
  padding: 10px;
  display: flex;
  flex-direction:column;
  align-items: center;
  .input {
    gap: 15px;
    width: fit-content;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .sol,
    .rover {
      position: relative;
      .desc {
        background: ${(props) => (props.light ? "white" : "#37383a")};
        position: absolute;
        top:65px;
        padding: 10px;
        box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.1);
        border-radius:10px;
        transform: scale(0);
        transform-origin:top;
        transition:0.3s ease all;
        font-size:14px;
        span{
         color: ${({ light }) => (light ? "#8484FF" : "skyblue")};

        }
      }
      &:hover{
        .desc{
          transform:scale(1);
          z-index:100;
        }
      }
    }
    select option{
      font-size:16px;
    }
    input,
    select {
      color-scheme: ${({ light }) => (light ? "light" : "dark")};
      box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.1);
      width: 300px;
      border-radius: 10px;
      border: none;
      outline: none;
      padding: 15px;
      font-size: 18px;
      color: ${({ light }) =>
        light ? "rgba(0, 0, 0, 0.781)" : "rgb(256,256,256,0.8)"};
      background: ${(props) => (props.light ? "white" : "#37383a")};
    }
    .icon {
      font-size: 24px;
    }
  }

  .data {
    width: 100%;
    margin-top: 50px;
    display: flex;
    flex-grow:1;
    flex-direction:column;
    padding: 10px;

    .content{
      padding-bottom: 10px;
      gap: 20px;
      width:100%;
      display: flex;
    flex-grow:1;
    flex-wrap: wrap;
    justify-content: center;
    }
    .img{
      box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.1);
      background: ${(props) => (props.light ? "white" : "#37383a")};
      max-width:100%;
      width:500px;
      position:relative;
      border-radius:10px;
      padding:15px;
      img{
        width:100%;
        border-radius:10px;
      }
      .info{
        padding:5px;
        h2{
          border-bottom:1px solid ${({ light }) =>
        light ? "rgba(0, 0, 0, 0.781)" : "rgb(256,256,256,0.8)"};
          color: ${({ light }) =>
        light ? "rgba(0, 0, 0, 0.781)" : "rgb(256,256,256,0.8)"};        }
        span{
          font-size:20px;
          color: ${({ light }) => (light ? "#8484FF" : "skyblue")};

        }
        .active{
          color:lightgreen;
        }
        .not-active{
          color:lightgoldenrodyellow;
        }
      }
    }
  }
  button {
    margin:0 auto;
    transition: 0.3s ease all;
    display: flex;
    align-items: center;
    border-radius: 30px;
    border: none;
    outline: none;
    padding: 10px 30px;
    font-size: 20px;
    box-shadow: 0 3px 5px rgb(0, 0, 0, 0.1);
    color: ${({ light }) =>
      light ? "rgba(0, 0, 0, 0.781)" : "rgb(256,256,256,0.8)"};
    background: ${(props) => (props.light ? "white" : "#37383a")};
    .icon {
      margin-right: 10px;
    }
    &:active {
      transform: scale(0.9);
    }
  }
  .lds-roller{
    margin-top:20vh;
  }
  .lds-roller div:after {

    background: ${({ light }) => (light ? "#8484FF" : "skyblue")};
  }
 
`;

function NIVL() {
  const [light] = useContext(ThemeContext);
  const [isLoading, setLoading] = useState(false);
  const [rover, handleRover] = useInput("curiosity");
  const [sol, handleSol] = useInput(100);
  const [data, setdata] = useState({
    page: 1,
    totalPage: 0,
    images: [],
  });

  const fillData = async () => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?page=${data.page}&sol=${parseInt(sol)}&api_key=${ import.meta.env.VITE_API_KEY}`
      );
      console.log(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?page=${data.page}&sol=${parseInt(sol)}&api_key=${ import.meta.env.VITE_API_KEY}`)
      const toReturn = res.data.photos;
      return toReturn;
    };
    const dataRes = await fetchData();
    let imgs = [];
    for (let item of dataRes) {
      imgs.push({
        camera: {
          name: item.camera.name ,
          full_name: item.camera.full_name,
        },
        rover: {
          name: item.rover.name,
          launch:item.rover.launch_date,
          landing: item.rover.landing_date,
          status: item.rover.status,
        },
        src: item.img_src,
      });
      setdata({
        page: data.page + 1,
        totalPage: 10,
        images: [...data.images, ...imgs],
      });
    }

    setLoading(false);
  };
  const handleSubmit = async (e) => {
    setdata({
      page: 1,
      totalPage: 0,
      images: [],
    })
    setLoading(true);
    e.preventDefault();
    fillData();
    
  };

  const handleClick = () => {

    fillData();
  };
  return (
    <StyledDiv light={light}>
      <form className="input" onSubmit={handleSubmit}>
        <div className="sol">
          <input type="text" value={sol} onChange={handleSol} />
          <div className="desc">Enter a sol <span>( Sol is a solar day on Mars; that is, a Mars-day. A sol is the apparent interval between two successive returns of the Sun to the same meridian (sundial time) as seen by an observer on Mars )</span>  above to get the pictures taken by rovers on that day. </div>
        </div>
        <div className="rover">
          <select value={rover} onChange={handleRover}>
            <option>curiosity</option>
            <option>opportunity</option>
            <option>spirit</option>
          </select>
          <div className="desc">
 Chose one of the three types of rovers <span>( Rovers are typically created to land on another planet (other than Earth) via a lander-style spacecraft, tasked to collect information about the terrain, and to take crust samples such as dust, soil, rocks, and even liquids. They are essential tools in space exploration. )</span> to get pictures taken by that rover</div>
        </div>
        <button type="submit">  <AiOutlineCloudDownload className="icon" />Get Images</button>
      </form>
      {isLoading ? (
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="data">
          <div className="content">

          {data.images.map((img,idx)=>(
            <div className="img" key={idx}>
              <img src={img.src} alt='taken by rover' />
              <div className='info'>
                <h2>About the camera</h2>
                <h4>Name of the camera <span>{img.camera.name}</span></h4>
                <h4>Full name of the camera <span>{img.camera.full_name}</span></h4>
                <h2>About the Rover</h2>
                <h4>Name of the rover <span>{img.rover.name}</span></h4>
                <h4>Launch date <span>{img.rover.launch}</span></h4>
                <h4>Landing date <span>{img.rover.landing}</span></h4>
                <h4>Status <span className={img.rover.status === 'active' || img.rover.status==='complete' ? 'active':'not-active'}>{img.rover.status}</span></h4>

              </div>
            </div>
          ))}
          </div>
          {data.page < data.totalPage && (
            <button onClick={handleClick}>
              <AiOutlineCloudDownload className="icon" /> Load more data
            </button>
          )}
        </div>
      )}
    </StyledDiv>
  );
}

export default NIVL;
