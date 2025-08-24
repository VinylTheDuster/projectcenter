const container = document.getElementById('product-container');

const listedProducts = [
{
    name: 'bowl',
    price: 4.99,
    isAvailable: true
},
{
    name: 'ring',
    price: 35,
    isAvailable: true
},
{
    name: 'motherboard',
    price: 124.99,
    isAvailable: true
},
{
    name: 'fan',
    price: 25,
    isAvailable: true
}];

const productContainer = () => {

    const availableProducts = listedProducts.filter(p => p.isAvailable);

    const html = availableProducts.map(product => `
        <div class="product-item">

            <label for="">Product:</label>
            <p>${product.name}</p>

            <label for="">Price:</label>
            <p>${product.price + '€'}</p>
          </div>
        `).join('');

    container.innerHTML = html;
}

productContainer();