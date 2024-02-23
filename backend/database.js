const mysql = require("mysql2");

// Create a MySQL connection pool
const pool = mysql
	.createPool({
		host: "localhost", // MySQL host
		user: "root", // MySQL username
		password: "Pappa", // MySQL password
		database: "task_manager", // MySQL database name
		waitForConnections: true,
		connectionLimit: 10, // Adjust as per your requirements
		queueLimit: 0,
	})
	.promise();

// Test the connection
pool.getConnection(async (err, connection) => {
	if (err) {
		console.error("Error connecting to MySQL database: ", err);
	} else {
		console.log("Connected to MySQL database...");
		connection.release();
	}
});

module.exports = pool;
