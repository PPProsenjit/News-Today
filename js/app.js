const loadCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('category-container');
   categories.forEach(category =>{
    const {category_name} = category;
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('col');
    categoryDiv.innerHTML = `
    <a class = 'btn' >${category_name}</a>
    `
    categoryContainer.appendChild(categoryDiv);
   })
   

}
loadCategories();