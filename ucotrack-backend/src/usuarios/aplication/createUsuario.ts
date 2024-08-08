import { UsuarioRepository, Usuario } from "../domain";
import * as uuid from 'uuid';
const bcrypt = require('bcryptjs');

export class CreateUsuario {
  constructor(private repository: UsuarioRepository) {}

  async execute(userData: {
    nombre: string;
    correo: string;
    contraseña: string;
  }): Promise<Usuario> {

    const dbUser = await this.repository.findByEmail(userData.correo);
    if(dbUser) return null;

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(userData.contraseña, salt);
    userData.contraseña=hash;

    const usuario = new Usuario(
      userData.nombre,
      userData.correo,
      userData.contraseña,
    );
    
    return await this.repository.create(usuario);
  }
}