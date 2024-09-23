export const filterDailyTasks = (tasks, date, formatDate) => {
    return tasks.filter(task => {
        const taskDate = formatDate(new Date(task.date));
        return taskDate === date;
    });
};

export const updateTask = async (task, setter) => {
    const id = task.id;
    try {
        const response = await fetch(`http://localhost:5295/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });

        if (response.ok) {
            const taskData = await response.json();
            setter(prevTasks => prevTasks.map(task => task.id === id ? taskData : task));
        } else {
            console.error("error updating task", response.status, response.statusText);
        }
    } catch (error) {
        console.error("internal server error", error);
    }
};