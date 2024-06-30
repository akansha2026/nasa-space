import styled from "styled-components";
import ThemeContext from "./ThemeContext";
import useToggle from "./useToggle";


const StyledHome = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 20px;
  background: ${({ light }) =>
    light
      ? `url('https://images.unsplash.com/photo-1638291792853-5ab967de3611?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80')`
      : `url('https://images.unsplash.com/photo-1620428268482-cf1851a36764?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1109&q=80')`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-direction: ${(props) => (props.light ? "row" : "row-reverse")};
  transition:0.3s ease all;
  .content{
    position: relative;
    width:600px;
    max-width:100%;
    background: ${(props) => (props.light ? "white" : "#37383a")};
    border-radius:10px;
    padding: 20px;
    box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.1);

    font-size:22px;
    .title{
      font-size:26px;
      color: ${({ light }) => (light ? "#8484FF" : "skyblue")};
    }
    .emoji{
      padding:10px;
      border-radius:50%;
      font-size:36px;
      background: ${(props) => (props.light ? "white" : "#37383a")};

      position:absolute;
      right:-15px;
      bottom:-15px;
    }
    a{
      color: ${({ light }) => (light ? "teal" : "skyblue")};
      text-decoration: none;
      &:hover{
        text-decoration: underline;
      }
    }
    
  }
  @media only screen and (max-width:600px){
    justify-content: center;
      .content{
        font-size:18px;
      }
    }

`;

function Home() {
  const [light, toggleLight] = useToggle(true);
  return (
    <ThemeContext.Provider value={[light, toggleLight]}>
    <StyledHome light={light}>
      <div className="content">
        Hi, Welcome to <span className="title">The Space </span>, A place where you can explore
        different thing related to our
        <a href="https://en.wikipedia.org/wiki/earth"> Earth </a>,
        <a href="https://en.wikipedia.org/wiki/mars"> Mars </a>,
        <a href="https://en.wikipedia.org/wiki/moon"> Moon </a>,
        <a href="https://en.wikipedia.org/wiki/sun"> Sun </a>, etc. This
        application can give you picture from the collection of pictures or
        videos that thas been made by
        <a href="https://en.wikipedia.org/wiki/NASA"> NASA </a>, You can also able
        to know the Weather on the
        <a href="https://en.wikipedia.org/wiki/mars"> Mars </a> that has been
        provided by the satelite present over there. This application can also
        provide you the imagery that has been taken by the diffrent
        <a href="https://en.wikipedia.org/wiki/rover"> Rovers </a>
        present on the <a href="https://en.wikipedia.org/wiki/mars"> Mars </a> surface. This is all that simply I can explain. Go and explore the application. <span className='emoji' role='img' aria-label="an emoji">✌️</span>
      </div>
    </StyledHome>
    </ThemeContext.Provider>
  );
}

export default Home;
