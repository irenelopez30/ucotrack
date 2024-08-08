import { Email } from './Email';
export declare class Usuario {
    id: string;
    nombre: string;
    correo: Email;
    contrase_a: string;
    constructor(nombre: string, correo: string, contrase_a: string, id?: string);
    toDTO(): {
        id: string;
        nombre: string;
        correo: string;
        contrase_a: string;
    };
}
