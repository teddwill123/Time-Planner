$( document ).ready(function() {

    // Loading dayJS advanced format plugin.
    dayjs.extend(window.dayjs_plugin_advancedFormat)

    // Setting Global Variables
    var today = dayjs();                                                                            
    var currentHour = dayjs();                                                                      
    var workingDayHours = [                                                                         
        {
            hourInt: 9, // [0]
            hour: "9AM", // [1]
        },
        {
            hourInt: 10, // [0]
            hour: "10AM", // [1]
        },
        {
            hourInt: 11, // [0]
            hour: "11AM", // [1]
        },
        {
            hourInt: 12, // [0]
            hour: "12PM", // [1]
        },
        {
            hourInt: 13, // [0]
            hour: "1PM", // [1]
        },
        {
            hourInt: 14, // [0]
            hour: "2PM", // [1]
        },
        {
            hourInt: 15, // [0]
            hour: "3PM", // [1]
        },
        {
            hourInt: 16, // [0]
            hour: "4PM", // [1]
        },
        {
            hourInt: 17, // [0]
            hour: "5PM", // [1]
        },
    ];

    // Declaring a variable which will create a <p> element.
    var hourDisplayPara = $("<p>");                                                                 
    hourDisplayPara.addClass("currentHour");
    // Appending the <p> element to the header.                                                   
    $("header").append(hourDisplayPara);                                                            

    // Displaying Date
    var hourDisplayPara = $("<p>");                                                                 
    $("#currentDay").text(today.format("[Today is:] dddd[,] MMMM Do"));                             
    $(".currentHour").text(currentHour.format("[Current hour:] HH[:00]"));                          
    
    // Timeblocks
    function dailyTimeblocks (hours) {                                                              
        var tasksList = JSON.parse(localStorage.getItem("userTasks"));                              
    // Checking if the taskList is falsy or not defined.
        if (!tasksList) {                                                                           
            tasksList = [];                                                                         
            for (var i = 9; i <= 18; i++) {                                                         
                tasksList.push({taskTime: i, taskText: ""})                                         
            };
    // Stores the tasksList in localstorage as a string.
            localStorage.setItem("userTasks", JSON.stringify(tasksList));                           
        };
    // Iterate through the array.
        for (var i = 0; i < hours.length; i++) {                                                    

            var timeblockRow = $("<div>");                                                          
            timeblockRow.addClass("row");                                                           
    // Setting a variable to create a div.
            var hourSlot = $("<div>");                                                              
            hourSlot.addClass("hour col-1");                                                        
            hourSlot.text(hours[i].hour);                                                           
            timeblockRow.append(hourSlot);                                                          
    // Setting a variable to create a textarea.
    // Set text content of userTask textarea to the taskText from the corresponding index in tasksList
            var userTask = $("<textarea>");                                                         
            userTask.addClass("description col");                                                  
            userTask.attr("data-index", hours[i].hourInt);                                          
            userTask.text(tasksList[i].taskText);                                                   
            timeblockRow.append(userTask);                                                         
            
            var saveTask = $("<button><i>");                                                        
            saveTask.addClass("saveBtn col-1 fas fa-save fa-2x");                                   
            saveTask.css("color:#ffffff");// Adding the color white to the icon.                                                   
            timeblockRow.append(saveTask);                                                          

            $(".container").append(timeblockRow);// Appending each timeblockRow div to the timeblocks container.
        };
    }
    dailyTimeblocks(workingDayHours);                                                               

    function presentHour () {                                                                       
        var currentHourNumber = currentHour.format("HH");                                           
        var currentHourInt = parseInt(currentHourNumber);                                           

        for (var i = 0; i < workingDayHours.length; i++) {                                         
            if (workingDayHours[i].hourInt === currentHourInt) {                                    
                var matchingUserTask = $("[data-index='" + workingDayHours[i].hourInt + "']");      
                matchingUserTask.addClass("present");                                               
            };
        };
    }
    presentHour(); // Calling the presentHour function.
    
    //Function to change the class of a timeblockRow's textarea based on the hour being lower than the current time.
    function pastHour () {                                                                          
        var currentHourNumber = currentHour.format("HH");                                           
        var currentHourInt = parseInt(currentHourNumber);                                           
    // Iterate through the array.
        for (var i = 0; i < workingDayHours.length; i++) {                                          
            if (workingDayHours[i].hourInt < currentHourInt) {                                      
                var matchingUserTask = $("[data-index='" + workingDayHours[i].hourInt + "']");      
                matchingUserTask.addClass("past");                                                  
            };
        };
    }
    pastHour(); // Calling the pastHour function.

    // Function to change the class of a timeblockRow's textarea based on the hour being greater than the current time.
    function futureHour () {                                                                        
        var currentHourNumber = currentHour.format("HH");                                           
        var currentHourInt = parseInt(currentHourNumber);                                         
    // Iterate through the array.
        for (var i = 0; i < workingDayHours.length; i++) {                                          
            if (workingDayHours[i].hourInt > currentHourInt) {                                      
                var matchingUserTask = $("[data-index='" + workingDayHours[i].hourInt + "']");      
                matchingUserTask.addClass("future");// Add the "future" class to the matching textarea.
            };
        };
    }
    futureHour();// Calling the futureHour function.

    // Function to save the users task to local storage.
    function saveTaskEntry() {                                                                      
        var clickedButton = $(this);                                                                
        var correspondingTextarea = clickedButton.closest(".row").find("textarea");                 
        var existingUserTasks = JSON.parse(localStorage.getItem("userTasks"));                      
        var hourIntIndex = correspondingTextarea.data("index");                                     

        if (correspondingTextarea.val().trim() !== "") {                                            
            var taskText = correspondingTextarea.val();                                             
            var taskTime = hourIntIndex;                                                            
            var taskListItems = {taskTime, taskText};                                               
        } else {
            // Alert to advise the user they must enter something in the text area to save.                                                                                    
            alert("Please enter a task and try again!");                        
            return;
        };

        if (!existingUserTasks) {                                                                   
            existingUserTasks = [];                                                                 
        };

        for (var i = 0; i < existingUserTasks.length; i++) {                                        
            if (existingUserTasks[i].taskTime === hourIntIndex) {                                   
                existingUserTasks.splice(i, 1);                                                                               
            };
        };

        // Creates newTasks array by spreading the elements of existingUserTasks and adding taskListItems to the end.
        var newTasks = [...existingUserTasks, taskListItems];                                       
        newTasks.sort((a, b) => a.taskTime-b.taskTime);                                             
        localStorage.setItem("userTasks", JSON.stringify(newTasks));                                
    }
    $(".saveBtn").click(saveTaskEntry);// Calling the saveTaskEntry function when a save button is clicked.
});