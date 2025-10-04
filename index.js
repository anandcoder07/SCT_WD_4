const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDateTime = document.getElementById('task-datetime');
const taskList = document.getElementById('task-list');
const sortBtn = document.getElementById('sort-btn');

let tasks = [];

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const dateTime = taskDateTime.value;

  if (taskText) {
    tasks.push({
      text: taskText,
      dateTime: dateTime,
      completed: false
    });
    taskInput.value = '';
    taskDateTime.value = '';
    renderTasks();
  }
});

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';
    taskInfo.innerHTML = `<strong>${task.text}</strong><br/><small>${task.dateTime || ''}</small>`;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Done';
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskInfo);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function editTask(index) {
  const newText = prompt('Edit task:', tasks[index].text);
  if (newText !== null) {
    const newDateTime = prompt('Edit date and time (YYYY-MM-DDTHH:MM):', tasks[index].dateTime);
    tasks[index].text = newText.trim();
    tasks[index].dateTime = newDateTime;
    renderTasks();
  }
}

sortBtn.addEventListener('click', () => {
  tasks.sort((a, b) => {
    const dateA = a.dateTime ? new Date(a.dateTime) : null;
    const dateB = b.dateTime ? new Date(b.dateTime) : null;

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateA - dateB;
  });
  renderTasks();
});
