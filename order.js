const checkerContainer = document.getElementById('checker-container'),
    grandTotal = document.getElementById('grand-total'),
    paymentButton = document.getElementById('payment-button'),
    newOrderButton = document.getElementById('new-order-button'),
    PENDING_PAYMENT = "pending_payment", COMPLETE = 'complete'

let orders = [],
    total = 0,
    currentOrder = {}

const createOrder = () => {
    currentOrder = {
        id: orders.length + 1,
        items: itemsSelected,
        amount: getTotalAmount(),
        status: PENDING_PAYMENT
    }
    showTotalAmount()
}

/**
 * Returns total amount addition of order items
 * @returns {number}
 */
const getTotalAmount = () => {
    total = 0
    itemsSelected.map(item =>
        total += menu.find(menuItem => menuItem.id === item).price
    )
    return total
}

const showTotalAmount = () => {
    menuContainer.classList.remove('d-block')
    menuContainer.classList.add('d-none')
    grandTotal.innerHTML = "$ " + currentOrder.amount;
    checkerContainer.classList.remove('d-none')
    checkerContainer.classList.add('d-block')
}

const showSuccessMessage = () => {
    currentOrder.status = COMPLETE
    orders.push(currentOrder)
    total = 0; itemsSelected = []; typesSelected = []
    checkerContainer.classList.remove('d-block')
    checkerContainer.classList.add('d-none')
    successMessage.classList.remove('d-none')
    successMessage.classList.add('d-block')
}

const showOrders = () => {
    if(orders.length === 0){
        console.log("No orders yet")
        return false
    }else {
        console.log("Total orders: " + orders.length)
        return orders
    }
}

paymentButton.addEventListener('click', showSuccessMessage)

newOrderButton.addEventListener('click', showMenu)