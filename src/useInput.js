import { useState } from "react";

export default function useInput(defaultValue) {
	const [state, setState] = useState(defaultValue);
	const handleChange = (evt) => {
		setState(evt.target.value);
	};
	return [state, handleChange];
}