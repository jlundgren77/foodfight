$(document).ready(function(){
	$('#begin').click(function(){
		questionIndex = 0;
		$('#intro').fadeOut(500);

		$('#questions').fadeIn(2000);
        loadQuestion();
		$('#continue').hide();
	}),
    
    //load new question on click of next question
	$('#continue').click(function(event){
		event.preventDefault();
		$('#question-container').fadeOut(500);
        $('#continue').fadeOut(500);
        hideInfo();
        
        setTimeout(loadQuestion, 500);
        $('#question-container').fadeIn(1000);
        // $('#continue').fadeIn(1000);
		if (questionIndex == 10)
		{
			endGame();
		}
	}),

	$('#answers').on('click', '.submit-answer', function(event){
		event.preventDefault();
		
		checkAnswer($(this).text(), $(this));
        $('#continue').show();
	}),

	$('#play-again').click(function(event){
		event.preventDefault();
		playAgain();
		

	})
	

    var questionIndex = 0;
    var correct = 0;
	function loadQuestion(){
		enableButtons();
		
		var answersHTML = ""
		
		$('.category').text(questions[questionIndex].category);
		$('.question').text(questions[questionIndex].question);
		$('.question-number').text("question " + (questionIndex + 1) + " of 10");
		$('.num-correct').text("correct answers: " + correct);

       
		//loop through answers array and create buttons
		for (answer in questions[questionIndex].answers) {
			var question = questions[questionIndex].answers[answer];

			
			answersHTML += "<li><button class='submit-answer'>" + question + "</button></li>";
			
		}
		var answersList = document.getElementById('answers');
		answersList.innerHTML = answersHTML;
        questionIndex = questionIndex + 1;
        
	};
    
	function endGame(){
		$('#questions').fadeOut(500);
		$('#end').fadeIn(2000);
		var rank = getRank();
		$('.rank').text(rank);
		$('.score').text(correct);
        questionIndex = 0;
	};

	function getRank(){
		var msg = ""
		if (correct < 1) {
			msg += "Dishwasher";
		}
		else if (correct < 3) {
			msg += "Fast Food Fry Cook";
		}
		else if (correct < 5) {
			msg += "Line Cook'";
		}
		else if (correct < 7) {
			msg += "Head Chef";
		}
		else if (correct < 10) {
			msg += "Restaurant Owner";
		}
		else {
			msg += "Celebrity Chef"
		}
		return msg;
	};

	function checkAnswer(answer, button){
		
        if (questions[questionIndex-1].correct == answer){
			button.addClass('correct-answer');
			updateScore();
			disableButtons();
		}
		else {
			button.addClass('wrong-answer');
			 disableButtons();
		
		}
		showInfo();
		
	};

	
    
    function showInfo(){
       var info = questions[questionIndex-1].information;
       $('.question-info').text(info); 
       $('.question-info').show();
    };

    function hideInfo(){
    	$('.question-info').fadeOut(500);
    };
	function disableButtons(){
		$('.submit-answer').prop('disabled', true).addClass('disable');
	};

	function enableButtons() {
		$('.submit-answer').prop('disabled', false).removeClass('disable');
	};
	function updateScore(){
		correct += 1;
		$('.num-correct').text("correct answers: " + correct);
	};

	function resetScore(){
		correct = 0;
		$('.num-correct').text("correct answers: " + correct);		

	};

	function playAgain(){
		resetScore();
		$('#end').hide();
		$('#questions').fadeIn(2000);
		
	}
		
    //create questions
    var questions = [{
	    	question: 'What canned food did Andy Warhol paint in 1962?',
	    	answers: ['Spam', 'Tuna', "Campbell's Soup", 'SpaghettiOs'],
	    	category: 'Food Stars',
	    	correct: "Campbell's Soup",
	    	information: "Campbell's Soup Cans ushered in the pop art movement in the U.S."
	    },
    	{
    		question: 'What kinds of foods are listed as crudo on an Italian menu?',
    		answers: ['Raw', 'Fish', 'Desserts', 'Appetizers'],
    		category: 'World Cuisine',
    		correct: 'Raw',
    		information: 'Crudo means raw in Italian'

    	},
    	{
    		question: 'How many tablespoons equal a cup?',
    		answers: ['4', '6', '12', '16'],
    		category: 'Measurements',
    		correct: '16',
    		information: 'One cup is equal to 16 tablespoons'
    	},
    	{
    		question: 'What is the Japanese name for the seaweed used to wrap sushi?',
    		answers: ['Dashi', 'Miso', 'Nori', 'Kombu'],
    		category: 'World Cuisine',
    		correct: 'Nori',
    		information: 'Nori is commonly used as a wrap for sushi and onigiri'
    	},
    	{
    		question: 'What menu term means meat cooked and preserved in its own fat?',
    		answers: ['Confit', 'Blanch', 'A la Meunier', 'Terrine'],
    		category: 'Cooking Terms',
    		correct: 'Confit',
    		information: 'Confit means to preserve and is popular way to prepare duck'
    	},
    	{
    		question: 'What did Chicago Baker James Dewar invent?',
    		answers: ['Ding Dong', 'Ho Hos', 'Jelly Donut', 'Twinkies'],
    		category: 'Food Stars',
    		correct: 'Twinkies',
    		information: 'created in 1930 the Twinkie was named from an ad for Tiwnkle Toes Shoes'
    	},
    	{
    		question: 'What is Made in Mexicos Jalisco province from blue agave?',
    		answers: ['Mezcal', 'Tequila', 'Grappa', 'Pisco'],
    		category: 'Beverages',
    		correct: 'Tequila',
    		information:'Tequila is a regional specific name for distilled spirit from blue agave'
    	},
    	{
    		question: 'What cooking host likes to say "BAM" and "Kick it up notch?',
    		answers: ['Mario Batali', 'Rachael Ray', 'Guy Fieri', 'Emeril Lagasse'],
    		category: 'Food Stars',
    		correct: 'Emeril Lagasse',
    		information: 'Known for his show Emeril Live, Emeril Lagasse is an award winning chef'
    	},
    	{
    		question: 'What state leads the United States in Spam Consumption?',
    		answers: ['Minnesota', 'Iowa', 'Hawaii', 'Wisconsin'],
    		category: 'World Cuisine',
    		correct: 'Hawaii',
    		information: 'The residents of Hawaii consume about 6.7 million cans each year'

    	},
    	{
    		question: 'What makes a Martini a Gibson?',
    		answers: ['No Vermouth', 'Olives', 'Lemon Twist', 'Pickled Onion'],
    		category: 'Beverages',
    		correct: 'Pickled Onion',
    		information: 'The Gibson is drink consisting of gin, vermouth, and an onion'
    	}];
});