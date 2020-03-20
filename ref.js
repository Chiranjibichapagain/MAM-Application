var todoList={
    todos:[],
    displayTodo: function(){
        if (this.todos.length===0){
            console.log("You have no To Do items")
        } else{
            console.log("Your To Do List:");
            for (var i=0; i<this.todos.length; i++){
                if (this.todos[i].complete=== true){
                    console.log("(x)",this.todos[i].todoItem)
                }else{
                    console.log("( )",this.todos[i].todoItem) 
                }
                
            }
        }
    },

    addTodos: function(todoText){
        this.todos.push({
            todoItem: todoText,
            complete: false
        });
        this.displayTodo();
    },

    changeTodo:function(position, changeValue){
        
        this.todos[position].todoItem=changeValue;
        this.displayTodo();
        
    },

    deleteTodo: function(index){
        this.todos.splice(index, 1); // 1 is here so that it will always delete just 1 item.
        this.displayTodo();
    },
    
    toggleAtodo: function(index){
        var todo= this.todos[index];
        todo.complete=!todo.complete;
        this.displayTodo();
    }, 
   

    toggleAll: function(){
        
        var totalTodos= this.todos.length;
        var completedTodos= 0; 

        /* Replaced by for each
        for (var i=0; i<totalTodos; i++){
            if (this.todos[i].complete=== true){
                completedTodos++ 
            }
        };        

        if(totalTodos===completedTodos){
            
            for (var i=0; i<this.todos.length; i++){
                this.todos[i].complete= false;
            }
        }else{ 
            for (var i=0; i<totalTodos; i++){
                this.todos[i].complete= true
            }

        } */ // replaced by forEach
        
        this.todos.forEach(function (todo){
            if (todo.complete === true){
                completedTodos++;
            }
        });

        this.todos.forEach(function(todo){
            if (completedTodos===totalTodos){
                todo.complete= false;
            } else{
                todo.complete= true;
            } 
        });

        

    this.displayTodo();
    }
};

var handlers={
    // display: function(){
    //     todoList.displayTodo();
    // }, commented out as display function has been brought from below

    // as we want display to happen in every button we should bring the view.displayList here and put at the end of each button function.

    toggleAll: function(){
        todoList.toggleAll();
        view.displayList();
    },

   
    addTodo: function (){
        // here we first need to link the input filed. this is not click function so we use getElement method.
        var textBoxInput= document.getElementById("inputText");// this is now connected with the text field
        // now we need that we go the addTodos function and in the value place() we wat the value of textBoxInput (see var above)
        todoList.addTodos(textBoxInput.value);// here we said go the the addTodos and in the value insert what value comes in the textBoxInput.
        // now one more thing: when user put some value. when user press add button the field should empty.
        // for this we go the the textBoxInput var and empty the value
        textBoxInput.value="";
        view.displayList();
    },

    changeTodo: function(){
        var changePosition= document.getElementById("changePosition");
        var changeText= document.getElementById("changeText");
        todoList.changeTodo(changePosition.valueAsNumber, changeText.value); // as input in the text position is number we need to do valueAsNumber.
        changePosition.value="";
        changeText.value="" // here like in addTodo we want to clear up the field.
        view.displayList();
    },

    /*deleteTodo: function(){
        var position= document.getElementById("position");
        todoList.deleteTodo(position.valueAsNumber);
        position.value="";
        view.displayList();
        
    },*/ // this is changed as we remove input in the delete todo place and we will have delete for each li item

    deleteTodo: function(position){        
        todoList.deleteTodo(position);        
        view.displayList();        
    },
    


    toggleCompleted: function(){
        
        var position=document.getElementById("index");
        todoList.toggleAtodo(position.valueAsNumber);
        position.value="";
        view.displayList();
    }
};

// now we will display the items in the interface. for that let's create a new object

