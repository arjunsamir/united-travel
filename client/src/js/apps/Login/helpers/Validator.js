const regex = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name: /^\s*([A-Za-z]{1,}([\.,] |[-']| )?)+[A-Za-z]+\.?\s*$/,
    lettersOnly: /[^A-Za-z ]+$/
}


export default class Validator {

    constructor(errors) {

        this.errors = errors;

    }

    checkEmail(val) {

        const { invalid, required } = this.errors.email;

        if (!val) return [required];
        else if (!regex.email.test(val.toLowerCase())) return [invalid];
        else return [];

    }

    checkPassword(val) {

        const { required, short } = this.errors.password;

        if (!val) return [required];
        else if (val.length < 8) return [short];
        else return []

    }

    checkName(val) {

        const { invalid, required } = this.errors.name;

        if (!val) return [required];
        else if (!regex.name.test(val)) return [invalid];
        else return []

    }

    cleanInput(val) {
        return val.replace(regex.test, '');
    }

}