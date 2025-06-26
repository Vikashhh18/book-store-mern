import express from 'express';
import { createOrder, getOrderByEmail } from './order.controller.js';

const orderRouter=express.Router();

// api for book orders 

// placed an order 
orderRouter.post("/",createOrder)

// get all orders by email 
orderRouter.get("/email/:email",getOrderByEmail);

export default orderRouter;  