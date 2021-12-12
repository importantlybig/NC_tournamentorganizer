const isEmpty = (inputValue, inputType) => {
    if (inputValue.trim() === "") {
      return true;
    }
    return false;
  };
  const isPasswordContentValid = (firstName, lastName, password) => {
    if (password === firstName || password === lastName) {
      return false;
    }
    return true;
  }

  const isPasswordLengthValid = (password)=>{
    if(password.length <= 8){
        return false
    }
    return true
  }

  const isRePasswordMatch = (password,rePassword)=>{
    if(password !== rePassword){
        return false
    }
    return true
  }

  const isEmailValid = (email) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
      return false;
    }
    return true;
  }


export  {
      isEmailValid,
      isRePasswordMatch,
      isPasswordLengthValid,
      isPasswordContentValid,
      isEmpty}