function getClosest(el, qry) {
  var parent = el.parentNode
  return parent.querySelector(qry)
}

function removeClosestCompletelyFromBasket(el){
  const product = JSON.parse(getClosest(el, '.product_id').dataset.json)
  removeCompletelyFromBasket(product)
  el.parentNode.remove()
}

function removeAmountClosestFromBasket(el, showDivQry){
  const amount = parseInt(getClosest(el, '.product_amount').value)
  const product = JSON.parse(getClosest(el, '.product_id').dataset.json)
  const showEl = getClosest(el, showDivQry)
  removeFromBasket(product , amount, showEl)
}

function addAmountClosestToBasket(el, showDivQry){
  const amount = parseInt(getClosest(el, '.product_amount').value)
  const product = JSON.parse(getClosest(el, '.product_id').dataset.json)
  const showEl = getClosest(el, showDivQry)
  addToBasket(product , amount, showEl)
}

function readBasket() {
  return JSON.parse(localStorage.getItem('basket')||'{}')
}

function addToBasket(product, amount, showEl) {
  var basket = readBasket()
  basket[product.id] = amount + (basket[product.id]||0)
  localStorage.setItem('basket', JSON.stringify(basket))
  localStorage.setItem(`item_${product.id}`, JSON.stringify(product))
  if(showEl) {
    showEl.textContent = basket[product.id]
  }
}

function removeCompletelyFromBasket(product, rowEl) {
  var basket = readBasket()
  delete basket[product.id]
  localStorage.removeItem(`item_${product.id}`)
  localStorage.setItem('basket', JSON.stringify(basket))
  if(rowEl) {
    showEl.remove()
  }
}

function removeFromBasket(product, amount, showEl) {
  var basket = readBasket()
  basket[product.id] =  Math.max(1, ((basket[product.id]||0) - amount))
  localStorage.setItem('basket', JSON.stringify(basket))
  if(showEl) {
    showEl.textContent = basket[product.id]
  }
}

function updateBasket(value){
  const basket = value||readBasket()
  var num = 0;
  for (let key in basket) {
    num += parseInt(basket[key])
  }
  if( num == 0){
    window.basket_num.textContent = "(leeg)"
  } else if( num == 1) {
    window.basket_num.textContent = `(${num} item)`
  } else {
    window.basket_num.textContent = `(${num} items)`
  }
}

(function() {
  // your page initialization code here
  // the DOM will be available here
  window.basket_num = document.querySelector('.basket_num')
  var originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    var event = new Event('itemInserted');
    event.value = value; // Optional..
    event.key = key; // Optional..
    document.dispatchEvent(event);
    originalSetItem.apply(this, arguments);
  };

  var localStorageSetHandler = function(e) {
    if(e.key === "basket") {
      updateBasket(JSON.parse(e.value))
    }
  };
  document.addEventListener("itemInserted", localStorageSetHandler, false);

})();

