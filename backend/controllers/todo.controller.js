import _ from "lodash"
import { Todo } from "../models/todo.model.js"
import { serverErrorResponse, successResponse } from "../utils/api.response.js"

export const createTodo = async(req,res)=>{
    try{
        let todo = new Todo(_.pick(req.body, ['title', 'description']))
        await todo.save()
        
        return successResponse("Todo saved successfully",todo,res)
    }
    catch(ex){
        return serverErrorResponse(ex,res)
    }
}

export const getTodos = async(req,res)=>{
    try{
        let todos = await Todo.find()

        return successResponse("Todos",todos,res)

    }
    catch(ex){
        return serverErrorResponse(ex,res)
    }
}
