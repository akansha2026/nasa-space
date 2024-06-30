import { useState } from "react";

export default function useToggle(defaultValue) {
	const [state, setState] = useState(defaultValue);
	const toggleState = () => {
		setState(!state);
	};
	return [state, toggleState];
}
