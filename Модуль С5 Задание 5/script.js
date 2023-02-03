function printPic(pics) {
  const divPic = document.querySelector('.res-pictures');
  let html = '';

  for (let pic of pics) {
    let picHtml = `<div class='pic-div'>
                    <img src=${pic.download_url}>
                    <p>Author: ${pic.author}</p>
                  </div>`;
    html += picHtml;
  };
  
  divPic.innerHTML = html;
};


function checkValidInputs(pageNum, picLimit) {
  const divInfo = document.querySelector('.info');
  const divPic = document.querySelector('.res-pictures');
  divPic.innerHTML = '';

  let bothInpIsInvalids = [pageNum, picLimit].every((inpVal) => {
    return isNaN(inpVal) || inpVal < 1 || inpVal > 10
  });
  if (bothInpIsInvalids) {
    divInfo.innerHTML = '<p>Номер страницы и лимит вне диапазона от 1 до 10</p>';
    localStorage.removeItem('picJson');
    return false;
  };

  if (isNaN(picLimit) || picLimit < 1 || picLimit > 10) {
    divInfo.innerHTML = '<p>Лимит вне диапазона от 1 до 10</p>';
    localStorage.removeItem('picJson');
    return false;
  };

  if (isNaN(pageNum) || pageNum < 1 || pageNum > 10) {
    divInfo.innerHTML = '<p>Номер страницы вне диапазона от 1 до 10</p>';
    localStorage.removeItem('picJson');
    return false;
  };

  divInfo.innerHTML = '';
  return true;
};


function useRequest(url) {
  return fetch(url)
            .then( response => response.json() )
            .catch( error => console.log(error) );
};


async function getPics() {
  const pageNum = Number(document.querySelector('.page-num-inp').value);
  const picLimit  = Number(document.querySelector('.limit-inp').value);

  if (!checkValidInputs(pageNum, picLimit)) { return; };
  
  let json = await useRequest(`https://picsum.photos/v2/list?page=${pageNum}&limit=${picLimit}`);
  localStorage.setItem('picJson', JSON.stringify(json));

  printPic(json);
};


window.onload = () => {
  const storageJson = localStorage.getItem('picJson');
  if (storageJson) {
    picsJson = JSON.parse(storageJson)
    printPic(picsJson);
    console.log('pics loaded from local storage');
  };
};


const btn = document.querySelector('.btn');

btn.addEventListener('click', () => { getPics() });