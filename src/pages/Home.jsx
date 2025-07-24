import React, { useEffect, useState } from "react";

function Home() {
  const username = localStorage.getItem("username"); // Get from login
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleMarkCompleted = async (id) => {
  const res = await fetch(`http://localhost:3001/tasks/${id}/complete`, {
    method: "PATCH",
  });

  if (res.ok) {
    setTasks(
      tasks.map((task) =>
        task.emp_id === id ? { ...task, iscompleted: 1 } : task
      )
    );
  }
};


// Fetch check-in status on load
useEffect(() => {
  if (!username) return;

  fetch(`http://localhost:3001/attendance/${username}`)
    .then((res) => res.json())
    .then((data) => setIsCheckedIn(data.checkedIn))
    .catch((err) => console.error("Attendance error:", err));
}, [username]);

// Handle check-in
const handleCheckIn = async () => {
  const res = await fetch("http://localhost:3001/attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });

  if (res.ok) {
    setIsCheckedIn(true);
  } else if (res.status === 409) {
    alert("Already checked in today");
  }
};

  //  Fetch tasks from backend
  useEffect(() => {
    fetch(`http://localhost:3001/tasks/${username}`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, );

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const res = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, tasks: newTask }),
    });

    const data = await res.json();
    if (res.ok) {
      setTasks([...tasks, { emp_id: data.taskId, username, tasks: newTask, iscompleted: 0 }]);
      setNewTask("");
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.emp_id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-center text-3xl font-semibold mb-8">Welcome {username}</h1>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl m-auto">
        {/* Attendance Section */}
        <div className="bg-white shadow-md rounded-lg w-[450px] p-6 border text-center h-[230px] relative">
          {/* Info Icon with Tooltip */}
          <div className="absolute top-2 right-2 group cursor-pointer">
            <div className="bg-gray-200 text-gray-500 rounded-full w-5 h-5 flex items-center justify-center text-[12px] font-bold">
              i
            </div>
            <div className="absolute top-6 right-0 bg-black text-white text-[13px] font-medium rounded px-2 py-1 w-52 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              Auto checkout will be done at the end of the day. No need to check out manually. 
            </div>
          </div>

          {/* Content */}
          <h2 className="text-xl font-semibold mb-4">Attendance</h2>
          <p className="mb-4 text-gray-700">
            {isCheckedIn
              ? "You have checked in today ✅"
              : "You haven't checked in today"}
          </p>
          <button
            disabled={isCheckedIn}
            onClick={handleCheckIn}
            className={`px-4 py-2 rounded mb-4 text-white ${
              isCheckedIn ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isCheckedIn ? "Checked In" : "Check In"}
          </button>
           {/* Logout button */}
            <button
              onClick={() => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("username");
                window.location.href = "/";
              }}
              className="bg-black hover:bg-white block hover:text-black text-white px-4 py-2 rounded transition-all duestion-200 border-gray-400 border-1 m-auto"
            >
              Logout
            </button>
        </div>

        {/* Tasks Section */}
        <div className="bg-white shadow-md rounded-lg w-[450px] p-6 border">
          <h2 className="text-xl font-semibold mb-4">Your Tasks For Today</h2>

          {/* Task Input */}
          <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter new task"
              className="border px-3 py-2 w-full rounded"
            />
            <button type="submit" className="bg-green-600 text-white px-3 py-2 rounded">
              Add
            </button>
          </form>

          {/* Task List */}
          <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.emp_id}
              className={`flex max-w-full overflow-x-auto flex-col sm:flex-row sm:justify-between sm:items-center border p-3 rounded bg-white shadow-md gap-2 ${
                task.iscompleted ? "bg-green-200" : ""
              }`}
            >
              <span
                className={`break-words w-full ${
                  task.iscompleted ? "line-through text-gray-500" : ""
                }`}
              >
                {task.tasks}
              </span>

              <div className="flex gap-2 justify-end sm:justify-start flex-wrap">
                {!task.iscompleted && (
                  <button
                    onClick={() => handleMarkCompleted(task.emp_id)}
                    className="bg-gray-300 hover:bg-gray-400 text-sm px-2 py-1 rounded"
                  >
                    Completed
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTask(task.emp_id)}
                  className="bg-gray-300 hover:bg-gray-400 text-sm px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          {tasks.length === 0 && <p className="text-gray-500">No tasks found.</p>}
        </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
