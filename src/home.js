import beerImage from './assets/images/beer.png';
import coconutImage from './assets/images/coconut.png';
import herbImage from './assets/images/herb.png';
import hotPeppperImage from './assets/images/hot-pepper.png';
import mangoImage from './assets/images/mango.png';
import riceImage from './assets/images/rice.png';
import tropicalDrinkImage from './assets/images/tropical-drink.png';
import wineGlassImage from './assets/images/wine-glass.png';

export function home() {
  const contentDiv = document.querySelector('#content');
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');

  h1.textContent = 'Muan';
  h2.textContent = 'Vegan Thai + Natural Wine + Thai Cocktails';
  p1.textContent =
    'At Muan, we celebrate regional Thai dishes that transport you to the bustling streets of Thailand, designed for vegans and non-vegans alike.';
  p2.textContent =
    'Embrace the Thai tradition of pairing authentic flavours with our wide range of vegan natural wines, Thai-inspired cocktails, and Chang beer. Experience the essence of Thailand at Muan, where every meal is an adventure in flavour and culture.';

  const imageDiv = document.createElement('div');
  imageDiv.classList.add('image-container');
  const image1 = document.createElement('img');
  const image2 = document.createElement('img');
  const image3 = document.createElement('img');
  const image4 = document.createElement('img');
  const image5 = document.createElement('img');
  const image6 = document.createElement('img');
  const image7 = document.createElement('img');
  const image8 = document.createElement('img');
  image1.src = beerImage;
  image2.src = coconutImage;
  image3.src = herbImage;
  image4.src = hotPeppperImage;
  image5.src = mangoImage;
  image6.src = riceImage;
  image7.src = tropicalDrinkImage;
  image8.src = wineGlassImage;
  imageDiv.append(
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8
  );

  contentDiv.append(h1, h2, imageDiv, p1, p2);
}
