import {ProductComponent} from "../../components/product/index.js";

import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = +id;  // приводим к числу, если нужно
    }

    // Чтобы не дублировать данные — можно либо принимать их в конструктор,
    // либо держать где-то общий источник.
    // Для примера — создадим массив данных здесь 
    getAllData() {
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
                title: "Построй город мечты!",
                text: "Создай свой идеальный город в Minecraft."
            },
            {
                id: 3,
                src: "https://i.pinimg.com/736x/e3/18/5b/e3185b2e1992a6ff86f689b2ba13a637.jpg",
                title: "Найди новых друзей уже сегодня!",
                text: "Присоединяйся к сообществу и играй вместе."
            }
        ];
    }

    getData() {
        const allData = this.getAllData();
        return allData.find(item => item.id === this.id) || allData[0];
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `<div id="product-page"></div>`;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const stock = new ProductComponent(this.pageRoot);
        stock.render(data);
    }
}