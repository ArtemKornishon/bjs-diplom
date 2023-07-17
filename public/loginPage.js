"use strict";

const UsersForm = new UserForm();

UsersForm.loginFormCall = (data) => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            console.log(response.error);
            UsersForm.setLoginErrorMessage(response.error);
        }
    })
}

UsersForm.registerFormCallback = (data) => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            console.log(response.error);
            UsersForm.setRegisterErrorMessage(response.error); 
        }
    })
}