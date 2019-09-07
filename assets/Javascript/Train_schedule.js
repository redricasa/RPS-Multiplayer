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
        var nextArrival= 0;
        var minutesAway = 0;
    //event handler for submit button
    $("#submit").on("click", function(event){
        event.preventDefault();
        //grab inputs and assign variable names to get stored
        train=$("#train-input").val().trim();
        // console.log(train);
        destination=$("#destination-input").val().trim();
        // console.log(destination);
        first=$("#first-input").val().trim();
        // console.log(first);
        frequency=$("#frequency-input").val().trim();
        // console.log(frequency);

        // nextArrival = current computer time + frequency
        // minutesAway = absolute (current computer time - nextArrival)

        //add a row to the table with every submit button click 000000000000000
        var addRow = "<tr><td>" + train + "</td><td>" + destination+ "</td><td>" +frequency + "</td><td>" +nextArrival +"</td><td>"+minutesAway +"</td></tr>"
        $("table tbody").append(addRow);
        //push into database
        database.ref().push({
            train:train,
            destination:destination,
            first:first,
            frequency:frequency, 
            nextArrival:nextArrival,
            minutesAway:minutesAway
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