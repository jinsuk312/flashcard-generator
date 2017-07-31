function clozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.partial = function(text, cloze){
		text.replace(cloze, '...');
}
module.exports = clozeCard;