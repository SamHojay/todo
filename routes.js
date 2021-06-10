const express = require("express");
const router = express.Router();
const todoItemCopy = require("../models/itemschema");


 router.post("/items", (request,response) => {
  const setItem = new todoItemCopy({
    todoItem: request.body.todoItem
  });
  // save data then cath errors
  setItem.save().then(data => response.json(data)).catch(err => response.json(err));
  console.log(setItem);
});

router.get("/tasks",async(request,response) => {
 todoItemCopy.find(function (err,result){
   if(err){
     response.send(err);
   }
   response.send(result);
   console.log(result);
 });
// response.send("Working from backend");
})


router.delete("/deleteTask/:id",async(request,response) => {
  const id = request.params.id;
  await todoItemCopy.findByIdAndRemove(id);
});
module.exports = router;