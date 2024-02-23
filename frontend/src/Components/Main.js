import React, { useEffect, useState } from "react";
import Task from "./Task";
import styled from "styled-components";
import NewTaskmodal from "./NewTaskmodal";
import axios from "axios";

const StyledMain = styled.main`
	border: 1px solid black;
	border-radius: 9px;
	margin: 5rem auto;
	width: 50vw;
	padding: 2rem 5rem;
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}
	h1 {
		font-weight: 500;
	}
	button {
		padding: 0.4rem 0.8rem;
		font-size: 1rem;
		color: #fff;
		background-color: #37b24d;
		border-radius: 9px;
		border: none;
		cursor: pointer;
	}
`;

const Main = () => {
	const [newtasks, setNewtasks] = useState(false);
	const [tasks, setTasks] = useState([]);
	const [updateTasks, setUpdateTasks] = useState(0);

	function handleAddTasks() {
		setNewtasks(true);
	}

	useEffect(() => {
		axios
			.get("http://localhost:5000/tasks")
			.then((res) => setTasks(res.data))
			.catch((err) => console.error(err));
	}, [updateTasks]);

	console.log(tasks);

	return (
		<>
			<StyledMain>
				<div className="header">
					<h1>Task Manager</h1>
					<button onClick={handleAddTasks}>Add</button>
				</div>
				{tasks.map((item) => (
					<Task
						id={item.id}
						item={item}
						setTasks={setTasks}
						tasks={tasks}
						setUpdateTasks={setUpdateTasks}
						updateTasks={updateTasks}
					/>
				))}
			</StyledMain>
			{newtasks ? (
				<NewTaskmodal
					setUpdateTasks={setUpdateTasks}
					setNewtasks={setNewtasks}
					tasks={tasks}
					updateTasks={updateTasks}
				/>
			) : (
				""
			)}
		</>
	);
};

export default Main;
