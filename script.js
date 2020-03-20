
var activityList= {
    activities:[],
    displayActivities: function(){
        if (this.activities.length===0){
            console.log("There is no activity to show!!")
        } else{
            // console.log("SN"+"         "+"EVENT NAME"+"               "+"ORGANIZER"+"             "+"ADDRESS"+"                  "+"DATE"+"               "+"TIME"+"    ");
            for (var i=0; i<this.activities.length; i++){
                var activity= this.activities[i];
                if(activity.done=== true){
                    console.log(`✓    ${ activity.title}     ${activity.organizationName} ${activity.eventAddress} ${activity.eventDate}  ${activity.eventTime}`)
                }else{
                    console.log(`     ${ activity.title}      ${activity.organizationName} ${activity.eventAddress} ${activity.eventDate}  ${activity.eventTime}`)
                }
            }
        }
    },

    addActivities: function(titleText, organization, address, date, time){
        this.activities.push({
            title: titleText,
            organizationName: organization,
            eventAddress: address,
            eventDate: date,
            eventTime: time,
            done: false
        });
        this.displayActivities();
    },

    changeActivity: function(index, cTitle, cOrganization, cAddress, cDate, cTime){
        this.activities[index].title= cTitle;
        this.activities[index].organizationName= cOrganization;
        this.activities[index].eventAddress= cAddress;
        this.activities[index].eventDate= cDate;
        this.activities[index].eventTime= cTime;
        this.displayActivities();
    },

    deleteActivity: function(index){
        this.activities.splice(index, 1);
        this.displayActivities();
    },

    toggleAnActivity: function(index){
        var activity=this.activities[index];
        activity.done=!activity.done;
        this.displayActivities();
    },

    toggleAllActivities: function(){
        var totalActivities=this.activities.length;
        var doneActivities=0;
        this.activities.forEach(function(activity){
            if (activity.done=== true){
                doneActivities++
            }
        });
        this.activities.forEach(function(activity){
            if (totalActivities===doneActivities){
                activity.done= false
            }else{
                activity.done= true
            }
        });
        this.displayActivities();
    }

};

var handlers={ 
    displayButton: function(){
        activityList.displayActivities();
    },

    addButton: function(){
        var titleText = document.getElementById("titleText");
        var organizationName = document.getElementById("organizationName");
        var eventAddress = document.getElementById("eventAddress");
        var eventDate = document.getElementById("eventDate");
        var eventTime = document.getElementById("eventTime");
        activityList.addActivities(titleText.value, organizationName.value, eventAddress.value, eventDate.value, eventTime.value);
        titleText.value="";
        organizationName.value="";
        eventAddress.value="";
        eventDate.value="";
        eventTime.value="";
        view.viewList();        
    },

    deleteActivity: function(position){
        activityList.deleteActivity(position);
        view.viewList();  
    },

    ChooseActivity: function(position){
        activityList.toggleAnActivity(position);
        view.viewList();  
    },
    

};

var view={
    viewList: function(){
        var activityOl= document.querySelector("table");
            activityOl.innerHTML="";
            activityList.activities.forEach(function(activity, position){
            var activityLi= document.createElement ("tr");
            activityLi.className= "activityLi";
            var activity=activityList.activities[position];
            var activityItem= "";
            
            if (activity.done=== true){
                activityItem= `✓    <td>${ activity.title } </td>   <td> ${activity.organizationName}</td> <td>${activity.eventAddress}</td> <td>${activity.eventDate}</td>  <td>${activity.eventTime}</td>`
            } else{
                activityItem=`   <td>${ activity.title } </td>   <td> ${activity.organizationName}</td> <td>${activity.eventAddress}</td> <td>${activity.eventDate}</td>  <td>${activity.eventTime}</td>`
            };
            
            activityLi.id=position;
            activityLi.innerHTML=activityItem;
            activityLi.appendChild(this.createdDeleteButton());
            activityLi.appendChild(this.createToggleButton());
            activityOl.appendChild(activityLi);
        }, this)
    },


    createdDeleteButton: function(){
        var deleteButton= document.createElement("img")
        deleteButton.setAttribute("src", "./assets/delete-24px.svg")
        deleteButton.className="deleteButton"
        return deleteButton;
        
    },

    createToggleButton: function(){
        var toggleButton= document.createElement("button")
        toggleButton.textContent="Mark Complete"
        toggleButton.className= "toggleButton"
        return toggleButton;
    },


    setupEventListner: function(){
        var activityOl= document.querySelector("table");
        activityOl.addEventListener("click", function(event){
            var elementClicked= event.target;
            if (elementClicked.className==="deleteButton"){
                handlers.deleteActivity(parseInt(elementClicked.parentNode.id));
            };
            if (elementClicked.className==="toggleButton"){
                handlers.ChooseActivity(parseInt(elementClicked.parentNode.id));
            }
        });
    }
}

view.setupEventListner();



