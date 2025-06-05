class UserForm {
  constructor(loginFormCallback, registerFormCallback){
    this.loginFormCallback = loginFormCallback,
    this.registerFormCallback = registerFormCallback
  }
}

class ApiConnector {
  constructor(login, password){
    this.loginUser = login;
    this.passwordUser = password;
  }

  login({login, password}, callback){
    this.loginUser = login;
    this.passwordUser = password;
    callback()
  }

  register({login, password}, callback){
    this.loginUser = login;
    this.passwordUser = password;
    callback()
  }
}

let objUserForm = new UserForm();
objUserForm.loginFormCallback = (data) => ApiConnector.loginFormCallback(data, callback)
objUserForm.registerFormCallback = (data) => ApiConnector.registerFormCallback(data, callback)