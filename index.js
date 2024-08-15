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
let show_moods = () => {
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
    /* Followed format
        <input type="radio" id="happy" name="mood_selection" value="happy">
        <label for="exited">
        <img id="exited-filled" src="assets/images/exited-filled.svg" class="mood-img visible">
        </label>
    */
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
// for(let radio of mood_selection){
//     radio.addEventListener('change', selectRadioButton)
// }

let selectDay = () => {
    for(let day of days_of_week){
        if (day.checked) {
            document.querySelector(`label[for="${day.id}"]`).classList.add('selected-day')
        } else {
            document.querySelector(`label[for="${day.id}"]`).classList.remove('selected-day')
        }
    }
}
let days_of_week = document.getElementsByName('week_days')
for(let day of days_of_week){
    day.addEventListener('change', selectDay)
}
selectDay()
show_moods()