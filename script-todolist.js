// # Operazioni da fare ad avvio pagina

// Recupero gli elementi di interesse dalla pagina
const button = document.querySelector('button');
const inputField = document.querySelector('input');
const todoList = document.querySelector('.todo-list');
const emptyListMessage = document.querySelector('.empty-list-message');

// Preparo una lista di attività
let activities = [];

// # Operazioni dinamiche
button.addEventListener('click', function () {
    const newActivity = inputField.value.trim();
    if (newActivity.length > 0) {
    activities.push(newActivity);
    showContent();
        inputField.value = '';
    } else {
        inputField.value = '';
    };
});

// Funzione che decide cosa mostrare in pagina
function showContent() {
    todoList.innerText = '';
    emptyListMessage.innerText = '';

    if (activities.length > 0) {
        activities.forEach(function (activity) {
            todoList.innerHTML += `
            <li class="todo-item">
            <div class="todo-check">
              <img src="images/check.svg" alt="Check Icon" />
            </div>
            <p class="todo-text">${activity}</p>
          </li>
            `;
        });
        makeCheckClickable();
    } else {
        emptyListMessage.innerText = 'Sembra che non ci sono attivita';
    };
};


function makeCheckClickable() {
    const checks = document.querySelectorAll('.todo-check');
    checks.forEach(function (check, index) {
        check.addEventListener('click', function () {
            activities.splice(index, 1);
            // Aggiorno la lista
            showContent();
        });
    });
}