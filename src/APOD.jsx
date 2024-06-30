import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import ThemeContext from './ThemeContext';
const StyledAPOD = styled.div`
  flex-grow:1;
  display:flex;
  padding:20px;
  .img{
    flex:45%;
    img{
      border-radius:10px;
      box-shadow:0 3px 5px rgb(0,0,0,0.1);
      width:100%;
      border:10px solid ${(props) => (props.light ? "white" : "#37383a")};
    }

  }
  .info{
    flex:55%;
    padding:20px;
    h1{
      color:${(props) => (props.light ? "orange" : "skyblue")};
    }
    h2,p{
      padding: 5px 0;
    }
  }
  @media only screen and (max-width:768px){
    flex-direction:column;
  }

`;
export default function APOD() {
  const [light] = useContext(ThemeContext)
  const [data, setData] = useState({});
  useEffect(()=>{
    const fetchData = async()=>{
      const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${ import.meta.env.VITE_API_KEY}`);
      setData({
        title:res.data.title,
        date:res.data.date,
        img:res.data.url,
        text:res.data.explanation,
        copy:res.data.copyright
      })

    }
    fetchData();
  },[])
  return (
    <StyledAPOD light={light}>
      <div className='img'>
        <img src={data.img} alt="apod"/>
      </div>
      <div className='info'>
        <h1>{data.title}</h1>
        <h2>{data.date}</h2>
        <p>{data.text}</p>
        <h2> &copy;{data.copy}</h2>
      </div>
    </StyledAPOD>
  )
}
