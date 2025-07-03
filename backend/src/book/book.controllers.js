import { Book } from "./book.model.js";

// post a book 
export const postAbook=async(req,res)=>{
    try {
        const newBook=await Book({...req.body});
        await newBook.save();
        res.status(201).send({
            message:"Book posted successfully",
            book:newBook,
        })
    } catch (error) {
        res.status(400).send({message:"somethign went wrong",error});
    }
}

//get all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single book detail
export const getBook=async(req,res)=>{
    try {
        const {id}=req.params;
        const book=await Book.findById(id);
        if(!book){
            res.status(404).send({message:"book not found"});
        }
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send({message:"somethign went wrong",error});
        
    }
}

// update and edit book 
export const updateBook=async(req,res)=>{
    try {
        const {id}=req.params;
        const updatedBook=await Book.findByIdAndUpdate(id,req.body,{new:true});
        if(!updatedBook){
            res.status(404).send({message:"book not found"});
        }
        res.status(201).send({
            message:"book update successfully",
            book:updatedBook
        })
    } catch (error) {
        res.status(400).send({message:"somethign went wrong",error});
    }
}

// delete the book 
export const deleteBook=async(req,res)=>{   
   
     try {
        const {id} = req.params;
        const deletedBook =  await Book.findByIdAndDelete(id);
        if(!deletedBook) {
            res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({message: "Failed to delete a book"})
    }
}