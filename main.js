//Питання
const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

//знаходимо елементи
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

//перемінні гри
let score = 0; //к-сть правильних відповідей
let questionIndex = 0; //текущий вопрос


//очистка HTML розмітки
clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

//відобразити питання і відповідь

function showQuestion(){
	console.log('showQuestion');

	//питання
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

	headerContainer.innerHTML = title;

	//варіанти відповідей

	let answerNumber = 1;

	for (answerText of questions[questionIndex]['answers']){
		const questionTemplate = 
		`<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>`;

		const answerHTML = questionTemplate
									.replace('%answer%', answerText)
									.replace('%number%', answerNumber)
		
		listContainer.innerHTML += answerHTML;
		answerNumber++;

	}
}

function checkAnswer(){

	//знаходимо вирану радіокнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	//якщо відповідь не вибрана - нічого не робимо, виходимо з ф-ції
	if (!checkedRadio){
		submitBtn.blur();
		return
	}

	//дізнаємось номер відповіді користувача
	const userAnswer = parseInt(checkedRadio.value)

	//якщо відповідь правильна - збільшуємо рахунок
	questions[questionIndex]['correct']

	if (userAnswer === questions[questionIndex]['correct']){
		score++
	}

	if(questionIndex !== questions.length - 1){
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	}else{
		clearPage();
		showResults();
	}
}

function showResults (){
	//шаблон
	const resultsTemplate = 
		`<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>`;

	let title, message;

		//варіанти заголовків і текста
	if (score === questions.length){
		title = 'Вітаємо';
		message = 'Ви відповіли правильно на всі питання!'
	}else if ((score * 100) / questions.length >= 50){
		title = 'Непогано';
		message = 'Красава'
	}else if ((score * 100) / questions.length < 50){
		title = 'Погано';
		message = 'Ви гамно!'
	}

	//результат
	let result = `${score} із ${questions.length}`;
	
	//фінальна відповідь, підставляємо дані в шаблон
	const finalMessage = resultsTemplate
							.replace('%title%', title)
							.replace('%message%', message)
							.replace('%result%', result)

	headerContainer.innerHTML = finalMessage;

	//міняємо кнопку на "Грати знову"
	submitBtn.blur();
	submitBtn.innerText = 'Грати знову';
	submitBtn.onclick = ()=> history.go();
}
