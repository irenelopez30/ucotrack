import { UsuarioRepository } from '../domain/usuarioRepository';
import { Usuario } from '../domain/usuario';
export declare class GetUsuarios {
    private repository;
    constructor(repository: UsuarioRepository);
    execute(): Promise<Usuario[]>;
}
export default GetUsuarios;
