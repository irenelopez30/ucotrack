import { UsuarioRepository } from '../domain/usuarioRepository';
import { Usuario } from '../domain/usuario';
export declare class GetUsuario {
    private repository;
    constructor(repository: UsuarioRepository);
    execute(id: string): Promise<Usuario>;
}
export default GetUsuario;
