
import NextAuth, { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
const isAdminEmails = async (email: string): Promise<boolean> => {
  mongooseConnect()
  return !!(await User.findOne({ email: email }));
};

const authOptions ={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (await isAdminEmails(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};
export default NextAuth(authOptions);

export const isAdminRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user) {
      res.status(401).end("Not authenticated");
      return;
    }
    if (!(await isAdminEmails(session.user.email || ''))) {
      res.status(401).end("Not an admin");
      return; 
    }

  } catch (error) {
    console.error("Error in isAdminRequest:", error);
    res.status(500).end("Internal Server Error");
  }
};