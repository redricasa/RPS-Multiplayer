$(document).ready(function(){
    var firebaseConfig = {
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
        var name = "";
        var role = "";
        var date = 0;
        var rate = 0;
      
       
    //event handler for submit button
    $("#submit").on("click", function(event){
        event.preventDefault();
        //grab inputs
        name=$("#name-input").val().trim();
        // console.log(name);
        role=$("#role-input").val().trim();
        // console.log(role);
        date=$("#date-input").val().trim();
        // console.log(date);
        rate=$("#rate-input").val().trim();
        // console.log(rate);
        //push into database
        database.ref().push({
            name:name,
            role:role,
            date:date,
            rate:rate,
            
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