import NextAuth from 'next-auth/next';
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID
        ? process.env.GITHUB_CLIENT_ID
        : '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET
        ? process.env.GITHUB_CLIENT_SECRET
        : '',
    }),
  ],
};

export default NextAuth(authOptions);
