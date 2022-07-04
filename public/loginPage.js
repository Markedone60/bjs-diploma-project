'use strict';

const userForm = new UserForm;

userForm.loginFormCallback = function(data){
    ApiConnector.login((data), response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage('Ошибка авторизации');
        }
    })
}

userForm.registerFormCallback = function(data){
    ApiConnector.register((data), response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage('Ошибка регистрации');
        }
    })
} 

/*
ApiConnector.login({login:"oleg@demo.ru", password: "demo"}, response => console.log(Response));
ApiConnector.logout(response => console.log(response));
*/