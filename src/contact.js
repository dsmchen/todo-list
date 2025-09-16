export function contact() {
  const contentDiv = document.querySelector('#content');
  const h1 = document.createElement('h1');
  const ul = document.createElement('ul');
  ul.classList.add('contact-list');
  const li1 = document.createElement('li');
  const li2 = document.createElement('li');

  h1.textContent = 'Contact';
  li1.textContent = 'Address: Brixton, London, UK';
  li2.textContent = 'Email: hello@example.com';

  ul.append(li1, li2);
  contentDiv.append(h1, ul);
}
