'use strict';

const STORE = [
    { id: cuid(), name: "apples", checked: false },
    { id: cuid(), name: "oranges", checked: false },
    { id: cuid(), name: "milk", checked: true },
    { id: cuid(), name: "bread", checked: false }
];


function generateItemElement(item) {
    return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join("");
}


function renderShoppingList() {
    // render the shopping list in the DOM
    const shoppingListItemsString = generateShoppingItemsString(STORE);
    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
    STORE.push({ id: cuid(), name: itemName, checked: false });
}

function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function(event) {
        event.preventDefault();
        const newItemName = $('.js-shopping-list-entry').val();
        $('.js-shopping-list-entry').val('');
        addItemToShoppingList(newItemName);
        renderShoppingList();
    });
}

function toggleCheckedForListItem(itemId) {
    const item = STORE.find(item => item.id === itemId);
    item.checked = !item.checked;
}

function getItemIdFromElement(item) {
    return $(item)
        .closest('li')
        .data('item-id');
}

function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
        const id = getItemIdFromElement(event.currentTarget);
        toggleCheckedForListItem(id);
        renderShoppingList();
    });
}

function deleteItemContentFromList(itemId) {
    const item = STORE.find(item => item.id === itemId);
    STORE.splice(STORE.indexOf(item), 1);
}

function handleDeleteItemClicked() {
    $('.js-shopping-list').on('click', `.js-item-delete`, event => {
        const id = getItemIdFromElement(event.currentTarget);
        deleteItemContentFromList(id);
        renderShoppingList();
    });
}

// callback function when the page loads. it's responsible for
//  initially rendering the shopping list, and activating individual functions
//  that handle new item submission and user clicks on the "check" and "delete" buttons
//  for individual shopping list items.
function handleShoppingList() {

    // render the shopping list
    renderShoppingList();
    // handles new item submission
    handleNewItemSubmit();
    // check function  
    handleItemCheckClicked();
    // delete function
    handleDeleteItemClicked();

}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);