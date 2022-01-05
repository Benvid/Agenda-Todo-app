import mongoose from "mongoose"

const {Schema,model}= mongoose

const todoSchema = Schema({
    title:{
        type: String,
        required: true
    }, 
    
    description:{
        type:String,
        required: true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    deadline:{
        type:Date,
        required: true
    }
})
const TodoModel=model("Todo", todoSchema)
export default TodoModel