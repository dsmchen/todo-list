import './style.css';
import { home } from './home';
import { menu } from './menu';
import { contact } from './contact';

window.addEventListener('load', () => {
  home();
});

const nav = (function () {
  function handleClick(e) {
    const contentDiv = document.querySelector('#content');
    while (contentDiv.firstChild) {
      contentDiv.removeChild(contentDiv.firstChild);
    }

    if (e.target.id === 'home') {
      home();
    } else if (e.target.id === 'menu') {
      menu();
    } else if (e.target.id === 'contact') {
      contact();
    } else {
      console.log('Something went wrong, please try again.');
    }
  }

  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => handleClick(e));
  });
})();
