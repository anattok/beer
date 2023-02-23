class Products {
    constructor() {
        this.classNameActive = 'products-element__btn--active';
        this.labelAdd = 'Добавить в корзину';
        this.labelRemove = 'Удалить из корзины';
    }

    handleSetLocationStorage(elem, id) {
        const { pushProduct, products } = localStorageUtil.putProducts(id);

        if (pushProduct) {
            elem.classList.add(this.classNameActive);
            elem.innerHTML = this.labelRemove;
        } else {
            elem.classList.remove(this.classNameActive);
            elem.innerHTML = this.labelAdd;
        }

        headerPage.render(products.length);
    }

    render() {
        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';


        CATALOG.forEach(({ id, name, price, image, country, volume, type }) => {
            let activeClass = '';
            let activeText = '';

            if (productsStore.indexOf(id) === -1) {
                activeText = this.labelAdd;
            } else {
                activeClass = ' ' + this.classNameActive;
                activeText = this.labelRemove;
            }

            htmlCatalog += `
                <li class="products-element">
                    <img class="products-element__img" src="${image}">
                    <span class="products-element__name">${name}</span>
                    <div class="products-element__row">
                        <span class="products-element__type">${type}</span>
                        <span class="products-element__volume">${volume}</span>
                    </div>
                    <span class="products-element__country">${country}</span>
                    <span class="products-element__price">${price}₽</span>
                    <button class="products-element__btn${activeClass}" onclick="productsPage.handleSetLocationStorage(this, '${id}');">${activeText}</button>
                </li>
            `;

        });

        const html = `
            <ul class="products-container">
                ${htmlCatalog}
            </ul
        `;

        ROOT_PRODUCTS.innerHTML = html;
    }
}

const productsPage = new Products();
productsPage.render();