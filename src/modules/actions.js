const showTasks = () => {
  const tasksElement = document.getElementById('tasks-list');
  const tasksList = JSON.parse(localStorage.getItem('tasks')) || [];
  const clearBtn = document.getElementById('clear-btn');

  tasksElement.innerHTML = '';

  tasksList.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    const checkBox = document.createElement('input');
    const description = document.createElement('span');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    checkBox.type = 'checkbox';
    checkBox.checked = task.completed;
    description.classList.add('task-description');
    editBtn.classList.add('edit-btn');
    deleteBtn.classList.add('delete-btn');
    description.innerHTML = `<input class="cool-input-${task.index} style-input" id="${task.index}" name="editedtask" type="text" value="${task.description}" readonly>`;
    editBtn.innerHTML = 'Edit';
    deleteBtn.innerHTML = 'Delete';

    tasksElement.appendChild(taskItem);
    taskItem.appendChild(checkBox);
    taskItem.appendChild(description);
    taskItem.appendChild(editBtn);
    taskItem.appendChild(deleteBtn);

    const lineComplete = document.querySelector(`.cool-input-${task.index}`);

    checkBox.addEventListener('change', () => {
      task.completed = !task.completed;

      localStorage.setItem('tasks', JSON.stringify(tasksList));

      if (task.completed) {
        lineComplete.classList.add('completed');
      } else {
        lineComplete.classList.remove('completed');
      }
    });

    editBtn.addEventListener('click', () => {
      const editedTask = document.getElementById(`${task.index}`);
      editedTask.removeAttribute('readonly');
      editedTask.focus();
      editedTask.addEventListener('blur', (e) => {
        editedTask.setAttribute('readonly', true);
        task.description = e.target.value;
        localStorage.setItem('tasks', JSON.stringify(tasksList));
        showTasks();
      });
    });

    deleteBtn.addEventListener('click', (e) => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTaskList = tasks.filter((item) => item.index !== task.index);

      updatedTaskList.forEach((item, index) => {
        item.index = index + 1;
      });

      localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
      e.target.parentElement.remove();
      showTasks();
    });

    clearBtn.addEventListener('click', () => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const updatedTaskList = tasks.filter((item) => item.completed === false);

      updatedTaskList.forEach((item, index) => {
        item.index = index + 1;
      });

      localStorage.setItem('tasks', JSON.stringify(updatedTaskList));
      showTasks();
    });
  });
};

export default showTasks;