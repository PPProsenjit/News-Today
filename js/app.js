const loadAllCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const { category_name, category_id } = category;
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('col');
        categoryDiv.innerHTML = `
    <a class = 'btn' onclick="showcard('${category_id}')">${category_name}</a>
    `
        categoryContainer.appendChild(categoryDiv);
    })

}
const selectCategory = async (id, element) => {
    try {
        const category = `https://openapi.programming-hero.com/api/news/category/${id}`
        const res = await fetch(category)
        const data = await res.json();
        showCardCat(data.data, element);
    } catch (e) {
        console.log("error!");

    }
}

const showCardCat = (data, element) =>{
    const newses = [];
    for(const news of data){
        newses.push(news);
    }
    newses.sort((x,y) => y.total_view-x.total_view);
    data = newses;
    displayCategriOne(data, element);
}
const showcard = (category_id) => {
    loadingSpinner(true);
    selectCategory(category_id);

}

const displayCategriOne = (data, element) => {
    const cardContainer = document.getElementById('news-conatainer');
    const footerAdd = document.getElementById('footer');
    cardContainer.textContent = ``;
    
    const listLength = data.length;
    if (listLength > 1) {
        footerAdd.classList.remove('d-none');
    }
    else {

        footerAdd.classList.add('d-none');
    }
    const valueInput = document.getElementById('selective-input');
    valueInput.innerHTML = `
    <h5>${listLength} Items Found</h5>`

    data.forEach(element => {
        // console.log(element);
        const { thumbnail_url, author, title, details, rating, total_view, _id } = element;
        const { img, name, published_date } = author;
        const { number } = rating;
        const div = document.createElement('div');
        div.classList.add('col')

        div.innerHTML = `
        <div class="col">
        <div class="card p-2 h-100 d-flex flex-md-row flex-sm-column">
            <img src="${thumbnail_url}" class="sm-w-100 md-w-50 rounded-start" alt="...">
            <div class="card-body mx-3">
            <h5 class="card-title">${title ? title : 'Not Found'}</h5>
        <p class="card-text">${details ? details.slice(0, 500) + "..." : "Not Found"}</p>
            <div class="d-flex justify-content-between align-items-center pt-4 ">

            <div class="d-flex flex-row ">
                <div>
                    <img id="profile-image" src="${img ? img : 'Not Found'}" class="rounded-circle img-fluid img-size" alt="...">
                </div>

                <div class="px-2">
                    <h6>${name ? name : 'not found'}</h6>
                    <h6 class="text-black-50">${published_date ? published_date : 'not found'}</h6>

                </div>

            </div>


            <div>
                <h6><i class="fa-regular fa-eye"></i> ${total_view ? total_view : 'not found'}</h6>

            </div>
            <div>
                <h6>${number ? number : 'not found'}</h6>

            </div>
            <div>
                <i class="fa-solid text-warning fa-star"></i>
                <i class="fa-solid text-warning fa-star"></i>
                <i class="fa-solid text-warning fa-star"></i>
                <i class="fa-solid text-warning fa-star"></i>
                <i class="fa-solid text-warning fa-star-half-stroke"></i>

            </div>

            <div onclick="modalFunction('${_id}')" data-bs-toggle="modal" data-bs-target="#portalModal">
                <i class="fa-solid fa-arrow-right text-primary"></i>
            </div>




        </div>

            </div>
            
            </div>
        </div>
    </div>
      `
        cardContainer.appendChild(div);
    });
    loadingSpinner(false);
}
const loadingSpinner = (isload) => {
    const load = document.getElementById('spinner');
    if (isload) {
        load.classList.remove('d-none');
    }
    else {
        load.classList.add('d-none');
    }
}
const loadModel = async (news_id) => {
    try {
        const category = `https://openapi.programming-hero.com/api/news/${news_id}`
        const res = await fetch(category)
        const data = await res.json();
        displayModel(data.data[0]);

    } catch (e) {
        console.log("error");

    }

}
const displayModel = (data) =>{
    const {author} = data;
    const {img, name} =author;
    const modalAdd = document.getElementById('add-model');
    modalAdd.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100 justify-content-center align-items-center p-3  ">
                    
        <img id= "card-image" src="${img}" class="card-img-top " alt="...">
        <div class="card-body mx-3">
          <h5 class="card-title">Author Name :${name ? name : 'Name not found'}</h5>
          <p class="card-text">${data.details}</p>
          
        </div>
        
      </div>`
    modalAdd.appendChild(div);
}

selectCategory("08");
loadAllCategories();

