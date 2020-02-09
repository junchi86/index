// view
const BODY = document.querySelector('body');
const TITLE = document.createElement('h1');
TITLE.innerText = 'This is MY ToDos';
BODY.appendChild(TITLE);

const FORM = document.createElement('form');
FORM.setAttribute('type', 'submit');
BODY.appendChild(FORM);

const INPUT = document.createElement('input');
INPUT.placeholder = 'Write ToDo!';
INPUT.setAttribute('type', 'text');
FORM.appendChild(INPUT);

const CLEAR = document.createElement('button');
CLEAR.innerText = 'Clear-전체 제거';
FORM.after(CLEAR);

const PENDING = document.createElement('h2');
PENDING.innerText = 'PENDING';
BODY.appendChild(PENDING);

const FINISHED = document.createElement('h2');
FINISHED.innerText = 'FINISHED';
BODY.appendChild(FINISHED);

//controllers
const inputForm = document.querySelector('form');
const inputField = document.querySelector('input');
const pendingTodos = document.createElement('ul');
const finishedTodos = document.createElement('ul');

const TODOS = 'pendings';
const TODOS_FINISHED = 'finished';

let todos = [];
let finTodos = [];

let id = todos.length + 1;

const loadStorage = () => {
  const local = localStorage.getItem(TODOS);
  const parsedLocal = JSON.parse(local);
  if (parsedLocal) {
    todos = parsedLocal;
    parsedLocal.map(item => paintTodos(item.id, item.text));
  } else {
    localStorage.setItem(TODOS, JSON.stringify([]));
  }
};

const loadStorageFinished = () => {
  const local = localStorage.getItem(TODOS_FINISHED);
  const parsedLocal = JSON.parse(local);
  if (parsedLocal) {
    finTodos = parsedLocal;
    parsedLocal.map(item => paintFinTodos(item.id, item.text));
  } else {
    localStorage.setItem(TODOS_FINISHED, JSON.stringify([]));
  }
};

const saveTodos = () => {
  localStorage.setItem(TODOS, JSON.stringify(todos));
  localStorage.setItem(TODOS_FINISHED, JSON.stringify(finTodos));
};

const clearTodos = e => {
  const btn = e.target;
  const li = btn.parentNode;
  const cleanTodo = todos.filter(i => {
    return i.id !== parseInt(li.id);
  });
  todos = cleanTodo;
  for (let i = 0; i < todos.length; i++) {
    todos[i].id = i + 1;
    li.id = i + 1;
  }
  saveTodos();
  loadStorage();
};

const clearFinTodos = e => {
  const btn = e.target;
  const li = btn.parentNode;

  finishedTodos.removeChild(li);
  const cleanTodo = finTodos.filter(i => {
    return i.id !== parseInt(li.id);
  });
  finTodos = cleanTodo;
  for (let i = 0; i < finTodos.length; i++) {
    finTodos[i].id = i + 1;
    li.id = i + 1;
  }
  saveTodos();
  location.reload();
};

const toFinished = e => {
  const btn = e.target;
  const li = btn.parentNode;
  finTodos.push({
    id: finTodos.length + 1,
    text: todos[li.id - 1].text
  });
  pendingTodos.removeChild(li);
  const cleanTodo = todos.filter(i => {
    return i.id !== parseInt(li.id);
  });
  todos = cleanTodo;
  for (let i = 0; i < todos.length; i++) {
    todos[i].id = i + 1;
    li.id = i + 1;
  }
  saveTodos();
  location.reload();
};

const toPending = e => {
  const btn = e.target;
  const li = btn.parentNode;
  todos.push({
    id: todos.length + 1,
    text: finTodos[li.id - 1].text
  });
  finishedTodos.removeChild(li);
  const cleanTodo = finTodos.filter(i => {
    return i.id !== parseInt(li.id);
  });
  finTodos = cleanTodo;
  for (let i = 0; i < finTodos.length; i++) {
    finTodos[i].id = i + 1;
    li.id = i + 1;
  }
  saveTodos();
  location.reload();
};

const paintTodos = (id, text) => {
  const pendingInnerTodos = document.createElement('li');
  const deleteButton = document.createElement('button');
  const modeButton = document.createElement('button');

  pendingInnerTodos.innerText = `${text}`;
  pendingTodos.appendChild(pendingInnerTodos);

  deleteButton.innerText = '✔';
  pendingInnerTodos.appendChild(deleteButton);
  deleteButton.addEventListener('click', clearTodos);

  modeButton.innerText = '🔻';
  pendingInnerTodos.appendChild(modeButton);
  modeButton.addEventListener('click', toFinished);
  pendingInnerTodos.id = id;
  PENDING.appendChild(pendingTodos);
};

const paintFinTodos = (id, text) => {
  const finInnerTodos = document.createElement('li');
  const deleteButton = document.createElement('button');
  const modeButton = document.createElement('button');

  finInnerTodos.innerText = `${text}`;
  finishedTodos.appendChild(finInnerTodos);

  deleteButton.innerText = '✔';
  finInnerTodos.appendChild(deleteButton);
  deleteButton.addEventListener('click', clearFinTodos);

  modeButton.innerText = '🔺';
  finInnerTodos.appendChild(modeButton);
  modeButton.addEventListener('click', toPending);
  finInnerTodos.id = id;
  FINISHED.appendChild(finishedTodos);
};

//기능 추가 전체 클리어
CLEAR.addEventListener('click', e => {
  e.preventDefault();
  localStorage.setItem(TODOS, JSON.stringify([]));
  localStorage.setItem(TODOS_FINISHED, JSON.stringify([]));
  location.reload();
});
//

//인풋서브밋
const inputSubmit = e => {
  e.preventDefault();
  const local = localStorage.getItem(TODOS);
  const parsedLocal = JSON.parse(local);
  parsedLocal ? (id = parsedLocal.length + 1) : 1;
  const text = inputField.value;
  todos.push({ id, text });
  paintTodos(id, text);
  saveTodos();
  inputField.value = '';
};

const init = () => {
  loadStorage();
  loadStorageFinished();
  inputForm.addEventListener('submit', inputSubmit);
};
init();
