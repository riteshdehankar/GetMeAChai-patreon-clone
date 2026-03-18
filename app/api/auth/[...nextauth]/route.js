//import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account.provider === "github") {
          await connectDb()

          // fallback email (GitHub sometimes doesn't provide email)
          const email =
            user.email ||
            `${profile?.login || "user"}@github.com`

          // check user exists
          let currentUser = await User.findOne({ email })

          if (!currentUser) {
            await User.create({
              email: email,
              username:
                user.name ||
                profile?.login ||
                email.split("@")[0],
              name: user.name || profile?.login || "User",
              profilepic: user.image || "",
              coverpic: "",
              razorpayid: "",
              razorpaysecret: "",
            })
          }

          return true
        }
        return false
      } catch (error) {
        console.error("SignIn Error:", error)
        return false
      }
    },

    async session({ session }) {
      try {
        await connectDb()

        const dbUser = await User.findOne({
          email: session.user.email,
        })

        if (dbUser) {
          session.user.name = dbUser.username
        }

        return session
      } catch (error) {
        console.error("Session Error:", error)
        return session
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
