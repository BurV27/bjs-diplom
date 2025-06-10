"use strict";

const objUserForm = new UserForm();

objUserForm.loginFormCallback = data => ApiConnector.login(data, callback)



