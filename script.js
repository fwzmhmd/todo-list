const todoArr = ['book flights', 'bake cake', 'read book'];
const completedTodosArr = [];

const todoList = document.querySelector('.todo-list');
const completeList = document.querySelector('.complete-list');
const todoForm = document.querySelector('#todo-form');
const toggleBtn = document.querySelector('.toggle-btn');

todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const input = e.target[0];

  if (input.value !== '') {
    todoArr.unshift(input.value);
    input.value = '';
    listTodos();
  }
});

// Generate list item
const genLi = (todo, state) => {
  return `<li>
    <div class="list-text">${todo}</div>
    <div class="btn-group">
      <button class="${state}"><i class="fa-solid
        ${state === 'done' ? `fa-check` : `fa-rotate-left`}"></i>
      </button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
    </div>
  </li>`;
};

const checkTodos = (arr, listArr, listHtml, htmlStr) => {
  arr.length < 1
    ? (listHtml.innerHTML = htmlStr)
    : (listHtml.innerHTML = listArr);
};

const listTodos = () => {
  const todos = todoArr.map(todo => genLi(todo, 'done')).join('');
  const compTodos = completedTodosArr.map(todo => genLi(todo, 'undo')).join('');

  checkTodos(
    completedTodosArr,
    compTodos,
    completeList,
    '<h3>All completed</h3>'
  );
  checkTodos(todoArr, todos, todoList, '<h3>No more Todos</h3>');
};

listTodos();

const deleteItem = (target, arr) => {
  const arrIndex = arr.indexOf(
    target.parentNode.previousElementSibling.textContent
  );
  arr.splice(arrIndex, 1);
};

const updateItem = (target, arr, arr2) => {
  const arrIndex = arr.indexOf(
    target.parentNode.previousElementSibling.textContent
  );
  arr2.unshift(target.parentNode.previousElementSibling.textContent);
  arr.splice(arrIndex, 1);
  target.parentNode.remove();
};

todoList.addEventListener('click', e => {
  e.preventDefault();
  const target = e.target;
  if (target.nodeName === 'BUTTON') {
    if (target.className === 'done') {
      updateItem(target, todoArr, completedTodosArr);
    }

    if (target.className === 'delete') {
      deleteItem(target, todoArr);
    }
  }

  listTodos();
});

completeList.addEventListener('click', e => {
  e.preventDefault();
  const target = e.target;
  if (target.nodeName === 'BUTTON') {
    if (target.className === 'undo') {
      updateItem(target, completedTodosArr, todoArr);
    }
    if (target.className === 'delete') {
      deleteItem(target, completedTodosArr);
    }

    listTodos();
  }
});

toggleBtn.addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.toggle('dark');
  e.target.innerText === ' Dark Theme'
    ? (e.target.innerHTML = `<i class="fa-solid fa-sun"></i> Light Theme`)
    : (e.target.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Theme`);
});
