var customers = []

const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const deleteButton = document.getElementById("delete-button");

const vatInput = document.getElementById("vat-input");
const nameInput = document.getElementById("name-input");
const addressInput = document.getElementById("address-input");

const comunicatField = document.getElementById("comunicat-container");

const vatContainer = document.getElementById("vat-list");
const nameContainer = document.getElementById("name-list");
const addressContainer = document.getElementById("address-list");

function addCustomer(){
    comunicatField.innerHTML = '';

    if(vatInput.value == '' || nameInput.value == '' || addressInput.value == ''){
        comunicatField.innerHTML = 'All fields should be filled';
        return;
    }

    let baseCustomer = customers.find(customer => customer.vat === vatInput.value );
    if (baseCustomer != null){
        comunicatField.innerHTML = 'There is a customer with the same VAT indentification number';
        return;
    }

    let customer = {
        "vat": vatInput.value,
        "name": nameInput.value,
        "address": addressInput.value 
    }

    customers.push(customer);

    clearFields();
    listCustomers();
}

function editCustomer(){
    comunicatField.innerHTML = '';
    let isThereEdit = false;

    if(vatInput.value == ''){
        comunicatField.innerHTML = 'VAT indentification number is needed to edit the customer';
        return;
    }

    let customer = customers.find(customer => customer.vat === vatInput.value );
    if(customer == null){
        comunicatField.innerHTML = 'There is no customer with the given VAT indentification number';
        return;
    }

    if(nameInput.value != ''){
        customer['name'] = nameInput.value;
        isThereEdit = true;
    }

    if(addressInput.value != ''){
        customer['address'] = addressInput.value;
        isThereEdit = true;
    }

    if(!isThereEdit){
        comunicatField.innerHTML = 'Enter name or address to edit';
    }

    clearFields();
    listCustomers();
}

function deleteCustomer(){
    comunicatField.innerHTML = '';
    if(vatInput.value == ''){
        comunicatField.innerHTML = 'VAT indentification number is needed to delete the customer';
        return;
    }

    const indexToDelete = customers.findIndex(customer => customer.vat === vatInput.value);

    if (indexToDelete > -1) {
        customers.splice(indexToDelete, 1);
    }

    clearFields();
    listCustomers();

}

function listCustomers(){
    vatContainer.innerHTML = '';
    nameContainer.innerHTML = '';
    addressContainer.innerHTML = '';

    for(let customer of customers){
        let vat = document.createElement('p');
        vat.textContent = customer.vat;
        vatContainer.appendChild(vat);

        let name = document.createElement('p');
        name.textContent = customer.name;
        nameContainer.appendChild(name);

        let address = document.createElement('p');
        address.textContent = customer.address;
        addressContainer.appendChild(address);
    }
}

function clearFields(){
    vatInput.value = '';
    nameInput.value = '';
    addressInput.value = '';
}

addButton.addEventListener("click", addCustomer);
editButton.addEventListener("click", editCustomer);
deleteButton.addEventListener("click", deleteCustomer);