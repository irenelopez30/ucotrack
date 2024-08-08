import { v4 as uuidv4, validate } from 'uuid';

import { Email } from './Email';

export class Usuario{

    id: string;
    nombre: string;
    correo: Email;
    contrase_a: string;

    constructor(nombre: string, correo: string, contrase_a: string,id?:string){
        this.id=(id && validate(id)) ? id : uuidv4();
        this.nombre = nombre;
        this.contrase_a=contrase_a;
        this.correo = new Email(correo);
    }

    toDTO(){
        return {
            id: this.id,
            nombre: this.nombre,
            correo: this.correo.getValue(),
            contrase_a: this.contrase_a,
        }
    }
}