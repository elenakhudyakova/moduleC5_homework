const parser = new DOMParser();

const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
`;

const xmlDom = parser.parseFromString(xmlString, 'text/xml');
const students = xmlDom.querySelectorAll('student');
let list = [];

for (let student of students) {
  const xmlName = student.querySelector('name');
  const xmlFirstName = xmlName.querySelector('first').textContent;
  const xmlSecondName = xmlName.querySelector('second').textContent
  const name = xmlFirstName + ' ' + xmlSecondName;
  const lang = xmlName.getAttribute('lang');
  const prof = student.querySelector('prof').textContent;
  const age = Number(student.querySelector('age').textContent);
  jsStudent = {
    'name': name,
    'age': age,
    'prof': prof,
    'lang': lang,
  };
  list.push(jsStudent);
};

result = {list};
console.log(result);