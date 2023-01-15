// Написать страницу, в которой реализована форма с одним полем ввода (id). При отправке формы должен происходить асинхронный запрос на сервер. На основе полученных данных необходимо отобразить информацию о товаре. 
// ссылка для запросов https://fakestoreapi.com/products/1 (последний параметр - id продукта).
// Дизайн на ваше усмотрение, но он должен быть.

const add_form = document.querySelector('form');
const container = document.querySelector('.container');

// отправкa запроса на сервер
function getFetchRequest(id){
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(response => response.json())
    .then(({ title, price, description, category, image, rating }) =>
    createCardProduct(title, price, description, category, image, rating),
    () =>{
       alert('Введите ID товара от 1 до 20')
    }
    );
}

//вешаем слушатель события на отправку формы
add_form.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = +event.target.id.value
    if(id>20){
        alert('Введите ID товара от 1 до 20')
    }
    getFetchRequest(id);
    event.target.id.value = '';
})

//создаем карточку товара
function createCardProduct(title, price, description, category, image, rating){
    const product = document.createElement('div');
    const title_p = document.createElement('h4');
    const category_p = document.createElement('p');
    const info_p = document.createElement('p');
    const img = document.createElement('img');
    const price_p = document.createElement('p');
    const rating_div = document.createElement('div');
    const rate_p = document.createElement('p');
    const count = document.createElement('p');

    rating_div.append(rate_p, count);
    product.append(title_p, category_p, info_p, img, price_p, rating_div);
    container.append(product);


    product.classList.add('product');
    title_p.classList.add('title');
    category_p.classList.add('category');
    info_p.classList.add('info');
    img.classList.add('img');
    price_p.classList.add('price');
    rating_div.classList.add('rating');
    rate_p.classList.add('score');
    count.classList.add('count');

    title_p.innerText = title;
    category_p.innerText = `category: ${category}`;
    info_p.innerHTML = `<span> Description: </span> <br> ${description}`;
    img.src = image;
    price_p.innerText = `${price}`;
    rate_p.innerHTML = `<i class="las la-star"></i> ${rating.rate}`;
    count.innerText = `in stock: ${rating.count}`;
}