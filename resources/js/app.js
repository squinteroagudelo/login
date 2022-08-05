document.addEventListener("DOMContentLoaded", handlerCarga);

// Load handler
function handlerCarga() {

    // Default alert - Mixing
    const toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        customClass: {
            actions: 'justify-content-around m-0'
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    // Checking instructions alert
    document.getElementById('help_btn').addEventListener('click', () => {
        let pass = document.getElementById('password').value;
        let minLength = pass.length >= 8 ? 'text-success' : 'text-danger';
        let minUpperCase = /(?:[A-Z]{1,})/.test(pass) ? 'text-success' : 'text-danger';
        let minLowerCase = /(?:[a-z]{1,})/.test(pass) ? 'text-success' : 'text-danger';
        let minNumber = /(?:[0-9]{1,})/.test(pass) ? 'text-success' : 'text-danger';

        // Show - Hide instructions alert
        toast.fire({
            position: 'top',
            html: `<div class="${minLength} msg-validate"><i class="fa-solid ${minLength == 'text-success' ? 'fa-check' : 'fa-times'} me-2" id="minLength"></i><span>Mínimo 8 caracteres</span></div>
                        <div class="${minUpperCase} msg-validate"><i class="fa-solid ${minUpperCase == 'text-success' ? 'fa-check' : 'fa-times'} me-2" id="minUpperCase"></i><span>Al menos 1 letra MAYÚSCULA</span></div>
                        <div class="${minLowerCase} msg-validate"><i class="fa-solid ${minLowerCase == 'text-success' ? 'fa-check' : 'fa-times'} me-2" id="minLowerCase"></i><span>Al menos 1 letra minúscula</span></div>
                        <div class="${minNumber} msg-validate"><i class="fa-solid ${minNumber == 'text-success' ? 'fa-check' : 'fa-times'} me-2" id="minNumber"></i><span>Al menos 1 número</span></div>`,
            showConfirmButton: true,
            confirmButtonColor: '#015a4b',
            // timer: 5000
        });
    });

    // Setting up eye icons
    for (let icon of document.getElementsByClassName('show-hide')) {
        icon.addEventListener('click', () => {
            if (icon.classList.contains('fa-eye')) {
                // Showing input content 
                icon.previousElementSibling.type = 'text';
                icon.setAttribute('title', 'Ocultar')
                icon.classList.add('fa-eye-slash');
                icon.classList.remove('fa-eye');
            } else {
                // Hiding input content
                icon.previousElementSibling.type = 'password';
                icon.setAttribute('title', 'Mostrar')
                icon.classList.add('fa-eye');
                icon.classList.remove('fa-eye-slash');
            }
        })
    }

    for (let input of document.getElementsByClassName('inputs-icon')) {

        // Avoid copy event
        input.addEventListener('copy', function (e) {
            if (input.id !== 'user') {
                e.preventDefault();
                toast.fire({
                    icon: 'error',
                    title: 'Acción no permitida',
                    timer: 1000
                });
            }
        });

        // Avoid paste event
        input.addEventListener('paste', function (e) {
            if (input.id !== 'user') {
                e.preventDefault();
                toast.fire({
                    icon: 'error',
                    title: 'Acción no permitida',
                    timer: 1000
                });
            }
        });

        // Setting up interactivity and validation
        input.addEventListener('input', () => {
            if (!input.value) {
                document.getElementById('send_btn').setAttribute('disabled', true);
                if (input.id === 'user') {
                    document.getElementById('password').setAttribute('disabled', '');
                } else {
                    input.nextElementSibling.classList.add('pe-none');
                    for (let div of document.getElementsByClassName('msg-validate')) {
                        div.classList.add('text-danger');
                        div.querySelector('i').classList.add('fa-times');
                        div.querySelector('i').classList.remove('fa-check');
                    }
                }
            } else {
                if (input.id === 'user') {
                    if (input.value.length > 4) {
                        document.getElementById('password').removeAttribute('disabled');
                        if (validatePass(document.getElementById('password').value))
                            document.getElementById('send_btn').removeAttribute('disabled');
                    } else {
                        document.getElementById('password').setAttribute('disabled', '');
                        document.getElementById('send_btn').setAttribute('disabled', '');
                    }
                } else {
                    // Enabling eye icon mouse events
                    input.nextElementSibling.classList.remove('pe-none');

                    // Getting alert container - is exists -> bool
                    let alertExists = swal.getContainer();
                    if (validatePass(input.value)) {
                        document.getElementById('send_btn').removeAttribute('disabled');
                        if (alertExists) {
                            document.getElementById('minLength').parentNode.classList.add('text-success');
                            document.getElementById('minLength').parentNode.classList.remove('text-danger');
                            document.getElementById('minLength').classList.add('fa-check');
                            document.getElementById('minLength').classList.remove('fa-times');
                        }
                    } else {
                        document.getElementById('send_btn').setAttribute('disabled', true);
                    }

                    if (alertExists) {
                        // Checking minLength
                        if (input.value.length >= 8) {
                            document.getElementById('minLength').classList.add('fa-check');
                            document.getElementById('minLength').classList.remove('fa-times');
                            document.getElementById('minLength').parentNode.classList.add('text-success');
                            document.getElementById('minLength').parentNode.classList.remove('text-danger');
                        } else {
                            document.getElementById('minLength').classList.add('fa-times');
                            document.getElementById('minLength').classList.remove('fa-check');
                            document.getElementById('minLength').parentNode.classList.add('text-danger');
                            document.getElementById('minLength').parentNode.classList.remove('text-success');
                        }

                        /* RegEx validations */
                        // Checking lowercase letters
                        if (/(?:[a-z]{1,})/.test(input.value)) {
                            document.getElementById('minLowerCase').classList.add('fa-check');
                            document.getElementById('minLowerCase').classList.remove('fa-times');
                            document.getElementById('minLowerCase').parentNode.classList.add('text-success');
                            document.getElementById('minLowerCase').parentNode.classList.remove('text-danger');
                        } else {
                            document.getElementById('minLowerCase').classList.add('fa-times');
                            document.getElementById('minLowerCase').classList.remove('fa-check');
                            document.getElementById('minLowerCase').parentNode.classList.add('text-danger');
                            document.getElementById('minLowerCase').parentNode.classList.remove('text-success');
                        }

                        // Checking uppercase letters
                        if (/(?:[A-Z]{1,})/.test(input.value)) {
                            document.getElementById('minUpperCase').classList.add('fa-check');
                            document.getElementById('minUpperCase').classList.remove('fa-times');
                            document.getElementById('minUpperCase').parentNode.classList.add('text-success');
                            document.getElementById('minUpperCase').parentNode.classList.remove('text-danger');
                        } else {
                            document.getElementById('minUpperCase').classList.add('fa-times');
                            document.getElementById('minUpperCase').classList.remove('fa-check');
                            document.getElementById('minUpperCase').parentNode.classList.add('text-danger');
                            document.getElementById('minUpperCase').parentNode.classList.remove('text-success');
                        }

                        // Checking numbers
                        if (/\d+/g.test(input.value)) {
                            document.getElementById('minNumber').classList.add('fa-check');
                            document.getElementById('minNumber').classList.remove('fa-times');
                            document.getElementById('minNumber').parentNode.classList.add('text-success');
                            document.getElementById('minNumber').parentNode.classList.remove('text-danger');
                        } else {
                            document.getElementById('minNumber').classList.add('fa-times');
                            document.getElementById('minNumber').classList.remove('fa-check');
                            document.getElementById('minNumber').parentNode.classList.add('text-danger');
                            document.getElementById('minNumber').parentNode.classList.remove('text-success');
                        }
                    }
                }
            }
        });
    }

    // Listening keyup event
    /*document.getElementById('user').addEventListener('keyup', (e) => {
        let el = e.target;
        let value = el.value;
        let exp = /^\d+$/;

        if(value !== '') {
            if (exp.test(value)) {
                el.value = formatThousandsS(value);
                el.ariaLabel = value;
                document.getElementById('calculated').value = formatThousandsE(value / 30);
            } else {
                el.value = el.ariaLabel;
            }
        } else {
            el.ariaLabel = value;
            document.getElementById('calculated').value = formatThousandsE(0);
        }
    });*/

    // Listening keyup event
    /*document.getElementById('user').addEventListener('keyup', (e) => {
        // Initialising aria-label attribute
        if (e.target.value === '') e.target.ariaLabel = '';

        // RegEx: only letters
        let exp = /[a-zA-Z]/;

        // Validating typed char
        if (!exp.test(e.key)) {
            e.target.ariaLabel += e.key;
            e.target.ariaLabel = removeSpecialChars(e.target.ariaLabel);
        } else {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                e.target.ariaLabel = e.target.ariaLabel.slice(0, -1);
            }
        }

        // Formatting input value and assigning clculated value
        e.target.value = extendedFormatCurrency(Number(e.target.ariaLabel), 0);
        document.getElementById('calculated').value = extendedFormatCurrency(e.target.ariaLabel / 30);
    });*/

    document.getElementById('user').addEventListener('keyup', (e) => {
        let el = e.target;
        // Initialising aria-label attribute
        if (el.value === '') el.ariaLabel = '';

        // RegEx: only letters
        let exp = /[a-zA-Z]/;

        // Validating typed char
        if (exp.test(e.key)) {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                el.ariaLabel = removeSpecialChars(el.value);
                el.value = el.ariaLabel;
            }
        } else {
            el.ariaLabel = removeSpecialChars(el.value);
            el.value = el.ariaLabel;
        }

        // Formatting input value and assigning calculated value
        el.value = extendedFormatCurrency(Number(el.ariaLabel), 0);
        document.getElementById('calculated').value = extendedFormatCurrency(el.ariaLabel / 30);
    });

    // Listening submit event on login form
    document.getElementById('login_form').addEventListener('submit', (e) => {
        // Avoid default behavior
        e.preventDefault();

        // Storing form data in a FormData instance
        let form = new FormData(e.target);

        e.target.reset();
        e.submitter.setAttribute('disabled', '');
        e.target.querySelector('#password').setAttribute('disabled', '');
        e.target.querySelector('#password').nextElementSibling.classList.add('pe-none');

        $.ajax({
            url: "./util/login.php",
            type: "POST",
            data: form,
            processData: false,
            contentType: false,
            beforeSend: function (objeto) {
            },
            success: function (data) {
                if (data != 'error') {
                    window.location.href = data;
                } else {
                    Swal.fire({
                        position: 'top',
                        icon: 'error',
                        title: 'Please check login details.',
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            }
        });
    });
}

// Function to check form fields
const validatePass = (pass) => {
    let pattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return pattern.test(pass);
}