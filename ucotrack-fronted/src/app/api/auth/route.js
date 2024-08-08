// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const options = {
  providers: [
    CredentialsProvider({
      // Aquí defines tu lógica de autenticación
      async authorize(credentials) {
        // Simulación de un usuario (deberías usar una base de datos real)
        const user = { id: 1, name: 'User', email: 'user@example.com' };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};

// Asignar la función a una variable antes de exportar
const authHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
