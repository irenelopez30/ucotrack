import { UsuarioRepository, Usuario } from "../domain";
const bcrypt = require('bcryptjs');

export class loginUser {
  constructor(private repository: UsuarioRepository) {}

  async execute(userData: { correo: string; contraseña: string; }): Promise<Usuario | null> {
    try {

      const dbUser = await this.repository.findByEmail(userData.correo);
      if (!dbUser) {
        console.log('Usuario no encontrado');
        return null;
      }

      const validPassword = bcrypt.compareSync(userData.contraseña, dbUser.contrase_a);

      if (!validPassword) {
        
        console.log('Contraseña incorrecta');
        return null;
      }

      return dbUser;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return null;
    }
  }
}
