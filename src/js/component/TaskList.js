import React, { useState } from "react";
import PropTypes from "prop-types";

export function TaskList({ list, setList }) {
	const removeItem = itemIndex => {
		const newList = list.filter((todo, index) => {
			return index != itemIndex;
		});
		setList(newList);
	};
	const [showX, setShowX] = useState(false);

	const taskList = list.map((task, index) => (
		<div
			className="row input-group margin-auto"
			key={index}
			onMouseEnter={() => setShowX(true)}
			onMouseLeave={() => setShowX(false)}>
			<li className="list-group-item" style={{ width: "100%" }}>
				{task}
				{showX && (
					<span
						className="float-right h-auto"
						onClick={e => removeItem(index)}
						style={{ fontSize: "15px" }}>
						X
					</span>
				)}
			</li>
		</div>
	));
	return (
		<ul className="list-group list-group-flush wx-50 margin-auto">
			{taskList}
		</ul>
	);
}

TaskList.propTypes = {
	list: PropTypes.any,
	setList: PropTypes.any
};
