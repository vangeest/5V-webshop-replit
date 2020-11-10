function getClosest(el, qry) {
  var parent = el.parentNode
  return parent.querySelector(qry)
}

function removeClosestCompletelyFromBasket(el){
  const id = getClosest(el, '.product_id').value
  removeCompletelyFromBasket(id)
  el.parentNode.remove()
}

function removeAmountClosestFromBasket(el, showDivQry){
  const amount = parseInt(getClosest(el, '.product_amount').value)
  const id = getClosest(el, '.product_id').value
  const showEl = getClosest(el, showDivQry)
  removeFromBasket(id , amount, showEl)
}

function addAmountClosestToBasket(el, showDivQry){
  const amount = parseInt(getClosest(el, '.product_amount').value)
  const id = getClosest(el, '.product_id').value
  const showEl = getClosest(el, showDivQry)
  addToBasket(id , amount, showEl)
}

function readBasket() {
  return JSON.parse(localStorage.getItem('basket')||'{}')
}

function addToBasket(id, amount, showEl) {
  var basket = readBasket()
  basket[id] = amount + (basket[id]||0)
  localStorage.setItem('basket', JSON.stringify(basket))
  if(showEl) {
    showEl.textContent = basket[id]
  }
}

function removeCompletelyFromBasket(id, rowEl) {
  var basket = readBasket()
  delete basket[id]
  localStorage.setItem('basket', JSON.stringify(basket))
  if(rowEl) {
    showEl.remove()
  }
}

function removeFromBasket(id, amount, showEl) {
  var basket = readBasket()
  basket[id] =  Math.max(1, ((basket[id]||0) - amount))
  localStorage.setItem('basket', JSON.stringify(basket))
  if(showEl) {
    showEl.textContent = basket[id]
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

