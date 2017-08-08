var basicCard = require('./basicCard.js');
var clozeCard = require('./clozeCard.js');
var quest = require('./quest.js')
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
				var firstPresident = new basicCard(front,back);
				basicArray.push(firstPresident);
				console.log(firstPresident);
				add();
			});
		}else if(answer.type === 'cloze'){
			inquirer.prompt([{
				name: 'full',
				message: 'What is the full text? Please put the cloze portion first!',
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
				validate: function(input){
					if(input === ''){
						console.log('provide a cloze portion silly');
						return false;
					}else{
						return true;
					}
				}
			},{
				name: 'partial',
				message: 'What is the partial message?',
				validate: function(input){
					if(input === ''){
						console.log('provide the partial part!');
						return false;
					}else{
						return true;
					}
				}

			}]).then(function(answer){
				var cloze = answer.cloze;
				var partial = answer.partial;
				var full = answer.full;
			
					var firstPresidentCloze = new clozeCard(partial,cloze,full);
					clozeArray.push(firstPresidentCloze);
					console.log(firstPresidentCloze);
					add();
				
			});
		}
	});
};
