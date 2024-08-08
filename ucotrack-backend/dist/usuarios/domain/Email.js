"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor(value) {
        if (!this.isValidEmail(value)) {
            throw new Error('El correo electronico no es valido');
        }
        this.value = value;
    }
    isValidEmail(value) {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(value);
    }
    getValue() {
        return this.value;
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map