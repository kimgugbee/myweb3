let cardArr = []; //클릭한 카드(.card-wrap)를 담아줄 배열

const body = document.querySelector("body");



//카드 열기 : .card-wrap 한테 .active 를 추가/삭제 하여 처리
function openCard(evt) {
  if (canNotOpenCard()) { //이미 2장 열려있으면 더이상 오픈할 수 없음. 기다려야됨(최대 1초)
    return;
  }
  const cardWrap = getCardWrapElem(evt.target);
  const isAlreadyActive = isAlreadyActiveCard(cardWrap);
  if (isAlreadyActive) {
    return;
  }
  cardWrap.classList.add("active"); //처음 오픈하는 카드이므로 active 추가

  pushCardToArr(cardWrap);
}

function isAlreadyActiveCard(cardWrap) {
  return cardWrap.classList.contains("active");
}

//카드(.card-wrap) 얻기
function getCardWrapElem(evtTarget) {
  if (evtTarget.classList.contains("active")) {
    return evtTarget;
  }
  return evtTarget.parentNode.parentNode;
}

//카드(.card-wrap)를 배열에 담기
function pushCardToArr(cardWrap) {
  if (cardArr.length == 2) {  //이미 2장이면 진행 ㄴㄴ
    return;
  }
  cardArr.push(cardWrap);
  if (cardArr.length < 2) { //1장 넣은 상태인거면 리턴
    return;
  }
  //2장 모두 선택한 경우, 아래 코드 진행
  const isSame = checkSame();
  if (isSame) {
    cardArr[0].classList.add("good");
    cardArr[1].classList.add("good");
    cardArr = [];
  } else {
    flipActiveToOrigin();
  }
}

//정답 체크
function checkSame() {
  const value01 = cardArr[0].children[0].children[0].innerText;
  const value02 = cardArr[1].children[0].children[0].innerText;
  return value01 === value02;
}

// 열려있는 카드 다시 엎어놓기
function flipActiveToOrigin() {
  setTimeout(() => {
    cardArr[0].classList.remove("active");
    cardArr[1].classList.remove("active");
    cardArr = [];
  }, 1000);
}

//이미 2장이 열려있으면 다른 카드를 오픈하면 안됨
function canNotOpenCard() {
  return cardArr.length == 2;
}


body.addEventListener("click", openCard);