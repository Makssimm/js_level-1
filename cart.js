    'use strict'

    const counter = document.querySelector('.nav__link_counter');
    const cartButton = document.querySelector('.nav__link_relative');
    const cartEl = document.querySelector('.cartContent');
    const cartTotalSum = document.querySelector('.totalSum');
    const cartTotalEl = document.querySelector('.cartContent_Total');

    const cart = {};

    
    document.querySelector('.cards').addEventListener('click', event => {
      if (!event.target.closest('.card__addtocart')) {
        return;
      }
      counter.textContent =  Number(counter.textContent) + 1; 
      event.preventDefault();
      /* надо сделать кнопки вместо ссылок, не успел */
      const cardEl = event.target.closest('.card');
      const id = +cardEl.dataset.id;
      const name = cardEl.dataset.name;
      const price = +cardEl.dataset.price;

      addToCart(id, name, price);
    });


    cartButton.addEventListener('click', event => {
      cartEl.classList.toggle('cartContent-hidden');
      event.preventDefault();
    });

  
    function addToCart(id, name, price) {
      if (!(id in cart)) {
        cart[id] = {id: id, name: name, price: price, count: 0};
      }
        cart[id].count++;
        cartTotalSum.textContent = getTotalCartSum().toFixed(2);
        drawCart(id);
      }

      function drawCart(productId) {
        const cartRowEl = cartEl.querySelector(`.cartRow[data-id="${productId}"]`);
        
        if (!cartRowEl) {
          renderNewProductInCart(productId);
          return;
        }
        const product = cart[productId];
        
        cartRowEl.querySelector('.productCount').textContent = product.count;
        
        cartRowEl.querySelector('.productTotalRow').textContent =
         (product.price * product.count);
      }

          function renderNewProductInCart(productId) {
            const productRow = `
              <div class="cartRow" data-id="${productId}">
                <div>${cart[productId].name}</div>
                <div>
              <span class="productCount">${cart[productId].count}</span> шт.
            </div>
                <div>$${cart[productId].price}</div>
                <div>
                  $<span class="productTotalRow">${(cart[productId]
                    .price * cart[productId].count).toFixed(2)}</span>
                </div>
              </div>
              `;
            cartTotalEl.insertAdjacentHTML("beforebegin", productRow);
          }

          function getTotalCartSum() {
            const productArr = Object.values(cart);
            let count = 0;
            for (const product of productArr){
              count += product.count * product.price;
            }
            return count;
          }
        