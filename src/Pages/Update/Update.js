import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { axiosInstance } from "../../Axios";
import Input from "../../SharedUi/Input";
const UpdateTodo = () => {
	const { todoId } = useParams();
	const [todoInfo, setTodoInfo] = useState({
		todo: "",
	});
    
	useEffect(() => {
		getTodoDetails();
	}, []);

	const getTodoDetails = async () => {
		const response = await axiosInstance
			.get(`/todos/${todoId}`)
			.then((res) => {
				console.log(res.data);
				setTodoInfo({
					todo: res.data.todo,
					completed: res.data.completed,
					id: res.data.id,
					userId: res.data.userId,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}; // End Of getTodoDetails()
	const handleChange = (e) => {
		setTodoInfo(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setTodoInfo(e.target.value);
		// Take the Data , And Call Axios , Then Redirectto the Home Page  ;
		updateTheTodo();
		console.log(todoInfo);
	};

	const updateTheTodo = async () => {
		const response = await axiosInstance
			.put(`/todos/${todoId}`, {
				todo: todoInfo,
				completed: true,
				userId: 4564764,
			})
			.then(function (response) {
				console.log(response);
				// window.location.href = "http://localhost:3000/";
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	return (
<div className="container">
		    <nav class="navbar navbar-light bg-light my-5">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Navbar</span>

        </div>
        </nav>
        <h3 className="my-3"> Update ToDo</h3>

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
						<a href="#!" data-mdb-toggle="tooltip" title="Set due date">
							<i className="fas fa-calendar-alt fa-lg me-3"></i>
						</a>
						<div>
							<button type="button" onClick={handleSubmit} className="btn btn-primary">
								Edit
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

export default UpdateTodo;