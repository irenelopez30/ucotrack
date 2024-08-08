import { UsuarioRepository ,Usuario } from "../domain";

import { PrismaClient } from '@prisma/client'

export class UsuarioMysqlController implements UsuarioRepository{
    
    private prisma:PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }

    async findById(id:string): Promise<Usuario> {
        const dbUser = await this.prisma.usuarios.findUnique({
            where: {
                id: id
            }
        });
        if(!dbUser){
            return null;
        }

        return new Usuario(dbUser.nombre,dbUser.correo,dbUser.contrase_a,dbUser.id);
    }

    async create(usuario:Usuario): Promise<Usuario>{
        const dbUser= await this.prisma.usuarios.create({
            data: {
                ...usuario.toDTO()
            }
        });

        return new Usuario(dbUser.nombre,dbUser.correo,dbUser.contrase_a,dbUser.id);

    }

    async modify(usuario: Usuario): Promise<boolean> {
        const data = {
            ...usuario.toDTO()
        };
    
        const user= await this.prisma.usuarios.update({
          where: {id : usuario.id},
          data,
        });
        return !!user;
    }
    
    async remove(id:string): Promise<boolean> {
        const usuario= await this.prisma.usuarios.delete({
            where: {
                id: id
            }
        });

        return !!usuario;
    }  

    async findAll(): Promise<Usuario[]> {
        const usuarios= await this.prisma.usuarios.findMany();
        return usuarios.map((usuario)=> new Usuario(usuario.nombre,usuario.correo,usuario.contrase_a,usuario.id));
    }

    async findByEmail(correo: string): Promise<Usuario> {
        const dbUser = await this.prisma.usuarios.findFirst({
            where: {
                correo: correo
            }
        });
        if(!dbUser){
            return null;
        }

        return new Usuario(dbUser.nombre,dbUser.correo,dbUser.contrase_a,dbUser.id);
    }

  
}