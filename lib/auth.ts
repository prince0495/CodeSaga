import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";

import { globalPrismaClient } from './prisma';

const prisma = globalPrismaClient;
export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          name: {label: 'name', type: 'text', placeholder: ''},
          username: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        async authorize(credentials: any) {
            const username = credentials?.username as string;
            const name = credentials?.name as string;

            const user = await prisma.user.findUnique({
              where: {email: username, name: name}, select: {id: true, name: true, email: true, image: true}
            })
            if(user) {
                return {id: user.id, name: user.name, email: user.email, image: user.image}
            }
            else {
              return null;
            }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
               
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async({user, account} : any) => {
      if(user && user.id && account && account.providerAccountId) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: {
              id: user.id
            }
          })
          if(!existingUser) {
            await prisma.user.create({
              data: {
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image
              }
            })
          }          
        } catch (error) {
          console.log('error1');
          console.log(error);
          return false
        }
        return true;
      } 
      else {
        console.log('user.id not found');
        return false;
      }
    },
  session: async({ session, token, user }: any) => {
      if (session.user) {
        try {
          console.log('token . => , , , ', token);
          const prisma = globalPrismaClient;
          
            const existingUser = await prisma.user.findUnique({
              where: {
                id: token.sub
              },
              select: {
                name: true,
                image: true
              }
            })
            if(existingUser) {
              session.user.name = existingUser.name;
              session.user.image = existingUser.image;
            }
        } catch (error) {
          
        }
        session.user.id = token.sub
      }
      return session
  }
},
}