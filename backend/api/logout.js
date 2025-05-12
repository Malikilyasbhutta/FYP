import express from "express";
import { z } from "zod";
import { setCookie } from "../setups/cookie_sessoin.js";
export const logoutRoute = express.Router();
logoutRoute.get('/logout', (req, res) => {
    let logout_req = req.query;
    if (logout_req.logout === 'true') {   
        setCookie('userEmail', '', true, process.env.SECURE === 'production', -1 * (3600 * 5), res);
        setCookie('userName', '', true, process.env.SECURE === 'production', -1 * (3600 * 5), res);
        res.status(200).json({ success: true, message: 'Logout successful' });
    } else{
        res.status(200).json({ success: false, message: 'Logout Failed' });
    }
})