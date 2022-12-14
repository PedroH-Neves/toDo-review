import showTasks from './modules/actions';

import './style.css';

window.addEventListener('load', () => {
  const tasksList = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskForm = document.getElementById('task-form');
  const resetBtn = document.getElementById('reset-btn');

  resetBtn.addEventListener('click', () => {
    localStorage.removeItem('tasks');
    showTasks();
  });

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = {
      description: e.target.elements.task.value,
      completed: false,
      index: tasksList.length + 1,
    };
    tasksList.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasksList));
    e.target.reset();
    showTasks();
  });
  showTasks();
});