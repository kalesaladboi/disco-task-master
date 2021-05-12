var loadedData = JSON.parse(localStorage.getItem("timeBlockArr"));
var timeBlockArr = loadedData;

if(!loadedData) {
  // empty array to hold time blocks
  var  timeBlockArr = [];

  // create time-blocks objects, matches id with html
  for (var k = 9; k < $(".time-block").length + 9 ; k++ ) {
    var timeBlockObj = {
      hour: "hour-" + k,
      description: ""
    }
    // push timeblock object to timeblock array
    timeBlockArr.push(timeBlockObj);
  }
}


// displays descriptions to timeblocks
for ( var i = 0; i < timeBlockArr.length; i++) {
  var selector = '#' + timeBlockArr[i].hour + ' .description';
  $(selector).val(timeBlockArr[i].description);

}

// Get current Day
var today = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(today);
// gets the current hour
var currentHour = parseInt(moment().format("H"));
//console.log(currentHour);



//checks if current hour is in the past
var taskCheck = function() {
  $(".time-block").each(function() {
    var id = parseInt($(this).attr("id").replace("hour-", ""));
    
    // Add class past if current hour is greater than id
    if(currentHour > id) {
      $(this).find(".description").removeClass("present future");
      $(this).find(".description").addClass("past");
      //console.log(id + " has passed");
    }

    // Add class futre if current hour is less than id
    else if(currentHour < id) {
      $(this).find(".description").removeClass("present");
      $(this).find(".description").addClass("future");
      //console.log(id + " has NOT passed");
    }

  });

}


taskCheck();

//updated timeBlockArr array when textarea is changed
$(".time-block").on("change", "textarea", function() {
  var textInput = $(this).val();
  var timeBlockId = $(this).closest(".time-block").attr("id");

  // Loop through array to find matching hour-id
  for ( var i = 0; i < timeBlockArr.length; i++) {
    if(timeBlockArr[i].hour === timeBlockId) {
      //$(this).description = textInput;
      timeBlockArr[i].description = textInput;

    }
  }
  
});

// checks every minute if  update past, present, future timeblocks
setInterval(function() {
  taskCheck();
}, (1000 * 60));

var saveData = function() {
 localStorage.setItem("timeBlockArr", JSON.stringify(timeBlockArr));
};

$(".saveBtn").click(function() {
 saveData();
});


