"use strict";

const objUserForm = new UserForm();

objUserForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    if (response.success){
      return location.reload()
    } 
    return objUserForm.setLoginErrorMessage(response.error)
  })
} 

objUserForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
      if (response.success){
      return location.reload()
    } 
    return objUserForm.setRegisterErrorMessage(response.error)
  })
};


