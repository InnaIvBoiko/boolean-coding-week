// # Operazioni da fare ad avvio pagina

// Recupero gli elementi di interesse dalla pagina
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');

const STORAGE_KEY = '__bool_todo__';
const storage = localStorage.getItem(STORAGE_KEY);

// Preparo una lista di attività
let activities = [];

if (storage) {
    activities = JSON.parse(storage);
};

showContent();

// # Operazioni dinamiche
button.addEventListener('click', addActivity);

// # Functions

function showContent() {
    todoList.innerText = '';
    emptyListMessage.innerText = '';

    if (activities.length > 0) {
        activities.forEach((activity) => {
            const template = createActivityTemplate(activity);
            todoList.innerHTML += template;
        });
        makeCheckClickable();
    } else {
        emptyListMessage.innerText = 'Sembra che non ci sono attività';
    };
};

function makeCheckClickable() {
    const checks = document.querySelectorAll('.todo-check');
    checks.forEach((check, index) => {
        check.addEventListener('click', () => {
            activities.splice(index, 1);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activities))
            // Aggiorno la lista
            showContent();
        });
    });
};

function addActivity() {
    const newActivity = inputField.value.trim();
    if (newActivity.length > 0) {
        activities.push(newActivity);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
        showContent();
        inputField.value = '';
    } else {
        inputField.value = '';
    };
};

function createActivityTemplate(activity) {
    return `
      <li class="todo-item">
            <div class="todo-check">
              <img src="images/check.svg" alt="Check Icon" />
            </div>
            <p class="todo-text">${activity}</p>
          </li>
    `;
};