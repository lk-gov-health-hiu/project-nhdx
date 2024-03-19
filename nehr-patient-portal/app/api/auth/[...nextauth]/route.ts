import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "asgardeo",
      name: "Asgardeo",
      clientId: process.env.ASGARDEO_CLIENT_ID,
      clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
      issuer: process.env.ASGARDEO_ISSUER,
      userinfo: `https://api.asgardeo.io/t/${process.env.ASGARDEO_ORGANIZATION_NAME}/oauth2/userinfo`,
      type: "oauth",
      wellKnown: `https://api.asgardeo.io/t/${process.env.ASGARDEO_ORGANIZATION_NAME}/oauth2/token/.well-known/openid-configuration`,
      authorization: {
        params: { scope: "openid profile fhirUser launch/patient" },
      },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.idToken = token.idToken;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.accessToken = account.access_token!;
        token.idToken = account.id_token!;
      }

      if (profile) {
        token.username = profile.username!;
      }

      return token;
    },
  },
  debug: false,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

declare module "next-auth/jwt" {
  interface JWT {
    provider: string;
    idToken: string;
    accessToken: string;
    username: string;
  }
}

declare module "next-auth" {
  interface User {
    idToken?: string;
    username?: string;
  }

  interface Profile {
    username?: string;
  }

  interface Session {
    user: User;
  }
}
