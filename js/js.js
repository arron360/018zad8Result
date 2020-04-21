'use strict';
let startBtn = document.getElementById ('start'), // кнопка старт
    budgetValue = document.getElementsByClassName('budget-value')[0], // строка доход
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0], // Бюджте за денб
    levelValue = document.getElementsByClassName('level-value')[0], // уровень дохода
    expensesValue = document.getElementsByClassName('expenses-value')[0], // обяз расходы
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0], // возможные траты 
    incomeValue = document.getElementsByClassName('income-value')[0], // доп доходы
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],// накопление за 1 месяц
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0], //накопление за 1 год
    expensesItem = document.getElementsByClassName('expenses-item'), // обяз расходы слева / коллекция наименвоаний 
	expensesBtn = document.getElementsByTagName('button')[0], // кнопка утвердит ьобяз расходы 
	optionalExpensesBtn = document.getElementsByTagName('button')[1], // кнопка не обяз расходы 
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),// колличество инпутов в докуемнте не обяз 
	incomeItem = document.querySelector('.choose-income'), //  строка возомжных доходов
	checkSavings = document.querySelector('#savings'), // галочка 
	sumValue = document.querySelector('.choose-sum'), // сумма 
    percentValue = document.querySelector('.choose-percent'), //процент
    yearValue = document.querySelector('.year-value'), // год 
    monthValue = document.querySelector('.month-value'), // месяц 
    dayValue = document.querySelector('.day-value'); // день
	


	let money, data; // переменые в функции 
expensesBtn.disabled = true; // отключение кнопок в первой функции включение 
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener('click', function (){ // доабвление функционала кнопки при клике 
	data = prompt("Введите дату в формате YYYY-MM-DD", "");
	money = +prompt("Ваш бюджет на месяц?",""); // let убрали

	while (isNaN(money) || money == "" || money == null ) {   // проверка, не даст пока не заполним пройти дальше 
		money = +prompt("Ваш бюджет?",""); // let убрали
	}
	appData.budget = money; // запись данных в объект
	appData.timeData = data; //запись данных в объект
	budgetValue.textContent = money.toFixed(); //доабвление текста из данных money и его округление 
	yearValue.value = new Date(Date.parse(data)).getFullYear(); // работает всегда через value получение года 
	monthValue.value = new Date(Date.parse(data)).getMonth () + 1 ; // поулченеи месяца + 1 т.к начинается с нуля
	dayValue.value = new Date(Date.parse(data)).getDate(); // поулчение дня 
	expensesBtn.disabled = false; // включение 
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
});

expensesBtn.addEventListener ('click', function(){
	let sum = 0 ;
	for (let i = 0; i < expensesItem.length; i++) {  // смотря сколько строк 
		let a = expensesItem[i].value;
		let	b = expensesItem[++i].value;
	
	if ((typeof(a))==='string' && (typeof(a))!=null && (typeof(b))!=null && a !='' && b !='' && a.length < 50 ) {
			console.log("done"); // проверка на ввод , и перевод в строку
			appData.expenses[a] = b; // идет в в объект appData , в его внутренйи объет expenses [a] ключ б значение 
			sum += +b ; //сумирвоание плюс для преобразрования в цифру 
		} else {                            
			console.log ("bad result"); // если не прошел проверку
			i--; // возврат к началу цикла 
		}
	
	}
	expensesValue.textContent = sum; // доабвление текста в строку 
});

optionalExpensesBtn.addEventListener ('click', function(){
	for (let i = 0; i <= optionalExpensesItem.length; i++) {  // спрашивает три раза вопрос
		let questionOptExpenses = optionalExpensesItem[i].value;
		appData.optionalExpenses[i] = questionOptExpenses ; // записываетс в объект optionalExpenses i ключ questionOptExpenses значение 
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
	}
});

countBtn.addEventListener('click', function(){ // бюджет на день

	if (appData.budget != undefined){ // проверка на заполнение 
		appData.moneyPerDay=(appData.budget/30).toFixed();// пустая скобка округление но целого , если 1 до первого знака после запятой
		dayBudgetValue.textContent = appData.moneyPerDay;
		if (appData.moneyPerDay < 100){
			console.log("Минимальный уровень достатка");
		
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000 ){
			levelValue.textContent ="Средний уровень достатка";
		} else if (appData.moneyPerDay > 2000){
			levelValue.textContent ="Высокий уровень достатка";
		} else { 
			levelValue.textContent = "Ошибка";
		}
	} else {
		dayBudgetValue.textContent = "произошла ошибка";
	}
});

incomeItem.addEventListener('input', function() { // input ПРИ ВЕЕДЕНИЕ ВСЕ ПЕРЕНОСИТСЯ 	
	let items = incomeItem.value;
	appData.income= items.split(', '); // запись в массив того что вел пользователь
	incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() { // клик на чекбокс 
		if (appData.savings == true) {
			appData.savings = false;
		} else { 
			appData.savings = true;
		}
});

sumValue.addEventListener ('input', function(){
	if (appData.savings == true){
		let sum = +sumValue.value, // то что вводит пользователь будет записыватсья 
		percent	 = +percentValue.value;

		appData.monthIncome = sum/100/12*percent; // месяц 
		appData.yearIncome = sum/100*percent; // год 

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1); // округление до первой точки
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

percentValue.addEventListener ('input', function(){
	if (appData.savings == true){
		let sum = +sumValue.value, // то что вводит пользователь будет записыватсья 
		percent	 = +percentValue.value;

		appData.monthIncome = sum/100/12*percent; // месяц 
		appData.yearIncome = sum/100*percent; // год 

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
		
	}
});



let appData = {  // объект 
	budget: money,
	timeData: data,
	expenses: {},  // объект в объекте 
	optionalExpenses: {},
	income: [], // массив
	savings:false
};




