import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ThemeContext from "./ThemeContext";

const StyledAPOD = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 20px;
  .img {
    flex: 45%;
    img {
      border-radius: 10px;
      box-shadow: 0 3px 5px rgb(0, 0, 0, 0.1);
      width: 100%;
      border: 10px solid ${(props) => (props.light ? "white" : "#37383a")};
    }
  }
  .info {
    flex: 55%;
    padding: 20px;
    h1 {
      color: ${(props) => (props.light ? "orange" : "skyblue")};
    }
    h2,
    p {
      padding: 5px 0;
    }
    h3{
        text-align:right;
    }
  }
  .bottom {
    background: ${(props) => (props.light ? "white" : "#37383a")};
    padding: 5px 10px;
    position: fixed;
    bottom: 10px;
    display: flex;
    align-items: center;
    box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.1);
    border-radius: 5px;
    input {
      color-scheme: ${({ light }) => (light ? "light" : "dark")};
      border: none;
      outline: none;
      color: ${({ light }) => (light ? "black" : "white")};
      padding: 10px;
      width: fit-content;
      background: ${(props) => (props.light ? "white" : "#37383a")};
    }
    .icon {
      background: ${(props) => (props.light ? "white" : "#37383a")};
      font-size: 28px;
    }
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
function APODAny() {
  const [light] = useContext(ThemeContext);
  const [data, setData] = useState({});
  const [date, setDate] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${ import.meta.env.VITE_API_KEY}&date=${date}`
      );
      setData({
        title: res.data.title,
        date: res.data.date,
        img: res.data.url,
        text: res.data.explanation,
        copy: res.data.copyright,
      });
    };
    fetchData();
  }, [date]);
  const handleChange = (e) => {
    setDate(e.target.value);
  };
  return (
    <StyledAPOD light={light}>
      <div className="img">
        <img src={data.img} alt="apod" />
      </div>
      <div className="info">
        <h1>{data.title}</h1>
        <h2>{data.date}</h2>
        <p>{data.text}</p>
        <h3> &copy; {data.copy}</h3>
      </div>
      <div className="bottom">
        <input
          type="date"
          value={date}
          onChange={handleChange}
          title="Chose a date from here"
        />
      </div>
    </StyledAPOD>
  );
}

export default APODAny;
