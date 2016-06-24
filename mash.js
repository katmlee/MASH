//Get number to cycle through. Build a mouse click that draws circles and at click stop circles. Take count of circles.
//Cross out the cell ever X time. Put everything in an array of objects
//Change object status depending on the number .

var game;
//When player clicks submit button, gets values from input values
$("#inputButton").click(function() {
    game = [{
            "input": "mansion",
            "category": "mash",
        },

        {
            "input": "apartment",
            "category": "mash",
        },

        {
            "input": "shack",
            "category": "mash",
        },

        {
            "input": "house",
            "category": "mash",
        },

        {
            "input": $("#spouse1").val(),
            "category": "spouse",
        },

        {
            "input": $("#spouse2").val(),
            "category": "spouse",
        },

        {
            "input": $("#spouse3").val(),
            "category": "spouse",
        },


        {
            "input": $("#city1").val(),
            "category": "city",
        },

        {
            "input": $("#city2").val(),
            "category": "city",
        },

        {
            "input": $("#city3").val(),
            "category": "city",
        },

        {
            "input": $("#career1").val(),
            "category": "career",
        },

        {
            "input": $("#career2").val(),
            "category": "career",
        },

        {
            "input": $("#career3").val(),
            "category": "career",
        },

        {
            "input": $("#kids1").val(),
            "category": "kids",
        },

        {
            "input": $("#kids2").val(),
            "category": "kids",
        },

        {
            "input": $("#kids3").val(),
            "category": "kids",
        },

        {
            "input": $("#car1").val(),
            "category": "car",
        },

        {
            "input": $("#car2").val(),
            "category": "car",
        },

        {
            "input": $("#car3").val(),
            "category": "car",
        }
    ];
    //display part 2 directions
    $("#nextStep").text("Great! Now place your cursor over the red circle. Close your eyes. Click the circle. Click once more to get your magic number...");
    //scroll to the top because directions will show on top of column 2.
    $("body").scrollTop(0);
});
//Start with circle count and timer at 0.
var circleCount = 0;
var timerID;

//addCircle function unhides all the circles up to 8 and circlecount is added over interval period.
var addCircle = function() {
    $('.circle' + circleCount).removeClass('hidden');
    circleCount++;
    console.log(circleCount);
};
//the circle function will only run when mouse is clicked on the red circle. It will stop on the second click. The circle count will then be used in the getAnswers function.
$('#circleArea').on('mousedown', function() {
    if (timerID) {
        clearInterval(timerID);
    } else {
        timerID = setInterval(addCircle, 600);
    }
});

//function to be embedded in the getAnswers function. Using underscore, I am using a countby function to get the number of categories still in the array.
var winningWords = {};
var totals = function() {
    return _.countBy(game, 'category');
};
//When there is only 1 of a category, delete that item out of the game array and add the value of the object to winningwords array.
var getOutWinner = function(deleteItem) {
    var somethingRemoved = false;
    var count = totals();
    if (count[deleteItem.category] === 1) {
        //loop through the array to take it out and add to winningWords array//
        somethingRemoved = true;
        for (var m = 0; m < game.length; m++) {
            if (game[m].category === deleteItem.category) {
                var winner = game.splice(m, 1)[0];
                winningWords[winner.category] = winner.input;
            }
        }
    }
    return somethingRemoved;
};

//This is the content that will return once getAnswers function is run. I am using the typed library to give the typing effect.
var returnMessage = function() {
    $("#fortune").typed({
        strings: ["Welcome to your future! Wow, it looks like you and " + winningWords.spouse + " tied the knot! You go home to a beautiful " + winningWords.mash + " in lovely " + winningWords.city + " with your " + winningWords.kids + " kids. You are a " + winningWords.career + " and get to work in your " + winningWords.car + ". Congrats, future you, on living the sweet life!"],
        typeSpeed: 1
    });
};

//This is the main function that processes everything and runs the MASH.
var getAnswers = function(number) {
    var i = number - 1;
    //traverse through the arrays and change status to inactive at every Xth number.
    while (game.length > 0) {
        var deleteItem = game.splice(i, 1)[0]; // deletes first instance of the item
        var removed = getOutWinner(deleteItem);
        if (removed) { // takes into account that the last item was removed and array was shortened
            i = (i + number) % game.length;
        } else {
            i = (i + (number - 1)) % game.length;
        }
    }
    returnMessage();
    return winningWords;
};

//This function runs the button after necessary inputs are populated with circleCount. For some reason the setTimeout isn't working.// 
setTimeout(function() {
    $("#runGame").click(function() {
        getAnswers(circleCount);
    });
}, 2000);
