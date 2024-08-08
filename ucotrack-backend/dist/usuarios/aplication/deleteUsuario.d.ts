import { UsuarioRepository } from '../domain/usuarioRepository';
export declare class DeleteUsuarioById {
    private repository;
    constructor(repository: UsuarioRepository);
    execute(id: string): Promise<boolean>;
}
export default DeleteUsuarioById;
