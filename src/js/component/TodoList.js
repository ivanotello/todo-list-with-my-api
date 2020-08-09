import React, { useState } from "react";
import { TaskList } from "./TaskList";
import { NewTask } from "./NewTask.js";

const TodoList = () => {
	const [todo, setTodo] = useState("");
	const [list, setList] = useState([]);

	return (
		<div className="container margin-auto w-50">
			<h1 className="text-center">{"TODO List"}</h1>
			<div className="text-secondary" style={{ padding: "5px" }}>
				{list.length < 1
					? "No tasks, add a task"
					: list.length + " left to do"}
			</div>
			<TaskList list={list} setList={setList} />
			<NewTask
				todo={todo}
				setTodo={setTodo}
				setList={setList}
				list={list}
			/>
		</div>
	);
};

export default TodoList;
