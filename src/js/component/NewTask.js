import React from "react";
import PropTypes from "prop-types";

export const NewTask = ({ setTodo, todo, setList, list }) => {
	const addTaskFromInput = e => {
		setTodo(e.target.value);
	};
	const addToList = () => {
		setList([...list, todo]);
		setTodo("");
	};

	return (
		<div className="input-group mt-3 ">
			<input
				type="text"
				className="form-control"
				onChange={addTaskFromInput}
				value={todo}
				placeholder="Add new task"
				aria-label="Recipient's username"
				aria-describedby="button-addon2"
			/>
			<div className="input-group-append">
				<button
					className="btn btn-outline-secondary"
					onClick={addToList}
					type="button"
					id="button-addon2">
					+
				</button>
			</div>
		</div>
	);
};

NewTask.propTypes = {
	setTodo: PropTypes.any,
	todo: PropTypes.any,
	setList: PropTypes.any,
	list: PropTypes.any
};
