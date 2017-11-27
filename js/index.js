
var moves = 0;
var lastOpenCard = null;
window.onload = initGame;
var closeArray = [];
var allCards = [];
function initGame()
{
	
	allCards.length = 0;
	moves = 0;
	lastOpenCard = null;
	
	document.getElementsByClassName('winner')[0].style.display = 'none';
	document.getElementsByClassName('moves')[0].innerHTML = moves;
	document.getElementsByClassName('cover')[0].style.display = 'inline-block';
	document.getElementsByClassName('star-dark')[0].style.left = '81px';
	document.getElementsByClassName('restart')[0].onclick = initGame;
	document.getElementsByClassName('again')[0].onclick = initGame;
	
	randomScreen();
	window.setTimeout(closeAllCards,2000);
	allCards = document.getElementsByClassName('card');
	allCards = Array.prototype.slice.call(allCards);
	
}


function closeAllCards(){
	cards = document.getElementsByClassName('card');
	for(var i = 0 ; i < cards.length ; i++)
	{
		closeCard(cards[i])
	}
	document.getElementsByClassName('cover')[0].style.display = 'none';
}

function randomScreen(){
	var hasRandom = [];
	var cards = document.getElementsByClassName('card');
	var currentIndex = cards.length;
	var temp;
	for(var i = 0 ; i < cards.length ;i++)
	{
		var index = 0;
		while(1){
			index = Math.floor(Math.random()*16);
			if(hasRandom.indexOf(index) == -1)
			{
				hasRandom.push(index);
				break;
			}
		}
		currentIndex -= 1;
		temp = cards[i].firstChild.className;
		cards[i].firstChild.className = cards[index].firstChild.className;
		cards[index].firstChild.className = temp;
		cards[i].onclick = matchCards;
		cards[i].classList.remove('close');
		cards[i].classList.add('open');
	}
}


function openCard(card){
	moves++;
	document.getElementsByClassName('moves')[0].innerHTML = moves;
	card.classList.remove('close');
	card.classList.add('open');
}

function matchCards(){
	if(lastOpenCard == null)
	{
		lastOpenCard = this;
		openCard(this);
	}else if(lastOpenCard != this){
		openCard(this);
		if(lastOpenCard.firstChild.className == this.firstChild.className){
			lastOpenCard.classList.remove('close','open','show');
			this.classList.remove('close','open','show');
			lastOpenCard.classList.add('match');
			this.classList.add('match');
			lastOpenCard.onclick = null;
			this.onclick = null;
			deleteCardFromAllCards(this);
			deleteCardFromAllCards(lastOpenCard);
			lastOpenCard = null;
		}else{
			closeArray.push(this);
			closeArray.push(lastOpenCard);
			this.classList.add('show');
			lastOpenCard.classList.add('show');
			window.setTimeout(function(){
				for(var i = 0; i < closeArray.length;i++){
					closeCard(closeArray[i]);
				}
				closeArray.length = 0;
			},500);
			lastOpenCard = null;
		}
	}
	judgeWin();
}

function deleteCardFromAllCards(card){
	for(var i = 0 ; i < allCards.length;i++){
		if(card == allCards[i])
		{
			allCards.splice(i,1);
		}
	}
}

function closeCard(card){
	card.classList.remove('open','match','show');
	card.classList.add('close');
}

function judgeWin(){
	var star = 3;
	if(moves >18 && moves <32){
		document.getElementsByClassName('star-dark')[0].style.left = '59px';
		star = 2;
	}else if(moves > 31){
		document.getElementsByClassName('star-dark')[0].style.left = '29px';
		star = 1;
	}
	if(allCards.length < 1){
		document.getElementsByClassName('win-moves')[0].innerHTML = moves;
		document.getElementsByClassName('starNum')[0].innerHTML = star;
		document.getElementsByClassName('winner')[0].style.display = 'flex';
	}
}


