import React, { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import close from "../images/cross.png";
import axios from "axios";

const NewTasks = styled.div`
	border: 1px solid black;
	padding: 1.4rem;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Modal = styled.div`
	padding: 1rem 5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 15px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	border-radius: 9px;
	box-shadow: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
	transition: all 0.5s;
	border: 1px solid black;

	.closeBtn {
		position: fixed;
		top: 1rem;
		right: 1rem;
		cursor: pointer;
	}
	.modal-form {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		div {
			margin: 1rem;
		}
		label {
			display: block;
			font-weight: 600;
		}

		input {
			padding: 0.2rem;
		}
		input:focus {
			outline: none;
		}

		.submitBtn {
			padding: 0.5rem;
			color: #fff;
			background-color: #2b8a3e;
			cursor: pointer;
			border-radius: 9px;
		}

		.status {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 50px;
			& input {
				cursor: pointer;
			}
		}
	}
`;

const NewTaskmodal = ({ setNewtasks, tasks, setUpdateTasks, updateTasks }) => {
	const [title, setTitle] = useState("");

	const [description, setDescription] = useState("");

	const [completed, setCompleted] = useState();

	const handleCloseModal = () => {
		setNewtasks(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!title || !description) {
			return;
		}

		axios
			.post("http://localhost:5000/tasks", {
				title,
				description,
				completed,
			})
			.then((res) => {
				setNewtasks([...tasks, res.data]);
				setTitle("");
				setDescription("");
				setCompleted(false);
			})
			.catch((err) => console.error(err));

		setNewtasks(false);

		setUpdateTasks(() => updateTasks++);
	};

	return createPortal(
		<NewTasks>
			<Modal>
				<h1>Add new tasks</h1>
				<img
					src={close}
					className="closeBtn"
					alt="closeBtn"
					width="15px"
					height="15px"
					onClick={handleCloseModal}
				/>
				<form className="modal-form" onSubmit={handleSubmit}>
					<div>
						<label>Title: </label>
						<input type="text" onChange={(e) => setTitle(e.target.value)} />
					</div>

					<div>
						<label>Description: </label>
						<input
							type="text"
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>

					<label>Status: </label>
					<div className="status">
						<div>
							<label>True: </label>
							<input type="checkbox" onChange={(e) => setCompleted(1)} />
						</div>
						<div>
							<label>False:</label>
							<input type="checkbox" onChange={(e) => setCompleted(0)} />
						</div>
					</div>
					<button className="submitBtn" type="submit">
						Submit
					</button>
				</form>
			</Modal>
		</NewTasks>,
		document.body
	);
};

export default NewTaskmodal;
