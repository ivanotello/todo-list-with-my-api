import React, { useState, useEffect } from "react";
import { TaskList } from "./TaskList";
import { NewTask } from "./NewTask.js";

const baseURL = "https://assets.breatheco.de/apis/fake/todos";

const TodoList = () => {
	const [loggedUser, setLoggedUser] = useState(true);
	const [todo, setTodo] = useState("");
	const [list, setList] = useState([]);

	const getTaskList = async () => {
		try {
			const response = await fetch(`${baseURL}/user/ivanotello`);
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
			const response = await fetch(`${baseURL}/user/ivanotello`, {
				method: "PUT",
				body: JSON.stringify([...list, { label: todo, done: false }]),
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
			const response = await fetch(`${baseURL}/user/ivanotello`, {
				method: "PUT",
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
	useEffect(
		() => {
			if (loggedUser) {
				const checkUser = async () => {
					try {
						const response = await fetch(
							`${baseURL}/user/ivanotello`
						);
						if (response.ok) {
							getTaskList();
						} else {
							const addUser = await fetch(
								`${baseURL}/user/ivanotello`,
								{
									method: "POST",
									body: JSON.stringify([]),
									headers: {
										"Content-Type": "application/json"
									}
								}
							);
							if (addUser.ok) {
								getTaskList();
							} else {
								console.log("problema con checkUser");
							}
						}
						setLoggedUser(false);
					} catch (error) {
						console.log("checkUser", error);
					}
				};
				checkUser();
			}
		},
		[loggedUser]
	);

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
