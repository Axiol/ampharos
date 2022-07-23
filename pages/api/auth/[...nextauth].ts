import NextAuth from 'next-auth/next';
import TwitterProvider from 'next-auth/providers/twitter';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
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
});
