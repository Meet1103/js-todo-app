// DOM Selectors
const todoInput = document.querySelector(".input-todo");
const createTodo = document.querySelector(".create-todo");
const saveTodo = document.querySelector(".save-todo");
const todoList = document.querySelector(".todo-list");
const clearTodoList = document.querySelector(".clear-todo");

let todos = []

// Functions
todoInput.focus()

const checkTodoItem = (e) => {
    const item = e.target
    const todo = item.parentElement
    todo.classList.toggle('completed')
}

const saveTodoItem = (e,i) => {
    if(todoInput.value === "") {
        return 
    }
    let saveTodo = todos.filter((todo,index) => {
        return todo.index === i
    })
    saveTodo[0].todoItem = todoInput.value
    localStorage.setItem('todo',JSON.stringify(todos))
    saveTodo.style.display = "none"
    createTodo.style.display = "block"
}

const updateTodoItem = (e, i) => {
    let todosArray = localStorage.getItem("todo")
    let todos = JSON.parse(todosArray)
    let updatedTodo = todos.filter((todo,index) => {
        return todo.index === i
    })
    console.log(updatedTodo[0].todoItem)
    todoInput.value = updatedTodo[0].todoItem
    createTodo.style.display = "none"
    saveTodo.style.display = "block"
    todoInput.focus()
    saveTodo.onclick = (e) => {saveTodoItem(e, i)}
}

const deleteTodoItem = (e, i) => {
    const item = e.target
    const todo = item.parentElement
    todos = todos.filter((todo,index) => {
        return todo.index !== i
    })
    todo.remove()
    localStorage.setItem('todo',JSON.stringify(todos))
}

const createTodoItem = (input, i) => {
    // Todo Div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    // Create Complete Todo Button
    const checkboxBtn = document.createElement("button")
    checkboxBtn.innerHTML = '<i class="fa fa-check-square"></i>'
    checkboxBtn.classList.add("check-todo")
    checkboxBtn.onclick = (e) => {checkTodoItem(e)}
    todoDiv.appendChild(checkboxBtn)

    // Create Update Button
    const updateBtn = document.createElement("button")
    updateBtn.innerHTML = '<i class="fa fa-edit"></i>'
    updateBtn.classList.add("update-todo")
    updateBtn.onclick = (e) => {updateTodoItem(e, i)}
    todoDiv.appendChild(updateBtn)

    // Create Delete Button
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    deleteBtn.onclick = (e) => {deleteTodoItem(e, i)}
    deleteBtn.classList.add("delete-todo")
    todoDiv.appendChild(deleteBtn)

    // Create Todo Li
    const newTodo = document.createElement("li")
    newTodo.innerText = input
    newTodo.setAttribute("index", i)
    newTodo.classList.add("todo-item")  
    todoDiv.appendChild(newTodo)

    // Append to To-Do List
    todoList.appendChild(todoDiv)
}

const showTodo = () => {
    let todosArray = localStorage.getItem("todo")
    if(todosArray === null) {
        todos = []
    } else {
        todos = JSON.parse(todosArray)
    }

    todos && todos.forEach((todo,index) => {
        createTodoItem(todo.todoItem, todo.index)
    })
}

const addTodo = (event) => {
    event.preventDefault()

    let todoInputValue = todoInput.value
    
    if(todoInput.value === "") {
        return 
    }

    let newTodo = {todoItem: todoInputValue, index: Math.floor(Math.random() * 10000)}
    todos = [...todos, newTodo]
    localStorage.setItem('todo',JSON.stringify(todos))

    createTodoItem(newTodo.todoItem,newTodo.index)

    // Clear ToDo input value
    todoInput.value = ""
    todoInput.focus()
}

// Function Call
showTodo()

// Event Listeners
createTodo.addEventListener("click", addTodo)
