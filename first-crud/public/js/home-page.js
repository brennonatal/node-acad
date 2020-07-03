let dark = document.getElementById('darkSwitch');
let icon = $('#iconMode')

function changeIcon() {
    if (dark.checked) {
        icon.removeClass('fa-moon-o')
        icon.addClass('fa-sun-o')
    } else {
        icon.removeClass('fa-sun-o')
        icon.addClass('fa-moon-o')
    }
}

function setIcon() {
    if (dark.checked) {
        icon.addClass('fa-moon-o')
    } else {
        icon.addClass('fa-sun-o')
    }

}