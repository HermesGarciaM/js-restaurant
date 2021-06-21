const menuContainer = document.getElementById('menu-container'),
    menuDiv = document.getElementById('menu'),
    menuForm = document.getElementById("menu-form"),
    successMessage = document.getElementById('message-container'),
    ENTREE = 'Entradas', MAIN = 'Plato fuerte', DESSERT = 'Postre',
    menu = [
        {
            id: 1,
            name: "Sopa de fideos",
            type: ENTREE,
            price: 15,
        },
        {
            id: 2,
            name: "Sopa de coditos",
            type: ENTREE,
            price: 20,
        },
        {
            id: 3,
            name: "Sopa de arroz",
            type: ENTREE,
            price: 12,
        },
        {
            id: 4,
            name: "Sopa de verduras",
            type: ENTREE,
            price: 15,
        },
        {
            id: 5,
            name: "Pollo a la naranja",
            type: MAIN,
            price: 30,
        },
        {
            id: 6,
            name: "Filete de res",
            type: MAIN,
            price: 35,
        },
        {
            id: 7,
            name: "Pescado al ajo",
            type: MAIN,
            price: 45,
        },
        {
            id: 8,
            name: "Milanesa de cerdo",
            type: MAIN,
            price: 30,
        },
        {
            id: 9,
            name: "Mole con pollo",
            type: MAIN,
            price: 28,
        },
        {
            id: 10,
            name: "Hamburguesa de res",
            type: MAIN,
            price: 25,
        },
        {
            id: 11,
            name: "Pastel",
            type: DESSERT,
            price: 15,
        },
        {
            id: 12,
            name: "Gelatina",
            type: DESSERT,
            price: 7,
        },
        {
            id: 13,
            name: "Pay",
            type: DESSERT,
            price: 10,
        }
    ]

let itemsSelected = [],
    typesSelected = []

const showMenu = () => {
    currentOrder = {}
    menuDiv.innerHTML = "<h2>Elige los alimentos que deseas comer el día de hoy</h2>"
    addItemsToMenu(menu.filter(item => item.type === ENTREE), ENTREE)
    addItemsToMenu(menu.filter(item => item.type === MAIN), MAIN)
    addItemsToMenu(menu.filter(item => item.type === DESSERT), DESSERT)
    successMessage.classList.remove('d-block')
    successMessage.classList.add('d-none')
    menuContainer.classList.remove('d-none')
    menuContainer.classList.add('d-block')
}

/**
 * Add elements to menu for user order select
 * @param items
 * @param type
 */
const addItemsToMenu = (items, type) => {
    const typeElement = document.createElement('div'),
        title = document.createElement('h3')
    title.innerHTML = type
    typeElement.className = 'section'
    typeElement.append(title)

    items.map(item => {
        const itemContainer = document.createElement('div'),
            label = document.createElement('label'),
            input = document.createElement('input');
        itemContainer.className = 'item-container'
        input.type = 'checkbox'
        input.className = 'item'
        input.value = item.id
        label.append(input)
        label.append(item.name)
        itemContainer.append(label)
        typeElement.append(itemContainer)
    })
    menuDiv.append(typeElement)
}

const handleOrderForm = (e) => {
    e.preventDefault()
    itemsSelected = []
    typesSelected = []
    const inputsSelected = document.querySelectorAll('input[type=checkbox]:checked');

    if(inputsSelected.length === 0){
        alert("Debes seleccionar al menos un platillo")
        return false
    }else {
        for (let i = 0; i < inputsSelected.length; i++) {
            itemsSelected.push(parseInt(inputsSelected[i].value))
        }
    }
    typesSelected = itemsSelected.map(item =>
        menu.find(menuItem => menuItem.id === item).type
    )
    if( !(typesSelected.some(type => type === ENTREE) &&
        typesSelected.some(type => type === MAIN) &&
        typesSelected.some(type => type === DESSERT)) ){
        alert("Debes seleccionar al menos un platillo de cada tipo")
        return false
    }
    createOrder()
}

menuForm.addEventListener('submit', handleOrderForm);
showMenu();

