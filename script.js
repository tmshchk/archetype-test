const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const ctx = document.getElementById('myChart').getContext('2d');
const answers = {
  1: 'Полностью не согласен',
  2: 'Не согласен',
  3: 'Затрудняюсь ответить',
  4: 'Согласен',
  5: 'Полностью согласен',
};
const questions = [
  {
    question: 'Мне нравится соревноваться и побеждать',
    arch: 'Воин',
  },
  {
    question: 'Мне нравится руководить, быть лидером',
    arch: 'Монарх',
  },
  {
    question: 'Я вынослива, трудолюбива, несколько прагматична',
    arch: 'Крестьянин',
  },
  {
    question:
      'Мне присущ острый ум, способность творчески и нестандартно мыслить, играть, иногда хитрить',
    arch: 'Купец',
  },
  {
    question: 'Мне присуща мудрость, образованность, тяга к обучению и передаче знаний',
    arch: 'Философ',
  },
  {
    question: 'Люблю объяснять события и явления с мистической позиции, везде вижу знаки',
    arch: 'Монах',
  },
  {
    question: 'Могу адаптироваться под любые обстоятельства, умею принять их и подчиниться',
    arch: 'Слуга',
  },
  {
    question: 'Люблю чтобы жизнь кипела, бурлила, закручивалась, люблю плотные графики',
    arch: 'Воин',
  },
  {
    question:
      'Во мне есть шарм, большая внутренняя сила, глубинная уверенность в себе. И это замечают окружающие. Они хотят мне помогать, открывать дверь и т.п.',
    arch: 'Монарх',
  },
  {
    question:
      'Хорошо переношу монотонную работу, всегда при деле, не расстраиваюсь из-за нереализованных мечтаний',
    arch: 'Крестьянин',
  },
  {
    question: 'Авантюристка, люблю приключения и риск, сложные ситуации меня не пугают',
    arch: 'Купец',
  },
  {
    question:
      'Люблю вникать в суть событий и явлений. Люблю докопаться до сути, найти аргументы «за» и «против»',
    arch: 'Философ',
  },
  {
    question: 'Мой принцип — служение высшей идее',
    arch: 'Монах',
  },
  {
    question: 'Могу не думать и не анализировать, а просто подчиниться обстоятельствам',
    arch: 'Слуга',
  },
  {
    question:
      'Мне присуща смелость, отвага, бесстрашие. И даже некоторая агрессивность и конфликтность',
    arch: 'Воин',
  },
  {
    question: 'Светские манеры, гордая осанка, умение все сказать одним взглядом - это про меня',
    arch: 'Монарх',
  },
  {
    question:
      'У меня масса умений - люблю делать что-то руками (например: шить, вязать, вышивать, готовить еду)',
    arch: 'Крестьянин',
  },
  {
    question: 'У меня прекрасное чувство юмора и способность быстро находить общий язык с людьми',
    arch: 'Купец',
  },
  {
    question:
      'Моя речь богата образами, и я могу передавать знания и информацию в лёгкой, очень понятной и увлекательной форме',
    arch: 'Философ',
  },
  {
    question: 'Я посвящаю всю себя работе (семье, общественной деятельности, Богу)',
    arch: 'Монах',
  },
  {
    question: 'Я отличный исполнительница. Легко подчиняюсь правилами и другим людям',
    arch: 'Слуга',
  },
  {
    question: 'Легко защищаю своё мнение, могу дать сдачи и постоять за себя, не из робких',
    arch: 'Воин',
  },
  {
    question:
      'Умею владеть собой, принимаю ответственность за свои поступки и могу с лёгкостью руководить процессом',
    arch: 'Монарх',
  },
  {
    question: 'Я отличная Хозяйка, умею делать накопления и веду домашнюю бухгалтерию',
    arch: 'Крестьянин',
  },
  {
    question: 'Я знаю, что могу обаять любого. Я всегда душа компании',
    arch: 'Купец',
  },
  {
    question: 'Люблю подискутировать, доказать свою теорию и своё мнение',
    arch: 'Философ',
  },
  {
    question: 'Легко переношу одиночество, даже  люблю быть одна',
    arch: 'Монах',
  },
  {
    question: 'Не люблю принимать важные решения. Всегда прошу совета',
    arch: 'Слуга',
  },
  {
    question: 'Могу и «горячую избу войти» и «коня на скаку остановить»',
    arch: 'Воин',
  },
  {
    question: 'Никогда не побегу за автобусом или маршруткой. Нет привычки суетиться',
    arch: 'Монарх',
  },
  {
    question: 'Могу выдерживать большие нагрузки, терпеливо переношу и принимаю трудности',
    arch: 'Крестьянин',
  },
  {
    question:
      'Моя любимая фраза «утро вечера мудренее». Ничего не делаю на горячую руку. У меня всегда есть несколько планов на решение одной задачи',
    arch: 'Купец',
  },
  {
    question: 'Я умею проникать глубоко в суть событий. Люблю учиться и познавать новое',
    arch: 'Философ',
  },
  {
    question:
      'Я способна на глубокое самопожертвование и самоограничение ради благой цели, в которую верю',
    arch: 'Монах',
  },
  {
    question:
      'Принимаю факт, что живу в Системе и в соответсвии с необходимостью подчиняюсь авторитетам и обстоятельствама',
    arch: 'Слуга',
  },
  {
    question:
      'Про меня часто говорят, что я грубая и веду себя как парень. Даже во многом конфликтная личность',
    arch: 'Воин',
  },
  {
    question: 'Обидчивая, придирчивая, стремлюсь подчинять себе людей',
    arch: 'Монарх',
  },
  {
    question: 'Сложно отказываться от привычного. Не люблю изменений, сложно привыкаю к новому',
    arch: 'Крестьянин',
  },
  {
    question:
      'Замечаю, что могу "идти по головам" к своей цели, игнорируя эмоции и чувства других людей',
    arch: 'Купец',
  },
  {
    question:
      'Порой меня захватает упрямство. Доказываю своё мнение, даже если не права. Не могу принять другое мнение',
    arch: 'Философ',
  },
  {
    question: 'Суеверна и суетливая. Если черная кошка перебежала через дорогу - пиши пропало',
    arch: 'Монах',
  },
  {
    question:
      'Часто становлюсь «жертвой обстоятельств». Думаю, что все наладится само собой и не принимаю решений. Уж лучше кто-то пусть решит за меня',
    arch: 'Слуга',
  },
];

