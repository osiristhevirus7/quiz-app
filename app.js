'use strict';

/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: "Arizona's most abundant mineral is:",
      answers: [
        'Iron',
        'Limestone',
        'Silver',
        'Copper'
      ],
      correctAnswer: 'Copper'
    },
    {
      question: "This natural wonder is NOT in Arizona:",
      answers: [
        'Sunset Crate',
        'Zion National Park',
        'Superstition Story',
        'Sedona Oak Creek Canyon'
      ],
      correctAnswer: 'Zion National Park'
    },
    {
      question: 'Where was the original London Bridge shipped stone-by-stone and reconstructed? ',
      answers: [
        'Winslow',
        'Kingman',
        'Lake Havasu',
        'Nogales'
      ],
      correctAnswer: 'Kingman'
    },
    {
      question: "The Eagles mentioned an Arizona town in their hit 'Take It Easy.' What was the name of the town?",
      answers: [
        'Douglas',
        'Phoeinx',
        'Flagstaff',
        'Winslow'
      ],
      correctAnswer: 'Winslow'
    },
    {
      question: 'At one time these animals were used to transport goods across Arizona. What were they?',
      answers: [
        'Wild Horses',
        'Elephants',
        'Camles',
        'LLamas'
      ],
      correctAnswer: 'Wild Horses'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  incorrect: 0
};

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function generateQuestionPage() {

  let question = store.questions[store.questionNumber];
  let answers = question.answers.map((answer, idx) =>{
    return `<input type="radio" id="answer${idx}" name="answer" value='${answer}' required>
    <label for='answer${idx}'>${answer}</label><br>`;
  });

  return `<div class='mainPage'>
  <div class='status'>Current Question: ${store.questionNumber + 1} out of 5</div>
  <div class='score'>Current Score: ${store.score}</div>
  <form id='question'>
    <h2>${question.question}</h2>
    ${answers.join(' ')}
    <button class='submit'>Submit Answer.</button>
    </form>
  </div>`;
}

function generateMainPage() {
   return `<div class='mainPage'>
  <h2>How well do you know Arizona?</h2>
  <p>TEST YOUR KNOWLEDGE!<P>
  <button id='startQuiz' type="button">Start</button>
  </div>
  `;
}

function generateCorrectPage() {
   return `
  <div class='correctPage'>
  <h2>Yay! Great job!</h2>
  <p>Current Score: ${store.score}</p>
  <button id='nextQuestion' type="button">Next</button>
  </div>
  `;
  

}
function generateIncorrectPage() {
   return `
  <div class='incorrectPage'>
  <h2>Incorrect!</h2>
  <p>The correct is ${store.questions[store.questionNumber].correctAnswer}</p>
  <p>Current Score: ${store.score}</p>
  <button id='nextQuestion' type="button">Next</button>
  </div>
  `;
}

function generateEndOfGamePage() {
  return `
  <div class='finalPage'>
  <h2>How well did you know Arizona?</h2>
  <p>Your Score is ${store.score} with ${store.incorrect} incorrect! </p>
  <button id='startOver' type="button">Try again?</button>
  </div>
  `;
}

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function render() {
  let html = '';
  if (store.quizStarted === false) {
    if(store.questionNumber === store.questions.length) {
      html = generateEndOfGamePage();
    } else {
      html = generateMainPage();
    }
  } else if (store.questionNumber === store.questions.length){
    html = generateEndOfGamePage();
  } else {
    html= generateQuestionPage();
  }
  $('main').html(html);
}


/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function handleStartQuiz() {
  $('main').on('click', '#startQuiz', function() {
    store.quizStarted = true;
    render();
    console.log(`handleStartQuiz 'ran'`);
  });
}

function handleAnswerSubmit() {
  $('main').on('submit', '#question', function(event){
    event.preventDefault();
    let chosenAnswer = $("input[name='answer']:checked").val();
    let correctAnswer = store.questions[store.questionNumber].correctAnswer;
    //compare against correct answer
    if (chosenAnswer === correctAnswer) {
      store.score++;
      $('main').html(generateCorrectPage());
      
    } else {
      store.incorrect++;
      $('main').html(generateIncorrectPage());
    }
  });
  
}

function handleResetSubmit() {
  console.log(`handleResetSubmit 'ran'`);
  $('main').on('click', '#startOver', function(){
    store.quizStarted = false;
    store.score =0;
    store.questionNumber=0;
    store.incorrect=0;
    render();
   });
}

function handleNextQuestion() {
  $('main').on('click', '#nextQuestion', function(){
    store.questionNumber++;
    render();
  });
}

// ************* main function ****************//

function main() {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  generateQuestionPage();
  generateMainPage();
  generateCorrectPage();
  generateIncorrectPage();
  generateEndOfGamePage();
  handleResetSubmit();
  handleNextQuestion();
}

$(main);