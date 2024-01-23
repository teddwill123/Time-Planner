$( document ).ready(function() {

    // Loading dayJS advanced format plugin.
    dayjs.extend(window.dayjs_plugin_advancedFormat)

    // Setting Global Variables
    var today = dayjs();                                                                            
    var currentHour = dayjs();                                                                      
    var workingDayHours = [                                                                        
        {
            hourInt: 0, // [0]
            hour: "12AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 1, // [0]
            hour: "1AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 2, // [0]
            hour: "2AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 3, // [0]
            hour: "3AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 4, // [0]
            hour: "4AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 5, // [0]
            hour: "5AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 6, // [0]
            hour: "6AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 7, // [0]
            hour: "7AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 8, // [0]
            hour: "8AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 9, // [0]
            hour: "9AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 10, // [0]
            hour: "10AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 11, // [0]
            hour: "11AM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 12, // [0]
            hour: "12PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 13, // [0]
            hour: "1PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 14, // [0]
            hour: "2PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 15, // [0]
            hour: "3PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 16, // [0]
            hour: "4PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 17, // [0]
            hour: "5PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 18, // [0]
            hour: "6PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 19, // [0]
            hour: "7PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 20, // [0]
            hour: "8PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 21, // [0]
            hour: "9PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 22, // [0]
            hour: "10PM", // [1]
            task: "", // [2]
        },
        {
            hourInt: 23, // [0]
            hour: "11PM", // [1]
            task: "", // [2]
        },
    ];
    var hourDisplayText = $("<p>");
    hourDisplayText.addClass("currentHour");
    $("header").append(hourDisplayText);

    // Displaying Date
    var hourDisplayText = $("<p>");
    $("#currentDay").text(today.format("[Today is:] dddd[,] MMMM Do"));                             
    $(".currentHour").text(currentHour.format("[Current hour:] HH[:00]"));                           
    
    // Timeblocks
    function dailyTimeblocks (hours) {                                                              
        for (var i = 0; i < hours.length; i++) {                                                    

            var timeblockRow = $("<div>");                                                          
            timeblockRow.addClass("row");                                                           

            var hourSlot = $("<div>");                                                              
            hourSlot.addClass("hour col-1");                                                        
            hourSlot.text(hours[i].hour);                                                           
            timeblockRow.append(hourSlot);                                                          

            var userTask = $("<textarea>");                                                         
            userTask.addClass("description col");                                                  
            userTask.attr("data-index", hours[i].hourInt);                                          
            timeblockRow.append(userTask);                                                          
            
            var saveTask = $("<button>");                                                           
            saveTask.addClass("saveBtn col-1");                                                     
            timeblockRow.append(saveTask);                                                          

            $(".container").append(timeblockRow);                                                   
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
    presentHour();                                                                                  

    function pastHour () {                                                                          
        var currentHourNumber = currentHour.format("HH");                                           
        var currentHourInt = parseInt(currentHourNumber);                                         

        for (var i = 0; i < workingDayHours.length; i++) {                                          
            if (workingDayHours[i].hourInt < currentHourInt) {                                      
                var matchingUserTask = $("[data-index='" + workingDayHours[i].hourInt + "']");      
                matchingUserTask.addClass("past");                                               
            };
        };
    }
    pastHour();                                                                                     

    function futureHour () {                                                                       
        var currentHourNumber = currentHour.format("HH");                                        
        var currentHourInt = parseInt(currentHourNumber);                                           

        for (var i = 0; i < workingDayHours.length; i++) {                                          
            if (workingDayHours[i].hourInt > currentHourInt) {                                      
                var matchingUserTask = $("[data-index='" + workingDayHours[i].hourInt + "']");      
                matchingUserTask.addClass("future");                                               
            };
        };
    }
    futureHour();                                                                                   

    function saveTaskEntry() {                                                                   
        var clickedButton = $(this);                                                                
        var correspondingTextarea = clickedButton.closest(".row").find("textarea");               

        if (correspondingTextarea.val().trim() !== "") {                                            
            console.log(correspondingTextarea.val());
        } else {                                                                                    
            console.log("Textarea is empty!");
        }
    }
    $(".saveBtn").click(saveTaskEntry);                                                          
});