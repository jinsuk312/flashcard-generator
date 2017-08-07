var basicCard = require('./basicCard.js');
var clozeCard = require('./clozeCard');
var inquirer = require('inquirer');

var basicArray = [];
var clozeArray = [];

inquirer.prompt([{
	name:'addOrShow',
	message: 'Would you like to make Flash Cards?',
	type: 'list',
	choices: [{
		name: 'Yes'
	},{
		name: 'No'
	}]
}]).then(function(answer){
	if(answer.addOrShow === 'Yes'){
		add();
	}else{
		console.log('Too bad! You are going to have to!');
		add();
	}
});

var add = function(){
	inquirer.prompt([{
		name:'type',
		message: 'Which type of card BASIC or CLOZE?',
		type:'list',
		choices: [{
			name: 'basic'
		},{
			name:'cloze'
		}]
	}]).then(function(answer){
		if(answer.type === 'basic'){
			inquirer.prompt([{
				name:'front',
				message: 'What is the question?',
				validate: function(input){
					if(input ===''){
						console.log('Put a question FIRST!!!');
						return false;
					}else{
						return true;
					}
				}
			},{
				name:'back',
				message: 'Now put an ANSWER down!',
				validate: function(input){
					if(input === ''){
						console.log('Put an answer!');
						return false;
					}else{
						return true;
					}
				}
			}]).then(function(answer){
				var front = answer.front;
				var back = answer.back;
				var newBasicCard = new basicCard(front,back);
				newBasicCard.create();
				basicArray.push(newBasicCard);
			});
		}else if(answer.type === 'cloze'){
			inquirer.prompt([{
				name: 'text',
				message: 'What is the full text?',
				validate: function(input){
					if(input === ''){
						console.log('Put a full text question')
						return false;
					} else{
						return true;
					}
				}
			},{
				name:'cloze',
				message: 'What is the cloze part?',
				validae: function(input){
					if(input === ''){
						console.log('provide a cloze portion silly');
						return false;
					}else{
						return true;
					}
				}
			}]).then(function(answer){
				var text = answer.text;
				var cloze = answer.cloze;
				if(text.includes(cloze)){
					var newCloze = new clozeCard(text,cloze);
					newCloze.create();
					clozeArray.push(newCloze);
				}else{
					console.log('Lets start over again');
					add();
				}
			});
		}
	});
};
