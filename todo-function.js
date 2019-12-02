
const getTodos = function () {
    const todosJson = localStorage.getItem('todos')
    const todos = (todosJson !== null)
        ? JSON.parse(todosJson)
        : []

    return todos;
}

// save todos
const saveTodos = function (todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// render todos
const renderTodos = function (todos, filters) {
    const filterTodos = todos.filter(function (todo) {
        const searchText = todo.text.toLocaleLowerCase().includes(filters.searchText.toLocaleLowerCase())
        const hideCompleted = !filters.hideCompleted || !todo.completed

        return searchText && hideCompleted
    })

    const incompletedTodos = filterTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = '';
    document.querySelector('#todos').appendChild(summaryTodo(incompletedTodos))

    filterTodos.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodo(todo))
    })
}

//other div container
const generateTodo = function (todo) {
    const d = document.createElement('div');
    d.appendChild(generateTodoEx(todo))
    return d
}
// generate todo to DOM
const generateTodoEx = function (todo) {
    const l = document.createElement('label');
    // checkbox.value = todo.completed
    const checkbox = document.createElement('input');
    checkbox.type = 'text'
    checkbox.checked = todo.completed

    const i = document.createElement('input')
    i.checked = todo.completed
    i.value = todo.text
    i.type = 'checkbox'

    const s = document.createElement('span')
    s.className = 'label-body'
    s.textContent = todo.text

    l.appendChild(i)
    l.append(s)

    return l
}

const changeCompleted = function (todos, found) {
    todos.forEach(function (part, index) {
        if (part.text == found) {
            if (part.completed == true) {
                this[index].completed = false;
            } else {
                this[index].completed = true;
            }
        }
    }, todos);
    saveTodos(todos)
}

// summary todo
const summaryTodo = function (incompletedTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `Sisa todo ${incompletedTodos.length} lagi`

    return summary
}