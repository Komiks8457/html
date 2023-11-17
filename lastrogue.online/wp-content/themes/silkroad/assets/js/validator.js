$ = jQuery;
userid_passed = false,
userpw_passed = false,
email_passed = false;

$('#userid').keyup(function () {
    var usernameValue = $(this).val(),
        usernameLength = $(this).val().length,
        usernameRegex = /^[a-zA-Z0-9]+$/;
    setTimeout(function () {
        if (usernameRegex.test(usernameValue) && usernameValue != '' && $('#userid').val() == usernameValue) {
            if (usernameLength < 5) {
                $('#userid-error').html('<span style="color:#F44336">Username must be greater than 4 characters.</span>');
            } else if (usernameLength > 16) {
                $('#userid-error').html('<span style="color:#F44336">Username cant be greater than 16 characters.</span>');
            } else {
                $.ajax({
                    type: "POST",
                    url: "/wp-json/v1/sr/signup/validation",
                    data: { username: usernameValue },
                    beforeSend: function () { $('#userid-error').html('<span class="spinner"></span>') },
                    success: function (r) {
                        if (r.indexOf('available') > -1) {
                            userid_passed = true;
                        }
                        else userid_passed = false;

                        if (userpw_passed && email_passed && userid_passed) {
                            $('#submit-btn').prop("disabled", false);
                        } else {
                            $('#submit-btn').prop("disabled", true);
                        }

                        $('#userid-error').html(r);
                    }
                });
            }
        }
    }, 1000);
});

$('#userpw').keyup(function () {
    var passwordVal = $(this).val(),
        passwordLen = $(this).val().length;
    setTimeout(function () {
        if (passwordVal != '' && $(this).val() == passwordVal) {
            if (passwordLen < 5) {
                $('#userpw-error').html('<span style="color:#F44336">Password must be greater than 4 characters.</span>');
            } else if (passwordLen > 16) {
                $('#userpw-error').html('<span style="color:#F44336">Password cant be greater than 16 characters.</span>');
            } else {
                $('#userpw-error').html('<span style="color:#F44336"></span>');
            }
        }
    }, 1000);
});

$('#passconf').keyup(function () {
    var passconfVal = $(this).val(),
        passwordVal = $('#userpw').val();
    setTimeout(function () {
        if (passconfVal != '') {
            if (passconfVal != passwordVal) {
                $('#passconf-error').html('<span style="color:#F44336">Password does not match.</span>');
                userpw_passed = false;
            } else {
                $('#passconf-error').html('<span style="color:#F44336"></span>');
                userpw_passed = true;
            }
            if (userid_passed && userpw_passed && email_passed) {
                $('#submit-btn').prop("disabled", false);
            } else {
                $('#submit-btn').prop("disabled", true);
            }
        }
    }, 1000);
});

$('#email').keyup(function () {
    var emailVal = $(this).val(),
        emailLen = $(this).val().length;
    setTimeout(function () {
        if (emailVal != '' && emailLen > 5) {
            $.ajax({
                type: "POST",
                url: "/wp-json/v1/sr/signup/validation",
                data: { email: emailVal },
                beforeSend: function () { $('#email-error').html('<span class="spinner"></span>') },
                success: function (r) {
                    if (r.indexOf('available') > -1) {
                        email_passed = true;
                    }
                    else email_passed = false;

                    if (userid_passed && userpw_passed && email_passed) {
                        $('#submit-btn').prop("disabled", false);
                    } else {
                        $('#submit-btn').prop("disabled", true);
                    }

                    $('#email-error').html(r);
                }
            });
        }
    }, 1000);
});

$('#verify-game-account').click(function(e) {
    var g_useridVal = $('#g-userid').val(),
        g_userpwVal = $('#g-userpw').val(),
        email2Val = $('#g-email').val(),
        g_useridRegex = /^[a-zA-Z0-9]+$/;
    if (g_useridRegex.test(g_useridVal) && g_userpwVal != '' && email2Val != '') {
        $.ajax({
            type: "POST",
            url: "/wp-json/v1/sr/signup/validation",
            data: { userid:g_useridVal,userpw:g_userpwVal,email2:email2Val },
            beforeSend: function () { $('#g-validation-error').html('<span class="spinner"></span>') },
            success: function (r) {
                $('#g-validation-error').html(r);
            }
        });
    }
});

$('#tos').click(function () {
    $(this).is(':checked', function () {
        $.notify('asdasd');
    });
});

