
import React from "react";

function Input(props) {
	return (
			<textarea type="text" class="form-control form-control-lg" id="exampleFormControlInput1"
               placeholder="Add new..."name={props.name}
				onChange={props.handleChange}
				value={props.value} >

            </textarea>
	);
}



export default Input;