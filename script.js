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

const listTodos = () => {
  const todos = todoArr
    .map(todo => {
      return `<li>
                <div class="list-text">${todo}</div>
                <div class="btn-group">
                  <button class="done">Done</button>
                  <button class="delete">Delete</button>
                </div>
              </li>`;
    })
    .join('');

  const compTodos = completedTodosArr
    .map(c => {
      return `<li>
                <div class="list-text">${c}</div>
                <div class="btn-group">
                  <button class="undo">Undo</button>
                  <button class="delete">Delete</button>
                </div>
              </li>`;
    })
    .join('');

  completedTodosArr.length < 1
    ? (completeList.innerHTML = `<h3>All completed</h3>`)
    : (completeList.innerHTML = compTodos);

  todoArr.length < 1
    ? (todoList.innerHTML = `<h3>No more Todos</h3>`)
    : (todoList.innerHTML = todos);
};

listTodos();

todoList.addEventListener('click', e => {
  e.preventDefault();
  const target = e.target;
  if (target.nodeName === 'BUTTON') {
    if (target.className === 'done') {
      const arrIndex = todoArr.indexOf(
        target.parentNode.previousElementSibling.textContent
      );
      completedTodosArr.unshift(
        target.parentNode.previousElementSibling.textContent
      );

      todoArr.splice(arrIndex, 1);
      target.parentNode.remove();
    }

    if (target.className === 'delete') {
      const arrIndex = todoArr.indexOf(
        target.parentNode.previousElementSibling.textContent
      );
      todoArr.splice(arrIndex, 1);
    }
  }

  listTodos();
});

completeList.addEventListener('click', e => {
  e.preventDefault();
  const target = e.target;
  if (target.nodeName === 'BUTTON') {
    if (target.className === 'undo') {
      const arrIndex = completedTodosArr.indexOf(
        target.parentNode.previousElementSibling.textContent
      );
      todoArr.push(target.parentNode.previousElementSibling.textContent);

      completedTodosArr.splice(arrIndex, 1);
      target.parentNode.remove();
    }
    if (target.className === 'delete') {
      const arrIndex = completedTodosArr.indexOf(
        target.parentNode.previousElementSibling.textContent
      );
      completedTodosArr.splice(arrIndex, 1);
    }

    listTodos();
  }
});

toggleBtn.addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.toggle('dark');
  e.target.innerText === 'Dark Mode'
    ? (e.target.innerText = 'Light Mode')
    : (e.target.innerText = 'Dark Mode');
});
