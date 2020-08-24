/*
  All App validations defined here.
  Rakesh Gujari
*/

export default class AppValidations {

    validateEmail(value){
    var regexp  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(regexp.test(value)){
        return '';
    }
    return 'Please enter a Valid Email.';
    }

    isValidUsername(value) {
    var regx = /^[A-Za-z0-9_]{5,25}$/;
    return (regx.test(value))
    }

    isStrongPassword(value) {
    var regx = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return (regx.test(value))
    }


    isNumeric(value){
        var numericExpression = /^[-]?\d*\.?\d*$/;
        return (value.toString().match(numericExpression))
    }

    isEmpty(value){
    return (value.toString().length > 0)
    }

    checkPhone(value){
            return (this.isNumeric(value) && value.length==10) 
    }
}
