import { SearchFilterComponent } from '../../components/search-filter/index.js';
import { ProductCardComponent } from '../../components/product-card/index.js';
import { ProductPage } from '../product/index.js';
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentFilter = ''; // сюда сохраняем текущий фильтр
    }

    getHTML() {
        return `
            <div class="main-page">
                <div id="search-filter"></div>
                <div id="products"></div>
            </div>
        `;
    }

    getData() {
        // Формируем URL с query-параметром title, если фильтр есть
        let url = stockUrls.getStocks();
        if (this.currentFilter) {
            // Добавляем параметр, учитывая уже возможные параметры
            const separator = url.includes('?') ? '&' : '?';
            url += `${separator}title=${encodeURIComponent(this.currentFilter)}`;
        }

        ajax.get(url, (data) => {
            this.renderData(data);
        });
    }

    renderData(items) {
        this.pageRoot.innerHTML = '';

        items.forEach(item => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, () => this.clickCard(item.id));
        });
    }

    clickCard(cardId) {
        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    onSearch(query) {
        this.currentFilter = query;
        this.getData();
    }

    render() {
        this.parent.innerHTML = this.getHTML();

        // Рендерим фильтр
        const filterRoot = this.parent.querySelector('#search-filter');
        this.searchFilter = new SearchFilterComponent(filterRoot, this.onSearch.bind(this));
        this.searchFilter.render();

        this.pageRoot = this.parent.querySelector('#products');

        this.getData();
    }
}
