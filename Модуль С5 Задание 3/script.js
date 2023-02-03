function printPics(response) {
  const divPics = document.querySelector('.res-pictures');
  let pics = '';

  for (let pic of response) {
    html = `<div class='pic-div'>
              <img src=${pic.download_url} width="300" height="200">
              <p>${pic.author}</p>
            </div>`
    pics += html;
  };
  divPics.innerHTML = pics;
  };


function getPics(callback) {
  let picLimit = Number(document.querySelector('.numInp').value);

  if (picLimit < 1 || picLimit > 10) {
    alert('Число вне диапазона от 1 до 10');
    return;
  };

  let xhr = new XMLHttpRequest();
  xhr.open('GET', `https://picsum.photos/v2/list?limit=${picLimit}`);
  xhr.onload = () => {
    if (xhr.status != 200) {
      console.log(`Статус ответа: ${xhr.status}`);
    } else {
      callback(JSON.parse(xhr.response));
    };
  };
  xhr.oneerror = () => {
    console.log(`Ошибка: ${xhr.status}`);
  };
  xhr.send();
};


const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {getPics(printPics)});