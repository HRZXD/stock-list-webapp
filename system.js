const form = document.querySelector('#form-mcontral');
let product_name = document.querySelector('#productn');
let price_product = document.querySelector('#pricep');
let per_piece = document.querySelector('#perpc');

function removeData(e){
    e.preventDefault();
    if(product_name.value.trim() !== "" || price_product.value.trim() !== "" || per_piece.value.trim() !== ""){
        product_name.value = "";
        price_product.value = "";
        per_piece.value = "";
    }
}

const scriptURL = '!!your url app script!!';
form.addEventListener("submit", e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
});
form.addEventListener("submit",removeData)

