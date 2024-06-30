import { useContext } from "react";
import styled from "styled-components";
import ThemeContext from "./ThemeContext";
import Toggler from "./Toggler";
import useToggle from "./useToggle";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiFillHome,
  AiFillPicture,
} from "react-icons/ai";
import {TiWeatherShower} from 'react-icons/ti'
import { GiCardPick, GiRobotGolem } from "react-icons/gi";

import { BiLibrary } from "react-icons/bi";
import { Link } from "react-router-dom";

const StyledNavbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.light ? "white" : "#37383a")};
  padding: 20px;
  box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.1);
  .top {
    color: ${({ light }) => (light ? "#8484FF" : "rgb(256,256,256,0.8)")};
    display: flex;
    justify-content: space-between;
    #hamburger {
      font-size: 28px;
      &:hover {
        transition: 0.3s ease all;
        transform: scale(1.2);
      }
      &:active {
        transform: scale(0.9);
      }
    }
  }
  .down {
    z-index: 100;
    position: absolute;
    top: 80px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    transition: 0.3s ease all;
    transform-origin: top right;
    background: ${(props) => (props.light ? "white" : "#37383a")};
    padding: 10px;
    box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.1);
    transform: ${({ dis }) => (!dis ? "scale(0)" : "scale(1)")};
    li {
      border-radius: 5px;
      padding: 10px;
      list-style: none;
      display: flex;
      align-items: center;
      background: ${(props) => (props.light ? "white" : "#37383a")};

      a {
        text-decoration: none;
        color: ${({ light }) =>
          light ? "rgba(0, 0, 0, 0.781)" : "rgb(256,256,256,0.8)"};
      }
      transition: 0.3s ease all;
      &:hover {
        color: ${({ light }) => (light ? "#8484FF" : "skyblue")};
        a {
          color: ${({ light }) => (light ? "#8484FF" : "skyblue")};
        }
        .icon{
          animation:rotate 0.3s ease;
        }
        transform: translateX(-15%);
        box-shadow: -3px 0px 6px rgb(0, 0, 0, 0.1);
      }
      .icon {
        margin-right: 5px;
        font-size: 28px;

      }
    }
  }
  @keyframes rotate{
    0%{
      transform:rotate(0deg);
    }
    100%{
      transform:rotate(359deg);
    }
  }
`;
export default function Navbar() {
  const [light] = useContext(ThemeContext);
  const [display, toggleDisplay] = useToggle(false);
  return (
    <StyledNavbar light={light} dis={display}>
      <div className="top">
        <Toggler />
        <h1>The Space</h1>
        {display ? (
          <AiOutlineClose id="hamburger" onClick={toggleDisplay} />
        ) : (
          <AiOutlineMenu id="hamburger" onClick={toggleDisplay} />
        )}
      </div>
      <div className="down">
        <ul onClick={toggleDisplay}>
          <li>
            <AiFillHome className="icon" />
            <Link to="">Home</Link>
          </li>
          <li>
            <AiFillPicture className="icon" />
            <Link to="/apod">Astronomical picture of the day</Link>
          </li>
          <li>
            <GiCardPick className="icon" />
            <Link to="/apodany">Astronomical picture of any day</Link>
          </li>
          <li>
            <BiLibrary className="icon" />
            <Link to="/nivl">Nasa image & video library</Link>
          </li>
          <li>
            <GiRobotGolem className="icon" />
            <Link to="/pbr">Photos taken by rovers on Mars</Link>
          </li>
          <li>
            <TiWeatherShower className="icon" />
            <Link to="/weather">Mars Weather</Link>
          </li>
        </ul>
      </div>
    </StyledNavbar>
  );
}
