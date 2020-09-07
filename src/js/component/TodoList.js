import React, { useState, useEffect } from "react";
import { TaskList } from "./TaskList";
import { NewTask } from "./NewTask.js";

const baseURL =
	"https://3245-eb01c73f-c24c-4072-9df2-51469f94d149.ws-us02.gitpod.io";

const TodoList = () => {
	const [loggedUser, setLoggedUser] = useState(true);
	const [todo, setTodo] = useState("");
	const [list, setList] = useState([]);

	const getTaskList = async () => {
		try {
			const response = await fetch(`${baseURL}/todos`);
			if (response.ok) {
				let tasks = await response.json();
				setList(tasks);
			} else {
				console.log("problema con response de getTaskList");
			}
		} catch (error) {
			console.log("getTaskList", error);
		}
	};

	const addToList = async () => {
		try {
			const response = await fetch(`${baseURL}/todos`, {
				method: "POST",
				body: JSON.stringify({ label: todo, done: false }),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				getTaskList();
				setTodo("");
			} else {
				console.log("problema con response de addToList");
			}
		} catch (error) {
			console.log("addToList", error);
		}
	};
	const removeItem = async itemIndex => {
		try {
			let newList = list.filter((todo, index) => {
				return index != itemIndex;
			});
			const response = await fetch(`${baseURL}/todos/${itemIndex + 1}`, {
				method: "DELETE",
				body: JSON.stringify(newList),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				getTaskList();
			} else {
				console.log("problema con response de removeItem");
			}
		} catch (error) {
			console.log("removeItem", error);
		}
	};
	useEffect(() => {
		getTaskList();
	}, []);

	return (
		<div className="container margin-auto w-50">
			<h1 className="text-center">{"TODO List"}</h1>
			<div className="text-secondary" style={{ padding: "5px" }}>
				{list.length < 1
					? "No tasks, add a task"
					: list.length + " left to do"}
			</div>
			<TaskList removeItem={removeItem} list={list} />
			<NewTask todo={todo} setTodo={setTodo} addToList={addToList} />
		</div>
	);
};

export default TodoList;
