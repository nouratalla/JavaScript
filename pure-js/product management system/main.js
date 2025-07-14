//inputs
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');

let mood = 'create'
let tempIndex




//buttons
let submit = document.getElementById('submit');

let productsData;
if (localStorage.product != null){
    productsData = JSON.parse(localStorage.product);
}else{
    productsData = [];
}

//read data from local storage
readData();



//get total price of the product 
function getTotalPrice () {
    if(price.value != ''){
        let result = ( +price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#DA8359';
        total.style.color = '#FCFAEE';
    }else {
        total.innerHTML = '';
        total.style.background = '#A5B68D';
        total.style.color = '#FCFAEE';
    }
}


//create product 
submit.onclick = function(){
  let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (mood === 'create'){
        if (newProduct.count > 1){
        for (let i = 0 ; i < newProduct.count ; i ++){
            productsData.push(newProduct);
        }

        }else {
            productsData.push(newProduct);
        }
    }else{
        productsData[tempIndex] = newProduct;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';

    }
    localStorage.setItem('product',JSON.stringify(productsData));
    clearInputsData();
    readData();
};

//clear inputs data after create new product
function clearInputsData () {
        title.value = '',
        price.value = '',
        taxes.value = '',
        ads.value = '',
        discount.value = '',
        total.value = '',
        count.value = '',
        category.value = ''
};

//read products 
function readData(){
    getTotalPrice();
    let table = ''
    for (let i = 0 ; i < productsData.length ; i++ ){
        table +=`
            <tr>
                        <td>${i}</td>
                        <td>${productsData[i].title}</td>
                        <td>${productsData[i].price}</td>
                        <td>${productsData[i].taxes}</td>
                        <td>${productsData[i].ads}</td>
                        <td>${productsData[i].discount}</td>
                        <td>${productsData[i].total}</td>
                        <td>${productsData[i].category}</td>
                        <td><button onclick="updateProduct(${i})"  id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
        `
    }

    document.getElementById('tableBody').innerHTML = table;
    let div = document.getElementById('deleteAllProducts');
    if  (productsData.length > 0 ){
        div.innerHTML = 
        `
        <button onclick="deleteAllProducts()" id="deleteAllProductsBtn">Delete All (${productsData.length})</button>
        `;
    }else{
        div.innerHTML = '';
    }
}

//delete one product 
function deleteProduct(porductIndex){
    productsData.splice(porductIndex,1);
    localStorage.product = JSON.stringify(productsData);
    readData();
}

//delete all products
function deleteAllProducts(){
    localStorage.clear();
    productsData.splice(0);
    readData();
}

//update product
function updateProduct(productIndex){

        // show data in input fields
        title.value = productsData[productIndex].title,
        price.value = productsData[productIndex].price,
        taxes.value = productsData[productIndex].taxes,
        ads.value = productsData[productIndex].ads,
        discount.value = productsData[productIndex].discount,
        total.innerHTML = productsData[productIndex].total,
        count.value = productsData[productIndex].count,
        category.value = productsData[productIndex].category

        getTotalPrice();

        count.style.display = 'none';
        submit.innerHTML = 'update';
        mood = 'update';
        tempIndex = productIndex;
        window.scroll({
            top:0,
            behavior:'smooth',
        })


}


//searh product
let searchMood = 'title';
function getSearchMood(id){
    let searchInput = document.getElementById('search');

    if (id === 'searchTitle') {
        searchMood = 'title';
    }else {
        searchMood = 'category';
        
    }
    searchInput.placeholder = 'Search By ' + searchMood;
    searchInput.focus();
    searchInput.value = '';
    readData();
}

function searchProduct(searchValue){
    let table;
    searchValue = searchValue.toLowerCase();

    for (let i = 0 ; i < productsData.length; i++ ){
    if (searchMood === 'title'){
            if(productsData[i].title.includes(searchValue)){
                table +=`
            <tr>
                        <td>${i}</td>
                        <td>${productsData[i].title}</td>
                        <td>${productsData[i].price}</td>
                        <td>${productsData[i].taxes}</td>
                        <td>${productsData[i].ads}</td>
                        <td>${productsData[i].discount}</td>
                        <td>${productsData[i].total}</td>
                        <td>${productsData[i].category}</td>
                        <td><button onclick="updateProduct(${i})"  id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
        `;
            } 
    }else{
            if(productsData[i].category.includes(searchValue)){
                table +=`
            <tr>
                        <td>${i}</td>
                        <td>${productsData[i].title}</td>
                        <td>${productsData[i].price}</td>
                        <td>${productsData[i].taxes}</td>
                        <td>${productsData[i].ads}</td>
                        <td>${productsData[i].discount}</td>
                        <td>${productsData[i].total}</td>
                        <td>${productsData[i].category}</td>
                        <td><button onclick="updateProduct(${i})"  id="update">Update</button></td>
                        <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
        `;
            }
        }
}
    document.getElementById('tableBody').innerHTML = table;
}


