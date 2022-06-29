const main = document.querySelector('#main');
const qna = document.querySelector('#qna');

const addAnswer = (answerText, qIdx) => {
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
      // children[i].style.display = 'none';
    }

    setTimeout(() => {
      for (let i = 0; i < children.length; i++) {
        children[i].style.display = 'none';
      }
      goNext(++qIdx);
    }, 450);
  });
};

const goNext = (qIdx) => {
  const q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;

  for (let i in qnaList[qIdx].a) {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx);
  }
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
