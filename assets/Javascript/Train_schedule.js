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
        var currentTime = moment().format();
        console.log("current date is: "+currentTime);
    //event handler for submit button
    $("#submit").on("click", function(event){
        event.preventDefault();
        //grab inputs and assign variable names to get stored
        train=$("#train-input").val().trim();
        console.log(train);
        destination=$("#destination-input").val().trim();
        console.log(destination);
        first=$("#first-input").val().trim();
        console.log(first);
        //math.abs() prevents negative numbers
        var abs = Math.abs($("#frequency-input").val().trim());
        frequency = abs
        console.log(frequency);

        // nextArrival = current computer time + frequency
        // minutesAway = (current computer time - nextArrival).val().abs();
        //add a row to the table with every submit button click 000000000000000
        // var addRow = "<tr><td>" + train + "</td><td>" + destination+ "</td><td>" +frequency + "</td><td>" +nextArrival +"</td><td>"+minutesAway +"</td></tr>"

        
            var trainrow = $('<td>'+ train + '</td>'); 
            var destrow = $('<td>'+ destination + '</td>');
            var freqrow = $('<td>'+ frequency + '</td>');
            var nextrow = $('<td>'+ nextArrival + '</td>');
            var minrow = $('<td>'+ minutesAway + '</td>');
            var trow = $('<tr>'+ trainrow + destrow + freqrow + nextrow + minrow );
            $("table tbody").append(trow);

        // $("table tbody").append(addRow);
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
    database.ref().on("child_added", function(child_snapshot){
        console.log(child_snapshot.val());
        var child = child_snapshot.val();
        $("table tbody").append("<tr><td>" + child.train + "</td><td>" + child.destination+ "</td><td>" +child.frequency + "</td><td>" + child.nextArrival +"</td><td>"+ child.minutesAway +"</td></tr>");
    }, function(errObj){
        console.log("errors handled: "+ errObj.code);
    });
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
        // do something! - add console.log for the snapshot.val().train ...0000000000000
    });

});