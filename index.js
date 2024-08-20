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
    let index = 0
    for (let mood of mood_list) {
        let mood_container = document.getElementById('mood_container')
        let input = `
            <input type="radio" name="mood_selection" id="${mood}" value="happy">
            <label for="${mood}"><img src="assets/images/${mood}-outlined.svg" class="mood-img"></label>
        `
        mood_container.innerHTML += input
        index++
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
            console.log(`Selected mood ${radio.id}`)
        } else {
            let asset_string = `assets/images/${radio.id}-outlined.svg` // TODO: optimize asset_string
            document.querySelector(`label[for="${radio.id}"] img`).src = asset_string
        }
    }
}
let addTask = () => {
    let task_list_container = document.getElementById('task_list')
    let new_task = document.getElementById('new_task')
    if(new_task.value !== ''){
        let task = `
            <li>${new_task.value} <input type="button" value="Delete task" data-id="${task_list.length}" onclick="deleteTask(${task_list.length})"></li>
        `
        task_list_container.innerHTML += task
        task_list.push(new_task.value)
        new_task.value = ''
    }
    console.log('Adding task: ', task_list.length)
    console.log('task_list: ', task_list)
}
let deleteTask = (id) => {
    console.log('Delete task with id: ', id)
    let task_li = document.querySelector(`input[data-id="${id}"]`).parentElement
    let task_btn = document.querySelector(`input[data-id="${id}"]`)
    let task_id = Number(task_btn.getAttribute('data-id'))
    console.log('Id gotten', task_id)
    task_li.remove()
    console.log('task_li: ', task_li.textContent)
    for (let index in task_list)
        if (task_li.textContent.includes(task_list[index]))
            task_list.splice(index, 1)
    console.log('task_list: ', task_list)
}
let renderInitialTask = () => {
    let task_list_container = document.getElementById('task_list')
    let index = 0
    for (let task of task_list) {
        new_task = `<li>${task} <input type="button" value="Delete task" data-id="${index}" onclick="deleteTask(${index})"></li>`
        task_list_container.innerHTML += new_task
        index++
    }
}
document.getElementById('add_task_btn').addEventListener('click', addTask)
show_moods()
renderInitialTask()