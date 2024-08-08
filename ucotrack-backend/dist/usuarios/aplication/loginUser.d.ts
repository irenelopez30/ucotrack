import { UsuarioRepository, Usuario } from "../domain";
export declare class loginUser {
    private repository;
    constructor(repository: UsuarioRepository);
    execute(userData: {
        correo: string;
        contraseña: string;
    }): Promise<Usuario | null>;
}
