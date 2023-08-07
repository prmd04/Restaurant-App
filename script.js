function saveOnTheCrudCrud(){
  let price = document.getElementById("price").value;
  let order = document.getElementById("order").value;
  let table = document.getElementById("table").value;

  let obj = {
    price : price,
    order : order,
    table : table
  }

  axios.post("https://crudcrud.com/api/d8286da8c5ec4521a6c64b4e881d8cda/Order",{obj})
  .then((response)=>{
    SaveOnTheScreen(response.data);
  })
  .catch((error)=>{
    error;
  })

  document.getElementById("price").value="";
  document.getElementById("order").value="";

}
window.addEventListener('DOMContentLoaded',function(){
  axios.get("https://crudcrud.com/api/d8286da8c5ec4521a6c64b4e881d8cda/Order")
  .then((response)=>{
    for(let i=0;i<response.data.length;i++){
      SaveOnTheScreen(response.data[i]);
    }
  }).then((error)=>{
    console.log(error);
  })
})

function SaveOnTheScreen(user){
  let li = document.createElement('li');

  li.setAttribute("id",user._id);
  console.log(user.obj.price);
  console.log(user.obj.order);
  console.log(user.obj.table);

  li.textContent = `Order Name: ${user.obj.order} of Prise ${user.obj.price} By ${user.obj.table}`;

  let btn = document.createElement("button");

  btn.textContent = "deleteOrder";

  btn.addEventListener('click',()=> deleteFromCrud(user._id,user.obj.table));

  li.appendChild(btn);

  let parent1=document.getElementById("table1");
  let parent2=document.getElementById("table2");
  let parent3=document.getElementById("table3");

  let string = user.obj.table;


  if(string ==='Table1'){
    parent1.appendChild(li);
  }
  else if(string==='Table2') {
    parent2.appendChild(li);
  }
  else {
    parent3.appendChild(li);
  }

}
function deleteFromCrud(id,table){
  console.log(id);
  axios.delete(`https://crudcrud.com/api/d8286da8c5ec4521a6c64b4e881d8cda/Order/${id}`)
  .then((response)=>{
    deleteFromScreen(id,table);
  })
  .catch((error)=>{
    console.log(error);
  })
  console.log(id);
}

function deleteFromScreen(id,table){
  let p1 = document.getElementById("table1");
  let p2 = document.getElementById("table2");
  let p3 = document.getElementById("table3");

  let nodeToBeDelete = document.getElementById(id);
  if(table === "Table1"){
    p1.removeChild(nodeToBeDelete);
  }
  else if(table === "Table2"){
    p2.removeChild(nodeToBeDelete);
  }
  else if(table === "Table3"){
    p3.removeChild(nodeToBeDelete);
  }
}