function buildQuiz() {
  const output = [];

  questions.forEach((currentQuestion, questionNumber) => {
    const answersList = [];
    for (letter in answers) {
      answersList.push(
        `<label class="cursor-pointer pl-0 py-2 rounded-lg hover:bg-slate-50 transition-all"><input type="radio" name="question_${questionNumber}" value="${letter}" class="mr-1">${answers[letter]}</label>`,
      );
    }

    output.push(`
    <div class="w-full mb-8">
      <h2 class="question text-xl font-medium text-slate-500 mb-1">${questionNumber + 1}/${
      questions.length
    }. ${currentQuestion.question}</h2>
      <div class="answers inline-flex flex-col mb-4">${answersList.join('')}</div>
    </div>`);
  });

  for (let i = 0; i < questions.length; i = i + 7) {
    let slideContainer = document.createElement('div');
    slideContainer.className = 'slide hidden';

    let slide = output.slice(i, i + 7);
    slideContainer.innerHTML = slide.join('');
    quizContainer.appendChild(slideContainer);
  }
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
  document.getElementById('quiz').scrollIntoView();
  let getSelectedInput = document.querySelector(`input[name="question_${currentSlide}"]:checked`);
  if (getSelectedInput != null) {
    showSlide(currentSlide + 1);
  } else {
    Swal.fire({
      text: 'Выберите один из вариантов ответа',
      icon: 'error',
      confirmButtonText: 'Хорошо',
    });
  }
}

function showPreviousSlide() {
  document.getElementById('quiz').scrollIntoView();
  showSlide(currentSlide - 1);
}

