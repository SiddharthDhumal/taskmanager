import React, { useState } from "react";
import styled from "styled-components";
import cross2 from "../images/red-cross-png-33.png";
import axios from "axios";

const Tasks = styled.div`
	border: none;
	background-color: #f1f3f5;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1.5rem;
	margin-bottom: 0.5rem;
	input {
		cursor: pointer;
	}

	.task {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 15px;
	}
	img {
		cursor: pointer;
	}
`;

const Task = ({ item, setTasks, tasks, setUpdateTasks, updateTasks }) => {
	const [tasksCompletion, setTasksCompletion] = useState(false);
	const handledeleteTasks = async (taskId) => {
		await axios
			.delete(`http://localhost:5000/tasks/${taskId}`)
			.then(() => {
				const deletedTasks = tasks.filter((item) => item.id !== taskId);
				console.log(deletedTasks);
				setTasks(deletedTasks);
				setUpdateTasks(() => updateTasks++);
			})
			.catch((error) => console.error(error));
	};

	const handleCompletion = () => {
		setTasksCompletion(!tasksCompletion);
	};

	return (
		<Tasks>
			<div className="task">
				<input
					type="checkbox"
					onChange={() => {
						handleCompletion(item.id);
					}}
				/>
				<div
					style={
						tasksCompletion
							? { textDecoration: "line-through" }
							: { textDecoration: "none" }
					}
				>
					<p>
						<span style={{ fontWeight: "800" }}>Title:</span> {item.title}
					</p>
					<p>
						<span style={{ fontWeight: "800" }}>Description:</span>
						{item.description}
					</p>
				</div>
			</div>
			<p>
				{item.completed === 1 ? (
					<span>Completed</span>
				) : (
					<span>Not Completed</span>
				)}
			</p>
			<div>
				<img
					onClick={() => handledeleteTasks(item.id)}
					src={cross2}
					alt="cross"
					width="35px"
					height="35px"
				/>
			</div>
		</Tasks>
	);
};

export default Task;
