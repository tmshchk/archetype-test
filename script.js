const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const questions = [
  {
    question: 'Первый вопрос',
    answers: {
      a: 'Ответ первого архетипа',
      b: 'Ответ второго архетипа',
      c: 'Ответ третьего архетипа',
      d: 'Ответ четвертого архетипа',
      e: 'Ответ пятого архетипа',
      f: 'Ответ шестого архетипа',
      g: 'Ответ седьмого архетипа',
    },
  },
  {
    question: 'Второй вопрос',
    answers: {
      a: 'Ответ первого архетипа',
      b: 'Ответ второго архетипа',
      c: 'Ответ третьего архетипа',
      d: 'Ответ четвертого архетипа',
      e: 'Ответ пятого архетипа',
      f: 'Ответ шестого архетипа',
      g: 'Ответ седьмого архетипа',
    },
  },
  {
    question: 'Третий вопрос',
    answers: {
      a: 'Ответ первого архетипа',
      b: 'Ответ второго архетипа',
      c: 'Ответ третьего архетипа',
      d: 'Ответ четвертого архетипа',
      e: 'Ответ пятого архетипа',
      f: 'Ответ шестого архетипа',
      g: 'Ответ седьмого архетипа',
    },
  },
  {
    question: 'Четвертый вопрос',
    answers: {
      a: 'Ответ первого архетипа',
      b: 'Ответ второго архетипа',
      c: 'Ответ третьего архетипа',
      d: 'Ответ четвертого архетипа',
      e: 'Ответ пятого архетипа',
      f: 'Ответ шестого архетипа',
      g: 'Ответ седьмого архетипа',
    },
  },
];

function buildQuiz() {
  const output = [];

  questions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (letter in currentQuestion.answers) {
      answers.push(
        `<label class="cursor-pointer p-4 mb-4 border border-solid rounded-lg hover:bg-slate-50 transition-all"><input type="radio" name="question_${questionNumber}" value="${letter}" class="mr-1">${currentQuestion.answers[letter]}</label>`,
      );
    }

    output.push(`
    <div class="slide hidden w-full">
      <h2 class="question text-xl font-bold text-slate-500 mb-4">${currentQuestion.question}</h2>
      <div class="answers flex flex-col mb-4">${answers.join('')}</div>
    </div>`);
  });

  quizContainer.innerHTML = output.join('');
}

function showSlide(n) {
  slides[currentSlide].classList.remove('!block');
  slides[n].classList.add('!block');
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = 'none';
  } else {
    previousButton.style.display = 'inline-block';
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  } else {
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

function showResult() {
  resultContainer.innerHTML = '';

  const answerContainers = quizContainer.querySelectorAll('.answers');

  let userArch = {
    Монарх: 0,
    Купец: 0,
    Философ: 0,
    Воин: 0,
    Звезда: 0,
    Энердж: 0,
    Миротворец: 0,
  };

  questions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name="question_${questionNumber}"]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    switch (userAnswer) {
      case 'a':
        userArch.Монарх += 1;
        break;
      case 'b':
        userArch.Купец += 1;
        break;
      case 'c':
        userArch.Философ += 1;
        break;
      case 'd':
        userArch.Воин += 1;
        break;
      case 'e':
        userArch.Звезда += 1;
        break;
      case 'f':
        userArch.Энердж += 1;
        break;
      case 'g':
        userArch.Миротворец += 1;
        break;
      default:
        break;
    }
  });

  let array = Object.entries(userArch);
  let sortedArray = array.sort((b, a) => a[1] - b[1]);

  console.log(sortedArray);

  if (sortedArray[0][1] > sortedArray[1][1]) {
    resultContainer.appendChild(document.createTextNode(`Ваш архетип: ${sortedArray[0][0]}`));
  } else {
    resultContainer.appendChild(
      document.createTextNode(`Один из ваших архетипов: ${sortedArray[0][0]}`),
    );

    for (let i = 0; i < sortedArray.length - 1; i++) {
      let p = document.createElement('p');
      if (sortedArray[0][1] === sortedArray[i + 1][1]) {
        p.appendChild(document.createTextNode(`Один из ваших архетипов: ${sortedArray[i + 1][0]}`));
        resultContainer.appendChild(p);
      }
    }
  }
}

buildQuiz();

const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener('click', showResult);
previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);
