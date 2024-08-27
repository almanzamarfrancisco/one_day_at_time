let d = new Date()
document.getElementById('date-string').innerHTML = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()

let mood_selection = document.getElementsByName('mood_selection')
let selected_radio_value = null
let mood_list = [
    'excited',
    'happy',
    'neutral',
    'frown',
    'sad',
    'angry',
]
let task_list = []
let localStorage_task_list = localStorage.getItem('task_list')
let done_tasks = []
let localStorage_done_tasks = localStorage.getItem('done_tasks')
let show_moods = () => {
    let mood_container = document.getElementById('mood_container')
    for (let mood of mood_list) {
        let input = `
            <input type="radio" name="mood_selection" id="${mood}" value="${mood}">
            <label for="${mood}"><img src="assets/images/${mood}-outlined.svg" class="mood-img"></label>
        `
        mood_container.innerHTML += input
    }
    for(let radio of mood_selection){
        radio.addEventListener('change', selectRadioButton)
    }
}
let selectRadioButton = () => {
    for(let radio of mood_selection){
        if (radio.checked) {
            selected_radio_value = radio.value
            let selector = document.querySelector(`label[for="${radio.id}"] img`)
            selector.src = `assets/images/${radio.id}-filled.svg` // TODO: optimize asset_string
        } else {
            let asset_string = `assets/images/${radio.id}-outlined.svg` // TODO: optimize asset_string
            document.querySelector(`label[for="${radio.id}"] img`).src = asset_string
        }
    }
}
let renderTaskList = () => {
    if(localStorage_task_list && !task_list.length){
        console.log('📌 ~ renderTasks ~ localStorage_task_list exists', localStorage_task_list)
        task_list = JSON.parse(localStorage_task_list)
    }
    else if (!localStorage_task_list && task_list.length){
        console.log('📌 ~ renderTasks ~ task_list exists', task_list)
        localStorage.setItem('task_list', JSON.stringify(task_list))
    } else {
        localStorage.setItem('task_list', JSON.stringify(task_list))
        console.log('📌 ~ Both exists overwrite Local Storage')
    }
    console.log('📌 ~ renderTaskList ~ Task List: ', task_list)
    let task_list_container = document.getElementById('task_list')
    let index = 0
    for (let task of task_list) {
        new_task = `<li data-index="${index}">
                        <input type="checkbox" class="done-check" ${task.done ? 'checked':''} onclick="updateDone(${index}, ${task.done?false:true})"> 
                        ${task.content}
                        <input type="button" value="X" onclick="deleteTask(${index})" class="delete-btn">
                    </li>`
        task_list_container.innerHTML += new_task
        index++
    }
    if(task_list.length === 0) task_list_container.innerHTML = 'No tasks yet'
    else {
        let clear_done_tasks = `
            <input type="button" value="Clear Done Tasks" onclick="clearDoneTasks()" class="btn">
        `
        task_list_container.innerHTML += clear_done_tasks
    }
}
let renderDoneTasks = () => {
    if(localStorage_done_tasks && !done_tasks.length){
        console.log('✅ ~ renderDoneTasks ~ localStorage_done_tasks exists', localStorage_done_tasks)
        done_tasks = JSON.parse(localStorage_done_tasks)
    }
    else if (!localStorage_done_tasks && done_tasks.length){
        console.log('✅ ~ renderDoneTasks ~ done_tasks exists', done_tasks)
        localStorage.setItem('done_tasks', JSON.stringify(done_tasks))
    } else {
        localStorage.setItem('done_tasks', JSON.stringify(done_tasks))
        console.log('✅ ~ Both exists overwrite Local Storage')
    }
    console.log('✅ ~ renderDoneTasks ~ Done Tasks: ', done_tasks)
    let done_tasks_container = document.getElementById('done_tasks')
    let index = 0
    for (let task of done_tasks) {
        new_task = `<li data-index="${index}">
                        ${task.content}
                        <input type="button" value="O" onclick="takeBackDoneTask(${index})" class="delete-btn">
                        <input type="button" value="X" onclick="deleteDoneTask(${index})" class="delete-btn">
                    </li>`
        done_tasks_container.innerHTML += new_task
        index++
    }
    if(done_tasks.length === 0) done_tasks_container.innerHTML = 'No tasks done yet'
}
let renderTasks = () => {
    renderTaskList()
    renderDoneTasks()
}
let dropTasks = () => {
    let task_list_container = document.getElementById('task_list')
    task_list_container.innerHTML = ''
    let done_tasks_container = document.getElementById('done_tasks')
    done_tasks_container.innerHTML = ''
}
let addTask = () => {
    text_input = document.getElementById('new_task')
    if (text_input.value === '') return
    dropTasks()
    task_list.push({content: text_input.value, done: false})
    renderTasks()
    text_input.value = ''
}
let deleteTask = (index) => {
    dropTasks()
    task_list.splice(index, 1)
    renderTasks()
}
let deleteDoneTask = (index) => {
    dropTasks()
    done_tasks.splice(index, 1)
    renderTasks()
}
let takeBackDoneTask = (index) => {
    dropTasks()
    task_list.push(done_tasks[index])
    done_tasks.splice(index, 1)
    renderTasks()
}
let clearDoneTasks = () => {
    dropTasks()
    done_tasks = task_list.filter(task => task.done)
    task_list = task_list.filter(task => !task.done)
    console.log('👀 ~ clearDoneTasks ~ task_list:', task_list)
    console.log('🔥 ~ clearDoneTasks ~ task_list:', task_list)
    localStorage.setItem('task_list', JSON.stringify(task_list))
    localStorage.setItem('done_tasks', JSON.stringify(done_tasks))
    renderTasks()
}
let updateDone = (index, isDone) => {
    task_list[index].done = isDone
    console.log('✅🔖 ~ updateDone ~ task_list', task_list)
    dropTasks()
    renderTasks()
}
document.getElementById('add_task_btn').addEventListener('click', addTask)
show_moods()
renderTasks()