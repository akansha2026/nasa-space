import { useContext } from 'react'
import styled from 'styled-components'
import ThemeContext from './ThemeContext'
const StyledDiv =styled.div`
 background: ${({ light }) =>
    light
      ? `url('https://images.unsplash.com/photo-1638291792853-5ab967de3611?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80')`
      : `url('https://images.unsplash.com/photo-1620428268482-cf1851a36764?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1109&q=80')`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
flex-grow:1;
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;

iframe{
  height:76vh;
  box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.1);
margin:0;
padding:0;
width:70%;
border-radius: 20px;
border:10px solid ${(props) => (props.light ? "white" : "#37383a")};

}
@media only screen and (max-width:768px){
  iframe{
    width:84%;
    height:70vh;
  }
}
@media only screen and (max-width:484px){
  iframe{
    width:94%;
    height:60vh;
  }
}

`
export default function MarsWeather() {
    const [light] = useContext(ThemeContext);
  return (
    <StyledDiv light={light}>
        <iframe src='https://mars.nasa.gov/layout/embed/image/mslweather/' title='weather frame'></iframe>
    </StyledDiv>
  )
}