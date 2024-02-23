const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./database");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
	try {
		const result = await db.query("SELECT * FROM tasks");
		if (result) {
			res.status(200).json(result[0]);
		}
	} catch (error) {
		res.status(500).json({
			message: error,
		});
	}
});

app.post("/tasks", (req, res) => {
	const { title, description, completed } = req.body;
	const newTask = { title, description, completed };

	db.query("INSERT INTO tasks SET ?", newTask, (err, result) => {
		if (err) throw err;
		res.json({ id: result.insertId, ...newTask });
	});
});

app.delete("/tasks/:id", async (req, res) => {
	const taskId = req.params.id;
	try {
		await db.query("DELETE FROM tasks WHERE id = ?", [taskId]);
		res.status(204).send();
	} catch (error) {
		console.error("Error deleting task:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(process.env.PORT, () => {
	console.log(`app is listening at port ${process.env.PORT}`);
});
