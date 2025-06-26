import express from 'express';
import { deleteBook, getAllBooks, getBook, postAbook, updateBook } from './book.controllers.js';
import { verifyAdminToken } from '../middleware/verifyAdminToken.js';

const router=express.Router();

// you use Post method when u push the data in the database;
// and you use Get method to get the data in the database
// put and patch method is just to edit the data in database

// post a book 
router.post("/create-book",verifyAdminToken,postAbook)

// get a Book
router.get("/",getAllBooks);

// get a single book detail
router.get("/:id",getBook);

router.put("/edit-book/:id",verifyAdminToken,updateBook);
// router.put("/edit-book/:id",updateBook);

router.delete("/:id",verifyAdminToken,deleteBook);


export default router;