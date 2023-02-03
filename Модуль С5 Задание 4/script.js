function printPic(picUrl) {
  const divPic = document.querySelector('.res-pictures');
  let picHtml = `<div class='pic-div'>
                    <img src=${picUrl}>
                  </div>`
  divPic.innerHTML = picHtml;
};


async function getPics(callback) {
  let picHeight = Number(document.querySelector('.height-inp').value);
  let picWidth  = Number(document.querySelector('.width-inp').value);

  if (picHeight < 100 || picHeight > 300 || picWidth < 100 || picWidth > 300 ) {
    alert('Одно из чисел вне диапазона от 100 до 300');
    return;
  };

  let response = await fetch(`https://picsum.photos/${picWidth}/${picHeight}`);
  callback(response.url);
};

const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {getPics(printPic)});