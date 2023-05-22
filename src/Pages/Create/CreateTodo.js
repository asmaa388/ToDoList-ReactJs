import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../Axios";
import Input from "../../SharedUi/Input";

const CreateTodo = () => {
const [todoInfo, setTodoInfo] = useState({
todo: "",
});
const [errors, setErrors] = useState({
todo: "",
});
const handleChange = (e) => {
	setTodoInfo({ ...todoInfo, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
	e.preventDefault();
	if (validateForm()) {
		createNewTodo();
	}
};

const validateForm = () => {
	let isValid = true;
	const { todo } = todoInfo;
	const newErrors = { todo: "" };

	if (todo.trim() === "") {
		newErrors.todo = "Content should not be empty.";
		isValid = false;
	} else if (todo.length < 5) {
		newErrors.todo = "Content should be at least 5 characters.";
		isValid = false;
	} else if (todo.length > 100) {
		newErrors.todo = "Content should not exceed 100 characters.";
		isValid = false;
	}

	setErrors(newErrors);
	return isValid;
};

const createNewTodo = async () => {
	try {
		const response = await axiosInstance.post("/todos/add", {
			todo: todoInfo.todo,
			completed: false,
			userId: 5,
		});
		console.log(response);
		// TODO: Redirect to Home
    window.location.href = "http://localhost:3000/";
//const navigate = useNavigate();
// navigate("/") ;
	} catch (error) {
		console.log(error);
	}
};

return (
	<div className="container">
		    <nav class="navbar navbar-light bg-light my-5">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Navbar</span>

        </div>
        </nav>
        <h3 className="my-3">Add New ToDo</h3>

		<div className="pb-2">
			<div className="card">
				<div className="card-body">
					<div className="d-flex flex-row align-items-center">
						<Input
							name="todo"
							handleChange={handleChange}
							value={todoInfo.todo}
							cols="30"
						/>
						{errors.todo && <div className="text-danger">{errors.todo}</div>}
						<a href="#!" data-mdb-toggle="tooltip" title="Set due date">
							<i className="fas fa-calendar-alt fa-lg me-3"></i>
						</a>
						<div>
							<button type="button" onClick={handleSubmit} className="btn btn-primary">
								Add
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<hr className="my-4" />
	</div>
);
};

export default CreateTodo;






