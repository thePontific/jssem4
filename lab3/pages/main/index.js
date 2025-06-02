import { CarouselComponent } from '../../components/carousel/index.js';
import { ProductCardComponent } from '../../components/product-card/index.js';
import { ProductPage } from '../product/index.js';

export class MainPage {
  constructor(parent) {
    this.parent = parent;
  }

  getData() {
    return [
      {
        id: 1,
        src: "https://i.pinimg.com/736x/8c/9c/07/8c9c07197673ea349f1dbac6c276b927.jpg",
        title: "Долгожданное открытие сервера!",
        text: "Начни свое приключение уже сегодня на ИУ5-41Б!"
      },
      {
        id: 2,
        src: "https://i.pinimg.com/736x/54/ca/e6/54cae635e5bbec9fa7ae58682574a1c2.jpg",
        title: "Долгожданное открытие сервера!",
        text: "Построй город мечты!"
      },
      {
        id: 3,
        src: "https://i.pinimg.com/736x/e3/18/5b/e3185b2e1992a6ff86f689b2ba13a637.jpg",
        title: "Долгожданное открытие сервера!",
        text: "Найди новых друзей уже сегодня!"
      }
    ];
  }

  clickCard(e) {
    const cardId = e.target.dataset.id;
    const productPage = new ProductPage(this.parent, cardId);
    productPage.render();
  }

  render() {
    this.parent.innerHTML = '';

    const data = this.getData();

    // функция, которая принимает данные и контейнер, и рендерит ProductCardComponent
    const renderProductCard = (item, container) => {
      const card = new ProductCardComponent(container);
      card.render(item, this.clickCard.bind(this));
    };

    const carousel = new CarouselComponent(this.parent, data, renderProductCard);
    carousel.render();
  }
}
