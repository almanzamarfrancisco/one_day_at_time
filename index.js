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
/* Followed format
    <input type="radio" id="happy" name="mood_selection" value="happy">
    <label for="exited">
    <img id="exited-filled" src="assets/images/exited-filled.svg" class="mood-img visible">
    </label>
*/
/* let show_moods = () => {
    for(let mood of mood_list){
        let mood_container = document.getElementById('mood_container')
        let input = document.createElement('input')
        let label = document.createElement('label')
        input.setAttribute('type', 'radio')
        input.setAttribute('name', 'mood_selection')
        input.setAttribute('id', mood)
        input.setAttribute('value', mood)
        label.setAttribute('for', mood)
        let img = document.createElement('img')
        img.src = `assets/images/${mood}-outlined.svg` // TODO: optimize asset_string
        img.classList.add('mood-img')
        mood_container.appendChild(input)
        label.appendChild(img)
        mood_container.appendChild(label)
    }
    for(let radio of mood_selection){
        radio.addEventListener('change', selectRadioButton)
    }
} */
let show_moods = () => {
    for (let mood of mood_list) {
        let mood_container = document.getElementById('mood_container')
        let input = `
            <input type="radio" name="mood_selection" id="${mood}" value="happy">
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
            console.log(`Selected mood ${radio.id}`)
        } else {
            let asset_string = `assets/images/${radio.id}-outlined.svg` // TODO: optimize asset_string
            document.querySelector(`label[for="${radio.id}"] img`).src = asset_string
        }
    }
}
// let renderInitialTask
let addTask = () => {
    let task_list_container = document.getElementById('task_list')
    let new_task = document.getElementById('new_task')
    if(new_task.value !== ''){
        let task = `
            <li>${new_task.value}</li>
        `
        task_list_container.innerHTML += task
        new_task.value = ''
    }
    console.log('Task list: ', task_list)
}
document.getElementById('add_task_btn').addEventListener('click', addTask)
show_moods()