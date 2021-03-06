// SELECTORS
const todoInput = document.querySelector('.todoInput');
const todoButton = document.querySelector('.todoButton');
const todoList = document.querySelector('.todoList');
const todoSelect = document.querySelector('.todoSelect');

// EVENT LISTENERS
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteItem);
todoSelect.addEventListener('click', filterList);
document.addEventListener('DOMContentLoaded', storeLocal);

// FUNCTION

// ADD LIST DIV ITEM
function addTodo(event) {
  event.preventDefault();
  if (todoInput.value === '') return;
  const todo = document.createElement('div');
  todo.classList.add('todoDiv');
  // create LIST ITEM
  const list = document.createElement('li');
  list.innerText = todoInput.value;
  savetoLocal(todoInput.value);
  list.classList.add('todoItem');
  todo.appendChild(list);

  // create CHECK ICON
  const check = document.createElement('button');
  check.innerHTML = '<i class="fas fa-check"></i>';
  check.classList.add('todoCheck');
  todo.appendChild(check);

  // create TRASH ICON
  const trash = document.createElement('button');
  trash.innerHTML = '<i class="fas fa-trash"></i>';
  trash.classList.add('todoTrash');
  todo.appendChild(trash);

  //   APPEND TODO DIV TO TODO UL
  todoList.appendChild(todo);
  todoInput.value = '';
}

// DELETE LIST ITEM
function deleteItem(event) {
  const item = event.target;

  if (item.classList[0] === 'todoTrash') {
    const todo = item.parentElement;

    todo.classList.add('fall');
    deleteLocal(item);
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }
  if (item.classList[0] === 'todoCheck') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

// FILTER LIST
function filterList(event) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (event.target.value) {
      case 'all': {
        todo.style.display = 'flex';
        break;
      }
      case 'completed': {
        if (todo.classList.contains('completed')) todo.style.display = 'flex';
        else todo.style.display = 'none';
        break;
      }
      case 'uncompleted': {
        if (todo.classList.contains('completed')) todo.style.display = 'none';
        else todo.style.display = 'flex';
        break;
      }
    }
  });
}

// LOCAL STORAGE
function savetoLocal(str) {
  let todos;

  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    console.log(todos);
  }

  todos.push(str);
  localStorage.setItem('todos', JSON.stringify(todos));
  console.log(JSON.stringify(todos));
}
function storeLocal() {
  const todos = JSON.parse(localStorage.getItem('todos'));
  todos.forEach((item) => {
    const todo = document.createElement('div');
    todo.classList.add('todoDiv');
    // create LIST ITEM
    const list = document.createElement('li');
    list.innerText = item;

    // savetoLocal(todoInput.value);
    list.classList.add('todoItem');
    todo.appendChild(list);

    // create CHECK ICON
    const check = document.createElement('button');
    check.innerHTML = '<i class="fas fa-check"></i>';
    check.classList.add('todoCheck');
    todo.appendChild(check);

    // create TRASH ICON
    const trash = document.createElement('button');
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    trash.classList.add('todoTrash');
    todo.appendChild(trash);

    //   APPEND TODO DIV TO TODO UL
    todoList.appendChild(todo);
  });
}

function deleteLocal(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const position = todos.indexOf(todo.parentElement.innerText);
  console.log(position);
  todos.splice(position, 1);
  console.log(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
}