function showResult() {
  let getSelectedInput = document.querySelector(`input[name="question_${currentSlide}"]:checked`);
  if (getSelectedInput != null) {
    document.getElementsByClassName('buttons-list')[0].classList.add('hidden');
    quizContainer.classList.add('hidden');
    // resultContainer.innerHTML = '';

    const answerContainers = quizContainer.querySelectorAll('.answers');

    let userArch = {
      Воин: {
        count: 0,
        description:
          'Архетип, означающий мужскую силу в физическом смысле. Человек в котором ярко выражен воин, всегда стремится побеждать, бороться, оказаться сильнее других. Эта грань нередко олицетворяет собой агрессию, злость, которые могут быть выражены даже в не очень приемлемых условиях. Про ярко выраженных воинов говорят, что они “конфликтные личности”. Они готовы устраивать скандал на ровном месте, очень активны и “горячие”. Вступает в драки не задумываясь, заводится с «пол-оборота», за что причисляется к «агрессивным». Это энергия, которая нужна, чтобы оставивший своё мнение, свои границы.',
      },
      Монарх: {
        count: 0,
        description:
          'У монарха сильно развиты лидерские качества, а его карьерные амбиции можно сравнить с амбицией быть президентом или Богом. Такие черты личности наделяют его еще и большой ответственностью. Монарх также холоден, решителен и порой агрессивен. Это часть нашей души, отвечающая за лидерские качества, способность брать ответственность за других. Но теневая сторона - это деспотизм. С таким членом семьи близкие не имеют права на своё мнение, если оно отличается. Все контролируется им, и никакие вольности не допускаются. А ещё, его самочувствие зависит от социальных достижений, статуса, возможности влиять на события.',
      },
      Крестьянин: {
        count: 0,
        description:
          'Этот архетип модно описать одним словом - постоянство.Такие люди буквально «все несут в дом», начиная от винтиков, заканчивая снегоуборочными машинами. Он неприхотлив; у него всегда будут отложены средства «на черный день». Он сможет терпеливо работать, отказывая себе во многом, ради того, чтобы приобрести ценную вещь, построить свой собственный дом. Люди, с сильно проявленным архетипом Крестьянина не любят перемен, рискованных операций, нововведений. Теневой стороной данного архетипа является жадность и излишняя прагматичность.',
      },
      Купец: {
        count: 0,
        description:
          'Это авантюрист, склонный к приключениям. Если он развит достаточно сильно, то такой человек  будет постоянно рисковать. Иногда этот риск очень полезен, ведь он позволяет найти материальные блага для себя, своей второй половины и детям. Ярко выраженный купец обладает даром находить общий язык со всеми, начиная от продавца в магазине, заканчивая директорами крупных корпораций. Благодаря ему, мы способны воспринимать жизнь как приключение, легче относиться к непростым обстоятельствам и «креативить». Но если его слишком много - то это постоянная зависимость от риска, драйва, азарта. Могут манипулировать людьми, «идти по головам» к своей цели, обманывать.',
      },
      Философ: {
        count: 0,
        description:
          'Всегда старается познать весь окружающий мир, объяснить его устройство собственной теорией. У него всегда есть четко выстроенная позиция относительно государства, устройства страны и социума. Стремление познать истину, докопаться до самой сути, найти аргументы «за и против», докопаться до сути - все это про Философа. Любят подискутировать, доказать свою теорию. Если архетип развивается дисгармонично, то такие люди часто упрямы, не слышат других, и отстаивают свою точку зрения даже, когда это не нужно.',
      },
      Монах: {
        count: 0,
        description:
          'Аскет, отрешенный от всего земного. Такая сила помогает созерцать, верить в определенные идеи (Бога, Вселенную и т.д.) В противном случае, чрезвычайный аскетизм ведет к отшельничеству и добровольному заточению. Человек, в котором архетип Монаха сильно выражен, легко переносит одиночество. Его даже можно назвать индивидуалистом. Он формирует вокруг себя особую ауру собственного мира, в который доступ открыт не каждому. Только тем избранным, кто доказал свою лояльность или преданность идее (например, люди, которые следуют какому-либо музыкальному стилю; или же подростки, которые примыкают к любой субкультуре)',
      },
      Слуга: {
        count: 0,
        description:
          'Сила, которая позволяет подчиняться правилам и другим людям. Именно архетип раба помогает адаптироваться к любым условиям жизнедеятельности. Ярко развитый раб позволяет сбросить с себя всю ответственность, переложить ее на плечи кого-то другого, лечь на диван и смотреть телевизор в своем уютном мирке. Черты: безынициативность, без инструкции «ни шагу». А если слабо выражен данный архетип, сложно работать под чьим-то руководством, подчиняться правилам, соответствовать ожиданиям.',
      },
    };

    questions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name="question_${questionNumber}"]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      switch (questions[questionNumber].arch) {
        case 'Воин':
          userArch.Воин.count += +userAnswer;
          break;
        case 'Монарх':
          userArch.Монарх.count += +userAnswer;
          break;
        case 'Крестьянин':
          userArch.Крестьянин.count += +userAnswer;
          break;
        case 'Купец':
          userArch.Купец.count += +userAnswer;
          break;
        case 'Философ':
          userArch.Философ.count += +userAnswer;
          break;
        case 'Монах':
          userArch.Монах.count += +userAnswer;
          break;
        case 'Слуга':
          userArch.Слуга.count += +userAnswer;
          break;

        default:
          break;
      }
    });

    let array = Object.entries(userArch);
    let sortedArray = array.sort(([, b], [, a]) => a.count - b.count);

    console.log(sortedArray);

    let div = document.createElement('div');
    div.className = 'flex flex-col p-6 mb-6 border border-slate-200 rounded';

    let h2 = document.createElement('h2');
    h2.className = 'text-lg text-slate-600 mb-2';

    let p = document.createElement('p');

    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          sortedArray[0][0],
          sortedArray[1][0],
          sortedArray[2][0],
          sortedArray[3][0],
          sortedArray[4][0],
          sortedArray[5][0],
          sortedArray[6][0],
        ],
        datasets: [
          {
            label: '# of Votes',
            data: [
              sortedArray[0][1].count,
              sortedArray[1][1].count,
              sortedArray[2][1].count,
              sortedArray[3][1].count,
              sortedArray[4][1].count,
              sortedArray[5][1].count,
              sortedArray[6][1].count,
            ],
            backgroundColor: [
              'rgba(107, 114, 128, 0.2)',
              'rgba(239, 68, 68, 0.2)',
              'rgba(249, 115, 22, 0.2)',
              'rgba(132, 204, 22, 0.2)',
              'rgba(16, 185, 129, 0.2)',
              'rgba(6, 182, 212, 0.2)',
              'rgba(59, 130, 246, 0.2)',
              'rgba(217, 70, 239, 0.2)',
            ],
            borderColor: [
              'rgba(107, 114, 128, 1)',
              'rgba(239, 68, 68, 1)',
              'rgba(249, 115, 22, 1)',
              'rgba(132, 204, 22, 1)',
              'rgba(16, 185, 129, 1)',
              'rgba(6, 182, 212, 1)',
              'rgba(59, 130, 246, 1)',
              'rgba(217, 70, 239, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });

    if (sortedArray[0][1].count > sortedArray[1][1].count) {
      h2.appendChild(
        document.createTextNode(
          `Ваш архетип: ${sortedArray[0][0]} (${sortedArray[0][1].count} баллов)`,
        ),
      );
      p.appendChild(document.createTextNode(`${sortedArray[0][1].description}`));
      div.appendChild(h2);
      div.appendChild(p);
      resultContainer.appendChild(div);
    } else {
      h2.appendChild(
        document.createTextNode(
          `Один из ваших архетипов: ${sortedArray[0][0]} (${sortedArray[0][1].count} баллов)`,
        ),
      );
      p.appendChild(document.createTextNode(`${sortedArray[0][1].description}`));
      div.appendChild(h2);
      div.appendChild(p);
      resultContainer.appendChild(div);

      for (let i = 0; i < sortedArray.length - 1; i++) {
        let div = document.createElement('div');
        div.className = 'flex flex-col p-6 mb-6 border border-slate-200 rounded';

        let h2 = document.createElement('h2');
        h2.className = 'text-lg text-slate-600 mb-2';

        let p = document.createElement('p');

        if (sortedArray[0][1].count === sortedArray[i + 1][1].count) {
          h2.appendChild(
            document.createTextNode(
              `Один из ваших архетипов: ${sortedArray[i + 1][0]} (${
                sortedArray[i + 1][1].count
              } баллов)`,
            ),
          );
          p.appendChild(document.createTextNode(`${sortedArray[i + 1][1].description}`));
          div.appendChild(h2);
          div.appendChild(p);
          resultContainer.appendChild(div);
        }
      }
    }
  } else {
    Swal.fire({
      text: 'Выберите один из вариантов ответа',
      icon: 'error',
      confirmButtonText: 'Хорошо',
    });
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
