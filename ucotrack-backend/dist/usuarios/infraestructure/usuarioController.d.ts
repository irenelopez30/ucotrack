import { UsuarioRepository, Usuario } from "../domain";
export declare class UsuarioMysqlController implements UsuarioRepository {
    private prisma;
    constructor();
    findById(id: string): Promise<Usuario>;
    create(usuario: Usuario): Promise<Usuario>;
    modify(usuario: Usuario): Promise<boolean>;
    remove(id: string): Promise<boolean>;
    findAll(): Promise<Usuario[]>;
    findByEmail(correo: string): Promise<Usuario>;
}
