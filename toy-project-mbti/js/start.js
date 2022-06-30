const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


const calcResult = () => {
  const result = select.indexOf(Math.max(...select));
  return result;
};


const setResult = () => {
  const point = calcResult();
  const resultName = document.querySelector('.resultName');

  resultName.innerHTML = infoList[point].name;

  const resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  const imgURL = `img/image-${point}.png`;
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
};


const goResult = () => {
  qna.style.WebkitAnimation = 'fadeOut 1s';
  qna.style.animation = 'fadeOut 1s';

  setTimeout(() => {
    result.style.WebkitAnimation = 'fadeIn 1s';
    result.style.animation = 'fadeIn 1s';
    setTimeout(() => {
      qna.style.display = 'none';
      result.style.display = 'block';
    }, 450);
  });
  console.log(select);
  setResult();
  calcResult();
};

const addAnswer = (answerText, qIdx, idx) => {
  const a = document.querySelector('.answerBox');
  const answer = document.createElement('button');
  a.appendChild(answer);
  answer.innerHTML = answerText;
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  answer.addEventListener('click', (e) => {
    e.preventDefault();

    const children = document.querySelectorAll('.answerList');

    for (let i = 0; i < children.length; i++) {
      children[i].disabled = true;
      children[i].style.WebkitAnimation = 'fadeOut .5s';
      children[i].style.animation = 'fadeOut .5s';
    }

    setTimeout(() => {
      const target = qnaList[qIdx].a[idx].type;

      for (let i = 0; i < target.length; i++) {
        select[target[i]] += 1;
      }
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 450);
  });
};

const goNext = (qIdx) => {
  if (qIdx === endPoint) {
    goResult();
    return;
  }

  const q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;

  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }

  const statusBar = document.querySelector('.statusBar');
  statusBar.style.width = (100 / endPoint) * (qIdx + 1) + '%';
};

const begin = () => {
  main.style.WebkitAnimation = 'fadeOut 1s';
  main.style.animation = 'fadeOut 1s';

  setTimeout(() => {
    qna.style.WebkitAnimation = 'fadeIn 1s';
    qna.style.animation = 'fadeIn 1s';
    setTimeout(() => {
      main.style.display = 'none';
      qna.style.display = 'block';
    }, 450);

    let qIdx = 0;
    goNext(qIdx);
  }, 450);
};
