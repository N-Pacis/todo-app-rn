import { Schema, model } from "mongoose"

const todoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    }
})


export const Todo = model('todo',todoSchema)