
/**
 * 记忆游戏
 * @desc 玩家有两秒钟时间查看所有卡片，两秒钟之后，所有卡片隐藏，玩家需要翻开卡片，当翻开两张相同卡片时则成功，所有卡片都被翻开时，游戏胜利
 * @author wujian4018@163.com
 */


/**
 * 全局变量
 * @param {Number} moves 用户所用的步数
 */
 var moves = 0;
 /**
 * 全局变量 
 * @param {Object} lastOpenCard 用户上一张点开的卡片
 */
var lastOpenCard = null;
/**
 * 全局变量
 * @param {Array} closeArray 需要关上的卡片
 */
var closeArray = [];
/**
 * 全局变量
 * @param {Array} allCards 所有卡片的数组，当数组长度为0时，用户胜利
 */
var allCards = [];

window.onload = initGame;

/**
 * 初始化游戏的函数
 * 初始化游戏界面，并设置重新开始以及游戏结束后'play again'按钮的回调函数
 * */
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
/**
 *  随机界面函数
 *  对界面上的卡片进行随机排序，并设置卡片的回调函数
 */
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

/**
 * 打开卡片函数
 * @param {Object} card 要打开的卡片
 *  为卡片添加open css类，并增加游戏步数
 */
function openCard(card){
	moves++;
	document.getElementsByClassName('moves')[0].innerHTML = moves;
	card.classList.remove('close');
	card.classList.add('open');
}

/**
 * 关闭卡片函数
 * @param {Object} card 要关闭的函数
 */
function closeCard(card){
	card.classList.remove('open','match','show');
	card.classList.add('close');
}
/**
 * 关闭所有卡片的函数，在游戏初始化时调用
 */
function closeAllCards(){
	cards = document.getElementsByClassName('card');
	for(var i = 0 ; i < cards.length ; i++)
	{
		closeCard(cards[i])
	}
	document.getElementsByClassName('cover')[0].style.display = 'none';
}
/**
 * @callback card.onclick
 * 匹配卡片的函数
 * 如果匹配成功，为卡片移除所有css类，添加'match'类，并移除卡片回调函数防止卡片被再次点击
 * 如果匹配不成功，则为卡片移除所有css类,添加'show'类
 * 如果是自身，则不响应
 * 每次调用该函数都调用判断胜利的函数
 */
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

/**
 * 从所有卡片的数组中移除卡片
 * @param {Object} card 要移除的卡片
 * 当匹配成功时，调用该函数，移除两张卡片
 */
function deleteCardFromAllCards(card){
	for(var i = 0 ; i < allCards.length;i++){
		if(card == allCards[i])
		{
			allCards.splice(i,1);
		}
	}
}

/**
 * 判断胜利
 * 当allCards数组长度为0时，用户胜利，并显示'winner'遮罩图层
 * 当用户步数到达一定限制时，改变星星数量
 */
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


