import { prevControl, nextControl } from './controls.js';

export class CarouselComponent {
  constructor(parent, items = [], renderItemCallback) {
    this.parent = parent;
    this.items = items; // массив данных для слайдов
    this.renderItemCallback = renderItemCallback; // функция для рендера контента слайда
  }

  getHTML() {
    return `
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" id="carousel-inner"></div>
        ${prevControl}
        ${nextControl}
      </div>
    `;
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    const root = document.getElementById('carousel-inner');

    this.items.forEach((item, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = `carousel-item${index === 0 ? ' active' : ''}`;

      const container = document.createElement('div');
      container.classList.add('d-flex', 'justify-content-center', 'p-4');

      wrapper.appendChild(container);
      root.appendChild(wrapper);

      // вызываем callback, чтобы отрендерить содержимое внутри container
      if (this.renderItemCallback) {
        this.renderItemCallback(item, container);
      }
    });
  }
}
