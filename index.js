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
let task_list = [
    'Task 1',
    'Task 2',
    'Task 3',
]
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
let renderTasks = () => {
    let task_list_container = document.getElementById('task_list')
    let index = 0
    for (let task of task_list) {
        new_task = `<li data-index="${index}">${task} <input type="button" value="Delete task" onclick="deleteTask(${index})"></li>`
        task_list_container.innerHTML += new_task
        index++
    }
}
let dropTasks = () => {
    let task_list_container = document.getElementById('task_list')
    task_list_container.innerHTML = ''
}
let addTask = () => {
    text_input = document.getElementById('new_task')
    if (text_input.value === '') return
    dropTasks()
    task_list.push(text_input.value)
    renderTasks()
    text_input.value = ''
}
let deleteTask = (id) => {
    dropTasks()
    task_list.splice(id, 1)
    renderTasks()
}
document.getElementById('add_task_btn').addEventListener('click', addTask)
show_moods()
renderTasks()