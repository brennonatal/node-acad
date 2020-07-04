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

$(document).ready(function () {
    $('#amount').mask('000000000000000.00', { reverse: true });
    // $('#amount').mask("#.##0,00", { reverse: true });
})

// $('.modal').on('hidden.bs.modal', function () {
//     $(this).find('form')[0].reset()
// })