

let authToken = '';

document.querySelector('#create-new-account-button')
.addEventListener('click', (event) => {
    
    // Get output texbox to display results
    const output = document.querySelector('#create-new-account .output textarea');
    output.value = '';

    // Define input
    const input = {
        name:       document.querySelector('#create-new-account-input-name').value,
        age:        document.querySelector('#update-account-input-age').value,
        email:      document.querySelector('#create-new-account-input-email').value,
        password:   document.querySelector('#create-new-account-input-password').value
    };

    const header = {
        method: 'POST', 
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': input.length
        }
    };

    // Call the action
    fetch('/users', header).then( (response) => {
        response.json().then(data => {
            if (data.errors || data.error || data.errmsg || data.statusText) {
                output.value = data.error ?? data.errors?? data.message ?? data.errmsg ?? data.statusText;
            } else{
                output.value = JSON.stringify(data);
                authToken = data.token;
                console.log(authToken);
            }
        })
    });

});



document.querySelector('#login-account-button')
.addEventListener('click', (event) => {

    // Get output texbox to display results
    const output = document.querySelector('#login-account .output textarea');
    output.value = '';

    // Define input
    const input = {
        email:      document.querySelector('#login-account-input-email').value,
        password:   document.querySelector('#login-account-input-password').value
    };
    
    const header = {
        method: 'POST', 
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': input.length
        }
    };

    // Call the action
    fetch('/users/login', header).then( (response) => {
        response.json().then(data => {
            if (data.errors || data.error || data.errmsg || data.statusText) {
                output.value = data.error ?? data.errors?? data.message ?? data.errmsg ?? data.statusText;
            } else{
                authToken = data.token;
                output.value = JSON.stringify(data);
            }
        })
    });

});



document.querySelector('#get-account-button')
.addEventListener('click', (event) => {

    // Get output texbox to display results
    const output = document.querySelector('#get-account .output textarea');
    output.value = '';

    const header = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + authToken
        }
    };

    // Call the action
    fetch('/users/me', header).then( (response) => {
        response.json().then(data => {
            if (data.errors || data.error || data.errmsg || data.statusText) {
                output.value = data.error ?? data.errors?? data.message ?? data.errmsg ?? data.statusText;
            } else{
                output.value = JSON.stringify(data);
            }
        })
    });

});

document.querySelector('#update-account-button')
.addEventListener('click', (event) => {

    // Get output texbox to display results
    const output = document.querySelector('#update-account .output textarea');
    output.value = '';

    const input = {};
    
    const name = document.querySelector('#update-account-input-name').value
    if (name) {
        input.name = name;
    }

    const age = document.querySelector('#update-account-input-age').value
    if (age) {
        input.age = age
    }

    const email = document.querySelector('#update-account-input-email').value
    if (email) {
        input.email = email
    }

    const header = {
        method: 'PATCH', 
        body: JSON.stringify(input),
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json',
            'Content-Length': input.length
        }
    };

    // Call the action
    fetch('/users/me', header).then( (response) => {
        response.json().then(data => {

            console.log(response);

            if (data.errors || data.error || data.errmsg || data.statusText) {
                output.value = data.error ?? data.errors?? data.message ?? data.errmsg ?? data.statusText;
            } else{
                output.value = JSON.stringify(data);
            }
        })
    });

});



// document.querySelector('#upload-avatar-button')
// .addEventListener('click', (event) => {


//     document.querySelector('#upload-avatar-image').

//     // Get output texbox to display results
//     const output = document.querySelector('#upload-avatar .output textarea');
//     output.value = '';

//     const header = {
//         method: 'POST', 
//         body: JSON.stringify(input),
//         headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': input.length
//         }
//     };

//     // Call the action
//     fetch('/users/me/avatar', header).then( (response) => {
//         response.json().then(data => {
//             if (data.errors || data.error || data.errmsg || data.statusText) {
//                 output.value = data.error ?? data.errors?? data.message ?? data.errmsg ?? data.statusText;
//             } else{
//                 output.value = JSON.stringify(data);
//             }
//         })
//     });

// });


// document.querySelector('#delete-avatar-button')
// .addEventListener('click', (event) => {

//     // Get output texbox to display results
//     const output = document.querySelector('#delete-avatar .output textarea');
//     output.value = '';

//     const header = {
//         method: 'DELETE', 
//         body: JSON.stringify(input),
//         headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': input.length
//         }
//     };

//     // Call the action
//     fetch('/users/me/avatar', header).then( (response) => {
//         response.json().then(data => {
//             if (data.errors || data.error || data.errmsg || data.statusText) {
//                 output.value = data.error ?? data.errors?? data.message ?? data.errmsg ?? data.statusText;
//             } else{
//                 output.value = JSON.stringify(data);
//             }
//         })
//     });

// });


document.querySelector('#logout-account-button')
.addEventListener('click', (event) => {

    // Get output texbox to display results
    const output = document.querySelector('#logout-account .output textarea');
    output.value = '';

    const header = {
        method: 'GET', 
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': input.length
        }
    };

    // Call the action
    fetch('/users/logout', header).then( (response) => {
        response.json().then(data => {
            if (data.errors || data.error || data.errmsg || data.statusText) {
                output.value = data.error ?? data.errors?? data.message ?? data.errmsg ?? data.statusText;
            } else{
                output.value = JSON.stringify(data);
            }
        })
    });

});


document.querySelector('#delete-account-button')
.addEventListener('click', (event) => {

    // Get output texbox to display results
    const output = document.querySelector('#delete-account .output textarea');
    output.value = '';

    const header = {
        method: 'DELETE', 
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': input.length,
        }
    };

    // Call the action
    fetch('/users/me', header).then( (response) => {
        response.json().then(data => {
            if (data.errors || data.error || data.errmsg || data.statusText) {
                output.value = data.error ?? data.errors?? data.message ?? data.errmsg ?? data.statusText;
            } else{
                output.value = JSON.stringify(data);
            }
        })
    });

});


// -------------------------------------