var view={ // so here we want to do three things. connect ul of HTML to JS, crate li and put li into ul
    
    displayList: function(){ // this function is kind of replace of the displayTodos function on the top of page
        var todoUl= document.querySelector("ul"); // quirySelector finds elements by name. so now ul & JS are connected
        // now here we need to iterate through our todolist and count the item and display only what is available in the list
        // start with 0 items
        todoUl.innerHTML=""; // innerHTML goes inside the ul in html and start from empty.

        /* Replaced with forEach
        for (var i=0; i<todoList.todos.length; i++){        
            var todoLi= document.createElement("li") // createElements create elements. now we push crated li to ul
            // but before we push we need to push li's text property to the todos array's todoItem property.
            // also we need to put mark signs ( ) & (x) before the items.
            // for easy let's create some var
            var todo= todoList.todos[i];
            var todoWithComplete="";
            if (todo.complete=== true){
                todoWithComplete= "(x)   " + todo.todoItem
            }else{
                todoWithComplete= "( )" + todo.todoItem
            }
            // todoLi.textContent=todoList.todos[i].todoItem; [replaced in each li element should show comp..]
            todoLi.id=i // we are giving each todoLi an id and the id will be assigned to LIs as value of i increases 0,1,2,3..
            todoLi.textContent=todoWithComplete;
            todoLi.appendChild(this.createDeleteButton()); // we brought this button form createDeleteButton that is created below.
            // now this will put a buttton after each li item.
            todoUl.appendChild(todoLi)// appendChild put the item in the () as a child.here todoLi as child of todoUl
        } */ // Replaced with forEach

        todoList.todos.forEach(function(todo, position){
            var todoLi= document.createElement("li")
            var todoWithComplete="";
            if (todo.complete=== true){
                todoWithComplete= "(x)   " + todo.todoItem
            }else{
                todoWithComplete= "( )" + todo.todoItem
            };
            todoLi.id=position;
            todoLi.textContent=todoWithComplete;
            todoLi.appendChild(this.createDeleteButton());
            todoUl.appendChild(todoLi)
        }, this)

    },
    // Now we want to create delete buttton for each todo item and display those button in the todo listlist area

    createDeleteButton: function(){
        var deleteButton= document.createElement("button"); // button created
        deleteButton.textContent= "DELETE" // given text to the button
        deleteButton.className= "deleteButton" // button given a class name
        return deleteButton; // as we will be using this button whereever we need and multipletimes so we want to return the delete button.
        // now as we have a delete button let's put this/ append button above (view. displayList) to the list
    },

    // here it is good to create a eventlistner function as we will have events such as delete or toggle..
    // also let's bring delete List items functions that we did below.

    setupEventListner: function(){
        var todoUl= document.querySelector("ul");

        todoUl.addEventListener("click", function(event){ 
            var elementClicked= event.target;
            if (elementClicked.className=== "deleteButton"){ 
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id)); 
            }
         
        });

    }

};

view.setupEventListner(); // we need to call this function in order to work..





// // now as we finished the function that displays items in interface, let's take this function and place at the end of 
// // each handler (button), so that every thime we click the button view happens as well!!


// // this new code is for deleting each li item.
// // it is good to assign function to the delete button so that that code will work on deleting each li item.

// var todoUl= document.querySelector("ul");
// todoUl.addEventListener("click", function(event){ // as all li are in the ul we are assigning function to the ul so that 
//                                                     // it works in all li
//     /*console.log(event) // here we are trying to access the id of the li. to look for elements for this first clg event
//     // and check for target  and inside target parentNode in the console. so you will see the target: delete button and
//     // parent node: #0, so the is what we want to target while pressing the deletebutton.*/

//     //console.log(event.target.parentNode.id);// should return 0 when tested deleting first item.
//     var elementClicked= event.target;
//     if (elementClicked.className=== "deleteButton"){ // this means: if any button with classname deleteButten is clicked..
//         /*handlers.deleteButton (position);*/ // so where do we get this position. this position should be the #id or li element
//         // so we go to target and find the id from parentNode
//         // so the position would be: elementClicked.parentNode.id
//         handlers.deleteTodo( parseInt(elementClicked.parentNode.id)); // here the id comes as "" but we need a number
//                                                                         // in order for this to work. parsInt change "" to number      

//     }
//         // now we don't need this thing seperately out. WE CAN TAKE THIS TO THE VIEW.. 
// });











