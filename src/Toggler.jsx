import { useContext } from "react";
import styled from "styled-components";
import ThemeContext from "./ThemeContext";

const StyledToggler = styled.div`
	position: relative;
	width: 60px;
	height: 25px;
	display:flex;
	align-items:center;
	border-radius: 25px;
	background: ${({ light }) => (light ? "#8484FF" : "rgb(256,256,256,0.8)")};
	.ball {
		width: 18px;
		height: 18px;
		background: ${(props) => (props.light ? "white" : "#37383a")};
		position: absolute;
		border-radius: 18px;
		${(props) => (props.light ? "left:4px" : "left:38px")};
		transition: 0.3s ease all;
	}
`;
export default function Toggler() {
	const [light, toggleLight] = useContext(ThemeContext);
	return (
		<StyledToggler light={light}>
			<div className='ball' onClick={toggleLight}></div>
		</StyledToggler>
	);
}
