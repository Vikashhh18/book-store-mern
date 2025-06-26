import { Order } from "./order.model.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body); 
    const savedOrder = await newOrder.save();
    res.status(201).send(savedOrder);
  } catch (error) {
    res.status(400).send({ message: "Something went wrong", error });
}
};


export const getOrderByEmail=async(req,res)=>{
    try {
        const {email}=req.params;
        const order=await Order.find({email}).sort({createdAt:-1});
        res.status(201).send(order);
        
    } catch (error) {
        res.status(400).send({ message: "Something went wrong", error });
    }
}