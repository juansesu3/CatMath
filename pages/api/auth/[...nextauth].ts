/*import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import NextAuth, { SessionStrategy, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
// Correctly type the email parameter
const isAdminEmails = async (name: string): Promise<boolean> => {
  // Return true immediately (for testing? Remove if not needed)
  // Remove this line to use the function normally

  // Check if a user with the given email is an admin
  return !!(await User.findOne({ name: name }));
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // Define the fields you expect to receive here for the login form
        // e.g., name and password inputs
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const name = credentials?.name;
        const password = credentials?.password;
        if (!name || !password) {
          // Handle case where either name or password is not provided
          return null;
        }
        try {
          await mongooseConnect();
          const user = await User.findOne({ name }).exec(); // Use exec() for proper promise handling in Mongoose
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user; // Return the user object to be used by NextAuth
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy, // Explicitly type 'jwt' as SessionStrategy
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/tableStart",
  },
};

export default NextAuth(authOptions);
export const isAdminRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    // Ensure that session is present and user is authenticated
    if (!session || !session.user) {
      res.status(401).end("Not authenticated");
      return;
    }

    // You can now access session.user.name and other properties

    // Since session?.user?.email might not be present, you need to verify and throw an error accordingly.
    // Note that you're using 'session?.user?.email' but ensure that you're using the correct property that your session object has.
    // If 'name' is what you should be checking against, adjust accordingly.
    if (!(await isAdminEmails(session.user.name || ''))) {
      res.status(401).end("Not an admin");
      return; // Return to prevent further execution
    }

    // ...rest of the admin-specific logic
  } catch (error) {
    console.error("Error in isAdminRequest:", error);
    res.status(500).end("Internal Server Error");
  }
};
*/


import NextAuth, { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
const isAdminEmails = async (name: string): Promise<boolean> => {
  // Return true immediately (for testing? Remove if not needed)
  // Remove this line to use the function normally
  mongooseConnect()
return true 
  // Check if a user with the given email is an admin
  return !!(await User.findOne({ name: name }));
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
const handler = NextAuth(authOptions);
export default handler;

export const isAdminRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, authOptions);

    // Ensure that session is present and user is authenticated
    if (!session || !session.user) {
      res.status(401).end("Not authenticated");
      return;
    }

    // You can now access session.user.name and other properties

    // Since session?.user?.email might not be present, you need to verify and throw an error accordingly.
    // Note that you're using 'session?.user?.email' but ensure that you're using the correct property that your session object has.
    // If 'name' is what you should be checking against, adjust accordingly.
    if (!(await isAdminEmails(session.user.name || ''))) {
      res.status(401).end("Not an admin");
      return; // Return to prevent further execution
    }

    // ...rest of the admin-specific logic
  } catch (error) {
    console.error("Error in isAdminRequest:", error);
    res.status(500).end("Internal Server Error");
  }
};