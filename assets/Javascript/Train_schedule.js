$(document).ready(function(){
    var config = {
        apiKey: "AIzaSyDQC8uacewwXzObi5MHpht2xUlvq1e4Hyk",
        authDomain: "week-7-uw-coding-bootcamp.firebaseapp.com",
        databaseURL: "https://week-7-uw-coding-bootcamp.firebaseio.com",
        projectId: "week-7-uw-coding-bootcamp",
        storageBucket: "",
        messagingSenderId: "869404511411",
        appId: "1:869404511411:web:637d4e046d954843"
        };
        firebase.initializeApp(config);
        var database = firebase.database();
        // initial values
        var train = "";
        var destination = "";
        var first = 0;
        var frequency = 0;
    //event handler for submit button
    $("#submit").on("click", function(event){
        event.preventDefault();
        //grab inputs
        train=$("#train-input").val().trim();
        // console.log(train);
        destination=$("#destination-input").val().trim();
        // console.log(destination);
        first=$("#first-input").val().trim();
        // console.log(first);
        frequency=$("#frequency-input").val().trim();
        // console.log(frequency);
        //push into database
        database.ref().push({
            train:train,
            destination:destination,
            first:first,
            frequency:frequency, 
        });
    });
    database.ref().on("child_added", function(snapshot){
        $("#all-employee").append( "<div class='all'><span class='name'>" + snapshot.val().name + "</span><span class='role'>"+ snapshot.val().role + "</span><span class ='date'>" + snapshot.val().date + "</span><span class='rate'>" + snapshot.val().rate + "</span></div>");
    }, function(errObj){
        console.log("errors handled: "+ errObj.code);
    });
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // Change the HTML to reflect
        $("#name-display").text(snapshot.val().name);
        $("#email-display").text(snapshot.val().email);
        $("#age-display").text(snapshot.val().age);
        $("#comment-display").text(snapshot.val().comment);
    });
});