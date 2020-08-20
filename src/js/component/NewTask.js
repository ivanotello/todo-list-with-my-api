import React from "react";
import PropTypes from "prop-types";

export const NewTask = ({ setTodo, todo, addToList }) => {
	// const addToList = () => {
	// 	setList([...list, todo]);
	// 	setTodo("");
	// };

	return (
		<div className="input-group mt-3 ">
			<input
				type="text"
				className="form-control"
				onChange={e => setTodo(e.target.value)}
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
	addToList: PropTypes.any
};
