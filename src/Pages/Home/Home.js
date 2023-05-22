import React, { Fragment, useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Table, Badge } from 'reactstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance } from "../../Axios";
import "./Home"

const ToDoList = () => {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    getToDoList();
  }, []);

  const getToDoList = async () => {
    try {
      const response = await axiosInstance.get("/todos");
      setToDoList(response.data.todos);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteAtoDo = async (todoId) => {
    const response = await axiosInstance
        .delete(`/todos/${todoId}`)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
};
  return (
     
    <div className="container my-4">
       <nav class="navbar navbar-light bg-light my-5">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Navbar</span>
            <Link
                to={"/Create-Todo"}
                className="btn btn-sm btn-success float-right text-light fs-6">
                Create Todo
            </Link>
        
        </div>
        </nav>
     <Card>
      <CardHeader>
        <h4 className="mb-0">ToDo List</h4>
      </CardHeader>
      <CardBody>
        <div className="table-responsive " style={{ height: '400px', overflow: 'hidden', outline: 'none' }}>
          <Table className="table-striped">
            <thead >
              <tr>
                <th class>id</th>
                <th>ToDo Content</th>
                <th>creation Date</th>
                <th>completed</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {toDoList.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>
                    <h6 className=" font-13">{todo.todo}</h6>
                  </td>
                  <td>{new Date(todo.creationDate).toLocaleDateString()}</td>
                  <td>
                    <Badge color={todo.completed ? "success" : "danger"}>
                        {todo.completed ? "Completed" : "Not Completed"}
                    </Badge>
                 </td>
                  <td>
                  <Link
                to={`/Update-Todo/${todo.id}`}
                className=" text-success m-2">
                      <FontAwesomeIcon icon={faPencilAlt} />
                </Link>
                   
                   <Link
							onClick={(e) => {
								e.preventDefault();
								deleteAtoDo(todo.id);
							}}
                            className=" text-danger"
						>
				      <FontAwesomeIcon icon={faTrashAlt} />
					</Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  </div>
  );
};

export default ToDoList;
