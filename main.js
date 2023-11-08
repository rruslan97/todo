let list = [];

function addTask(name, status = 'todo', priority='high') {
//   console.log(typeof name);

  if (typeof name !== 'string') {
		throw new Error("Ошибка: значение не является строкой");
  };
  if (name.length > 50) {
    throw new Error("Строка слишком длинная"); // здесь код прерывается и дальше не идет
  };
  if (name.length < 3) {
    throw new Error("Строка слишком короткая");  // здесь код прерывается и дальше не идет
  };

    list.push ({
        name, 
        status, 
        priority });
};

const findTaskIndex = (name) => {
    return list.findIndex(t=> t.name === name);
};


function removeTask(name) {

    const index = findTaskIndex(name);
    console.log(index);
    if (index == -1) {
        console.error('задачи нет');
        return;
    }
    list.splice(index, 1);
    return;
};



function changeStatus(name, status) {
    const index = findTaskIndex(name);
    list[index].status = status;
    return;
};

const formHighNode  = document.querySelector('.form-high');
const formLowNode  = document.querySelector('.form-low');
const inputHighTaskNode = document.querySelector('.input-task-high');
const inputLowTaskNode = document.querySelector('.input-task-low');

const highTasksNode = document.querySelector('.high-tasks');
const lowTasksNode = document.querySelector('.low-tasks');

formHighNode.addEventListener('submit', event => {
    event.preventDefault();
    addTask(inputHighTaskNode.value, 'todo', 'high');
    formHighNode.reset();
    render();
    // closeBtn.removeEventListener('click');
});

formLowNode.addEventListener('submit', event => {
    event.preventDefault();
    addTask(inputLowTaskNode.value, 'todo', 'low');
    formLowNode.reset();
    render();
    // closeBtn.removeEventListener();
});

const deleteBtnHandler = () => {
    removeTask (taskName);
    render();
    closeBtn.removeEventListener('click');
};

function createTaskElement (taskName, status) {
    const divTask = document.createElement('div');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const taskText = document.createElement('span');
    const closeBtn = document.createElement('button');

 
    divTask.classList.add('task');
    checkbox.type = 'checkbox';
    taskText.textContent = taskName;

    closeBtn.textContent = 'X';

    closeBtn.addEventListener('click', () => {
        removeTask(taskName);
        render();
        // closeBtn.removeEventListener('click');
    });

    
    checkbox.addEventListener('change', () => {
        const isChecked = checkbox.checked; 
        changeStatus(taskName, isChecked ? 'done' : 'todo');
        render();
    })

if (status == 'done') {
    divTask.classList.add('done-task');
    checkbox.checked = true;
}

label.appendChild(checkbox);
label.appendChild(taskText);
divTask.appendChild(label);
divTask.appendChild(closeBtn);
return divTask;
};


function render() {
    highTasksNode.innerHTML= '';
    lowTasksNode.innerHTML= '';
    for (const task of list) {
        const nodeForTasks = task.priority == 'high' ? highTasksNode: lowTasksNode;
        const taskNode = createTaskElement(task.name, task.status);
        nodeForTasks.appendChild(taskNode);
    }
};

render();
