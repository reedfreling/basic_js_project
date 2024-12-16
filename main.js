function addItem() {
  const ul = document.querySelector('ul');
  const listItem = document.createElement('li');
  // listItem.innerHTML = '<h1>Hello</h1>';
  listItem.appendChild(document.createTextNode("Hello"));
  ul.appendChild(listItem);
}

const button = document.querySelector('#main-button');
button.addEventListener('mouseover', e => {
  const paragraph = document.createElement('p');
  paragraph.classList.add('latest-paragraph');
  paragraph.innerText = 'A new mouseover';
  document.querySelector('body').appendChild(paragraph);
});