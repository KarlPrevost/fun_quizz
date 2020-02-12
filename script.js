(function () {
    var questions = [{
        question: "Who is the creator of PHP?",
        choices: ["Jack Sparrow", "Rasmus Lerdorf", "Tim Berners-Lee", "Dennis Ritchie"],
        correctAnswer: 1
    }, {
        question: "When was the first implementation of Blockchain Technology?",
        choices: ["2009", "2008", "2000", "1991"],
        correctAnswer: 1
    }, {
        question: "In which year was the first Playstation made?",
        choices: ["1994", "1992", "1990", "1995"],
        correctAnswer: 1
    }, {
        question: "What does PHP mean today ?",
        choices: ["PHP: Personal Home Page", "PHP: Hypertext Preprocessor", "PHP: Program High Performace", "PHP: Hypertext Page"],
        correctAnswer: 1
    }, {
        question: "What is the last Sega console?",
        choices: ["Dreamcast", "Saturn", "S-Gage", "Lindbergh"],
        correctAnswer: 0
    }, {
        question: "What does www stands for ?",
        choices: ["Web wasabi world", "World wide web", "Wide web world", "Web war song"],
        correctAnswer: 1
    }, {
        question: "What's the name of the UNIX creator?",
        choices: ["Albert", "Linus Torvald", "Jacques", "Gerard"],
        correctAnswer: 1
    }, {
        question: "When was born Alan Turing ?",
        choices: ["1981", "1991", "1934", "1912"],
        correctAnswer: 3
    }, {
        question: "What is the port for the http",
        choices: ["70", "80", "90", "82"],
        correctAnswer: 1
    }];

    var questionCounter = 0; //Compteur de binne réponses
    var selections = []; //Resultats insérés dans un array
    var quiz = $('#quiz'); //selecteur 

    // afficher la premiere question
    displayNext();

    // bouton next
    $('#next').on('click', function (e) {
        e.preventDefault();        // suspend le bouton next
        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        // Alerte si aucune réponses n'est selectionnée
        if (isNaN(selections[questionCounter])) {
            alert('Please chose an answer');
        } else {
            questionCounter++;
            displayNext();
        }
    });

    // bouton précédent
    $('#prev').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });

    // bouton recommencer
    $('#start').on('click', function (e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        displayNext();
        $('#start').hide();
    });

    // Animation en hover
    $('.button').on('mouseenter', function () {
        $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    // Affiche la question et récupère la réponse séléctionnée
    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createRadios(index);
        qElement.append(radioButtons);
        

        return qElement;
    }

    // Crée la liste des réponses
    function createRadios(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < questions[index].choices.length; i++) {
            item = $('<li>');
            input = '<input type="radio" name="answer" value=' + i + ' />';
            input += questions[index].choices[i];
            item.append(input);
            radioList.append(item);
        }
        return radioList;
    }

    // Ajoute la réponse a un array
    function choose() {
        selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }

    // Affiche la question suivante
    function displayNext() {
        quiz.fadeOut(function () {
            $('#question').remove();
            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                // Affiche le bouton précédent si on est apres la question 1
                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#start').show();
            }
        });
    }
    document.addEventListener("keyup", function (params) {
         if (params.keyCode == 39)
        alert("Mauvaise Réponse")
        if (params.keyCode == 37)
        alert("Bonne réponse")
    })
   // Affiche le score
    function displayScore() {
        var score = $('<p>', { id: 'question' });

        var numCorrect = 0;
        for (var i = 0; i < selections.length; i++) {
            if (selections[i] === questions[i].correctAnswer) {
                numCorrect++;
            }
        }

        score.append('You got ' + numCorrect + ' questions out of ' +
            questions.length + ' right!!!');
        return score;
    }

    // Fond animé
    $('#container').animate({
        width : 1800,
        height: 800
    }, 2000, function () {
        
        this.style.boxShadow = 'none';
        
    });
})();