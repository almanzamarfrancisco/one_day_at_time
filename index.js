let d = new Date()
document.getElementById('date-string').innerHTML = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()

/* Exercise: Make the mood radiobutton selection more user friendly
    when the a mood face is selected have to be the only one with a filled face
    approaches: 
    0. Proof of concept
    1. Only change the src of the image
    2. Use classes (use the styles: hidde, display or opacity)
    3. CSS only
    What would happen if the client ask the following:
        - More moods
        - Change the images
        - Change the theme
    ((Interact with the svgs?))
    => Approach 1 pseudocode:
        1) Get the images
        2) Set up a folder with the images
        3) Format the name for all the images
        4) Put the images on the page 
        5) Change the src of the images
    => Approach 2 pseudocode:
        1) Get the images
        2) Set up a folder with the images
        3) Put all the images on the page (filled and outlined)
        4) Create a class where you can interact with the classes
        5) Add/Remove the created class from the images
*/
// First approach - Change the src of the image )
let mood_selection = document.getElementsByName('mood_selection')
let selected_radio_value = null
/* let selectRadioButton = () => {
    for(let radio of mood_selection){
        if (radio.checked) {
            selected_radio_value = radio.value
            document.querySelector(`label[for="${radio.id}"] img`).src = `assets/images/${radio.id}-filled.svg` // TODO: optimize asset_string
        } else {
            let asset_string = `assets/images/${radio.id}-outlined.svg` // TODO: optimize asset_string
            document.querySelector(`label[for="${radio.id}"] img`).src = asset_string
        }
    }
} */
let selectRadioButton = () => {
    for(let radio of mood_selection){
        if (radio.checked) {
            let images = document.querySelectorAll(`label[for="${radio.id}"] img`)
            console.log(images)
            images.item(0).classList.remove('visible')
            images.item(0).classList.add('invisible')
            
            images.item(1).classList.remove('invisible')
            images.item(1).classList.add('visible')
        } else {
            let images = document.querySelectorAll(`label[for="${radio.id}"] img`)
            images.item(0).classList.remove('invisible')
            images.item(0).classList.add('visible')
            
            images.item(1).classList.remove('visible')
            images.item(1).classList.add('invisible')
        }
    }
}
for(let radio of mood_selection){
    radio.addEventListener('change', selectRadioButton)
}

let days_of_week = document.getElementsByName('week_days')
let selectDay = () => {
    for(let day of days_of_week){
        if (day.checked) {
            document.querySelector(`label[for="${day.id}"]`).classList.add('selected-day')
        } else {
            document.querySelector(`label[for="${day.id}"]`).classList.remove('selected-day')
        }
    }
}
for(let day of days_of_week){
    day.addEventListener('change', selectDay)
}
selectDay()
