export function menu() {
  const contentDiv = document.querySelector('#content');
  const h1 = document.createElement('h1');
  const h2A = document.createElement('h2');
  const h2B = document.createElement('h2');
  const ul1 = document.createElement('ul');
  const ul2 = document.createElement('ul');
  ul1.classList.add('menu-list');
  ul2.classList.add('menu-list');
  const li1 = document.createElement('li');
  const li2 = document.createElement('li');
  const li3 = document.createElement('li');
  const li4 = document.createElement('li');

  h1.textContent = 'Menu';
  h2A.textContent = 'Favourite Thai Dishes';
  h2B.textContent = "Muan's Signature Dishes";
  li1.textContent = '🍛 Green curry with chickpea and aubergine ... 11';
  li2.textContent = '🥗 Spicy papaya salad ... 11';
  li3.textContent = '🥟 Crispy dumplings ... 8';
  li4.textContent = '🍄‍🟫 Mushroom and tofu skewer ... 8.5';

  ul1.append(li1, li2);
  ul2.append(li3, li4);
  contentDiv.append(h1, h2A, ul1, h2B, ul2);
}
