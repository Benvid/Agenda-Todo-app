app.use(cors());
app.use(express.json());
app.get('/', function(req, res){
  res.status(200).json({message: 'Welcome to isaac todo api'});
});
app.get('/todos', todoController.getAllTodos);
app.post('/todos', todoController.addTodo);
app.patch('/todos/:todoId', todoController.updateTodoById);
app.delete('/todos/:todoId', todoController.deleteTodoById);
app.get('/todos/:todoId', todoController.getTodoById);

//listener
app.listen(PORT, function(){
  console.log('Server has started to run');
  mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function(){
    console.log('DB is connected');
  })
  .catch(function(error){
    console.log('DB is not connected: ', error.message);
  })
});
///home route
app.get("/",(req,res)=>{
    res.send("Welcome to Benvid Todo API")
})
//Get all Todos rout
app.get("/todos",async(req,res)=>{
    const todo= await TodoModel.find({});

    if (todo){

       return res.status(200).json(todo)
    }else{
       return res.status(400).json({
            message:"Failed to fetch todos from database"
        })
    }

})


//Create a new Todo into the database,
app.post("/create",async(req,res)=>{
    const{title, description, isCompleted, deadline}=req.body
    const createTodo = await TodoModel.create({
        title,
        deadline,
        description,
        isCompleted
    })
    if(createTodo){
        return res.status(200).json({
            
            data: createTodo
        
        })
    }else{
        return{
            message:"Failed to create a new Todo",
            
        }
    }

})

//Update:
app.patch("/update/:id",async(req,res)=>{

    const{id}=req.params;
    const{isCompleted}=req.body
    const updateTodo = await TodoModel.updateOne({isCompleted:isCompleted}).where({_id:id})

if(updateTodo){
    return res.status(200).json({
        message:"Todo update successfully",
        data: updateTodo
    
    })
}else{
    return res.status(400).json({ message:"Failed to update Todo",
})
       
        
    }


})
//Delete Todo From Database

app.delete("/delete/:id", async(req,res)=>{
    const {id}=req.params;
    const deleteTodo= await TodoModel.findByIdAndDelete({_id:id})

    if(deleteTodo){
        return res.status(200).json({
            message:"Todo delete successfully",
            data: deleteTodo
        
        })
    }

})


app.listen(port,() => {
    console.log(`Todo server running at ${port}`)
});
