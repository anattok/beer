class Shopping {

    handleClear(){
        ROOT_SHOPPING.innerHTML = '';
    }

    render() {

        const productsStore = localStorageUtil.getProducts();
        let htmlCatalog = '';
        let sumCatalog = 0;

        CATALOG.forEach(({ id, name, image, price }) => {
            if (productsStore.indexOf(id) !== -1) {
                htmlCatalog += `
                    <tr>
                        <td><img class="shopping-image"src=${image} alt=${name}></td>
                        <td class="shopping-element">${name}</td>
                        <td class="shopping-element__price">${price}₽</td>
                    </tr>
                
                `;
                sumCatalog += Number(price);
            }
        })

        const html = `
            <div class="shopping-container"> 
                <div class="shopping__close" onclick="shoppingPage.handleClear();"></div>
                <table>
                    ${htmlCatalog}
                    <tr>
                        <td class="shopping-element">Итого:</td>
                        <td class="shopping-element__price">${sumCatalog}₽</td>
                    </tr>
                </table>
            </div>
        `;
        ROOT_SHOPPING.innerHTML = html;

    }
}

const shoppingPage = new Shopping();

