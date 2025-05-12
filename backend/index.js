import express from "express";
import cors from "cors";
import "dotenv/config";
import signupRouter from "./api/signup_Api.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { profileDataRouter } from "./api/user_profile_data.js";
import { loginRouter } from "./api/login_Api.js";
import { logoutRoute } from "./api/logout.js";
import { contact_Router } from "./api/contact-message.js";
import { connectDB } from "./config/dbConnection.js";
import mongoose from "mongoose";
import { worker_profile_router } from "./api/worker_profile.js";
import { worker_shop_data } from "./api/hire.js";
import { contactMessageRouter } from "./api/messages.js";
import { orderRouter } from "./api/orderProposal.js";
const app = express();
app.use(
  cors({
    origin: `${process.env.FRONTEND}`,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.SECURE === "production",
      maxAge: null,
    },
  })
);
connectDB("UserSignupData");
async function test() {
  try {
    await mongoose.connection
      .collection("contactMessage")
      .insertOne({
        userName: "Muhammad SUbhan Nadeem",
        userEmail: "sn9273671@gmail.com",
        contactMsg: "My Name is Muhammad Subhan",
      });
    console.log("success");
  } catch (error) {
    console.log(error);
  }
}
test();
app.use(signupRouter);
app.use(contact_Router);
app.use(loginRouter);
app.use(profileDataRouter);
app.use(worker_profile_router);
app.use(worker_shop_data);
app.use(contactMessageRouter);
app.use(orderRouter);
app.use(logoutRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server is Running on http://localhost:${process.env.PORT}`);
});