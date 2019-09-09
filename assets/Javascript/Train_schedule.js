$(document).ready(function(){
    //configuration to link to firebase-Google's databese 
    var config = {
        apiKey: "AIzaSyDQC8uacewwXzObi5MHpht2xUlvq1e4Hyk",
        authDomain: "week-7-uw-coding-bootcamp.firebaseapp.com",
        databaseURL: "https://week-7-uw-coding-bootcamp.firebaseio.com",
        projectId: "week-7-uw-coding-bootcamp",
        storageBucket: "",
        messagingSenderId: "869404511411",
        appId: "1:869404511411:web:637d4e046d954843"
    };//initializing firebase
    firebase.initializeApp(config);
    //variable to store database set to the database of firebase
    var database = firebase.database();
    var currentTime = moment().format();//current machine date/military time
    console.log("current date and time is: "+currentTime);
    //a functionn to add rows to the table
    var addRow = function(train,destination,frequency,first){
        var trainrow = $('<td>').text(train);
        var destrow = $('<td>').text(destination);
        var freqrow = $('<td>').text(frequency);      
        var nextrow = $('<td>')
        var minrow = $('<td>')
        var updateTime = function(){
            var currentTime = moment();
            var firstTimeConverted = moment(first,"HH:mm");
            var diff = currentTime.diff(firstTimeConverted);
            var diffmin = Math.floor((diff/1000)/60);
            var minutesAway = diffmin;
            if (minutesAway > 0){
                var remain=  diffmin % frequency;
                var minutesAway = frequency-remain;
            }else{
                minutesAway = Math.abs(minutesAway);
            }
            var nextArrival = currentTime.add(minutesAway,'minutes').format('HH:mm');
            nextrow.text(nextArrival);
            minrow.text(minutesAway);
        };    
        updateTime();
        setInterval(updateTime, 10000);
        var trow = $('<tr>').append(trainrow).append(destrow).append(freqrow).append(nextrow).append(minrow);
        $("table tbody").append(trow);
    }    
    //event handler for submit button
    $("#submit").on("click", function(event){
        event.preventDefault();
        //grab inputs and assign variable names to get stored
        var train=$("#train-input").val().trim();
        var destination=$("#destination-input").val().trim();
        var first=$("#first-input").val().trim();
        var frequency = $("#frequency-input").val().trim();             
        //push variables into database
        database.ref().push({
            train:train,
            destination:destination,
            first:first,
            frequency:frequency 
        });
    });
    //on child_added function that orders the database entry by date added
    database.ref().orderByChild("dateAdded").on("child_added", function(child_snapshot){
        console.log(child_snapshot.val());
        var child = child_snapshot.val();
        //this call back ensures data persistence when the page is refreshed
        addRow(child.train,child.destination,child.frequency, child.first);
    }, function(errObj){//this will display in the console the error code handled
        console.log("errors handled: "+ errObj.code);
    });
});