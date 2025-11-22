import Note from "../model/Note.js";
export const getAllNotes = async(req,res) => {
    try{
        const notes = await Note.find().sort({createdAt: -1})// newest note //will give all notes // can add {} if we want filter.
        res.status(200).json(notes);
    }
    catch(error){
        console.error("Error in getAllNotes",error);
        res.status(500).json({Message:"Internal server error1"});
    }
};

export const createNote = async(req,res) => {
    try{
        const {title,content} = req.body
        const newNote = new Note({title,content});
        await newNote.save();
        res.status(201).json({message:"Note created successfully",note:newNote});
    }
    catch(error){
        console.error("Error in CreateNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
};


export const putNote = async(req,res) => {
    try{
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
        {
            new : true,
        }
    );
        if(!updatedNote)return res.status(404).json({message:"Note not found"})

        res.status(200).json(updatedNote)
    }
    catch(error){
        console.error("Error in UpdateNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const delNote = async(req,res) => {
    try{
        const {title,content} = req.body;
        const delnote = await Note.findByIdAndDelete(req.params.id);

        if(!delnote) return res.status(404).json("The note tha you want to delete is not present");
        res.status(201).json({message:"Note Deleted bro"})
    }
    catch(error){
        console.error("Error in DeleteNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
};

export const getRouterById = async(req,res) =>{
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return req.status(404).json("Note is only not there");
        
        res.status(200).json(note);
    }
    catch(error){
        console.error("Error in getnote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
};