function getClosest(el, qry) {
  var parent = el.parentNode
  return parent.querySelector(qry)
}

function removeClosestFromBasket(el, showDivQry){
  const amount = parseInt(getClosest(el, '.product_amount').value)
  const id = getClosest(el, '.product_id').value
  const showEl = getClosest(el, showDivQry)
  removeFromBasket(id , amount, showEl)
}

function addClosestToBasket(el, showDivQry){
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

function removeFromBasket(id, amount, showEl) {
  var basket = readBasket()
  basket[id] =  Math.max(0, ((basket[id]||0) - amount))
  localStorage.setItem('basket', JSON.stringify(basket))
  if(showEl) {
    showEl.textContent = basket[id]
  }
}


