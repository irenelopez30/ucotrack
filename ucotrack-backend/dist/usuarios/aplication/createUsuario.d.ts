import { UsuarioRepository, Usuario } from "../domain";
export declare class CreateUsuario {
    private repository;
    constructor(repository: UsuarioRepository);
    execute(userData: {
        nombre: string;
        correo: string;
        contraseña: string;
    }): Promise<Usuario>;
}
