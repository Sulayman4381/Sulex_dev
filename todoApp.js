//Lets use JavaScript to add functionality to our app
const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('#taskList')
const addTaskForm = document.querySelector('#addTaskForm')

taskList.style = `
  list-style: none;
  margin-top: 1rem;
  font-size: 1.5rem;
`
const createTaskItem = (task) => `
  <li>
    <input type="checkbox" name="task" id="item" value="${task} "onChange="toggleTaskCompletion(event)">
    <label for="task">${task}</label>
    <button type="button" onClick="removeTask(event)" id="delete">Delete</button>
    </li>
`

//Rendring saved tasks to the Browser
const storedTasks = JSON.parse(localStorage.getItem('tasks')) || []

const renderTasks = () => {
    storedTasks.forEach((task) => {
        const taskItem = createTaskItem(task)
        taskList.insertAdjacentHTML(
            'beforeend',
            taskItem)
    })
}
window.onload = renderTasks

//Adding Tasks to the list
const addTask = (event) => {
    event.preventDefault()

    const task = taskInput.value
    const taskItem = createTaskItem(task)
    taskList.insertAdjacentHTML('beforeend', taskItem)

    storedTasks.push(task)
    localStorage.setItem(
        'tasks', JSON.stringify(storedTasks)
    )
    
    addTaskForm.reset()
}

addTaskForm.addEventListener('submit', addTask)

//Marking tasks as complete
const toggleTaskCompletion = (event) => {
    const taskItem = event.target.parentElement
    const task = taskItem.querySelector('label')

    if(event.target.checked){
        task.style.textDecoration = 'line-through'
    } else{
        task.style.textDecoration = 'none'
    }
}

//Removing Tasks
const removeTask = (event) => {
    const taskItem = event.target.parentElement
    const task = taskItem.querySelector('label').innerText

    const indexOfTask = storedTasks.indexOf(task)
    storedTasks.splice(indexOfTask, 1)
    localStorage.setItem('tasks', JSON.stringify(storedTasks)
    )
    taskItem.remove()
}
