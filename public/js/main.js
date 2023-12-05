// Displaying Modal
$('#startup-lead').change(function () {
    $('.modal').modal('show');
});

// Displaying the message box in the startup page
$('#message').on('click', function () {
    $('#st-message').toggle();
});

// Displaying the notification box
$('#notification-btn').on('click', function () {
    $('.notification-box').toggle();
});

// Displaying the messages
$('#reply-btn').on('click', function () {
    $('#message-read').toggle();
    $('#message-send').toggle();
    console.log('i was clicked');
});

// Displaying the free register block
$('#btn-reg').on('click', function (e) {
    e.preventDefault();
    $('#register-free').toggle();
    $(this).hide();
});

// Displaying the payed register block
$('#btn-reg-pay').on('click', function (e) {
    e.preventDefault();
    $('#register-pay').toggle();
    $(this).hide();
});