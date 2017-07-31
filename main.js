var basicCard = require('./basicCard.js');
var clozeCard = require('./clozeCard.js');
var fs = require('fs');
var inquirer = require('inquirer');

var basicArray = [];
var clozeArray = [];

function start(){
	inquirer.prompt([{
		type: 'list',
		name: 'newCard',
		message: 'basic? or cloze? pick a new flash card type!',
		choices: ['basic', 'cloze']
	}]).then(function(answer){
		if(answer === 'basic'){
			newBasicCard();
		}else if(answer === 'cloze'){
			newClozeCard();
		}else{
			console.log("What are you doing?");
		}
	}
)};

function newBasicCard(){
	inquirer.prompt([{
		type: 'input',
		name:'front',
		message:'Enter front side!'
	},{
		type: 'input',
		name: 'back',
		message: 'Enter back side!'
	}]).then(function(answer){
		var answerB = new basicCard(answer.front, answer.back);
		basicArray.push(answerB);
	});
};

function newClozeCard(){
	inquirer.prompt([{
		type:'input',
		name: 'part',
		message: 'enter the partial message'
	},{
		type: 'input',
		name: 'rest',
		message: 'enter deleted portion!'
	}]).then(function(answer){
		var answerC = new clozeCard(answer.part, answer.rest);
		clozeArray.push(answerC);
	}
)};

start();