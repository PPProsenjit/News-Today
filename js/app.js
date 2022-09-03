const loadAllCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('category-container');
   categories.forEach(category =>{
    const {category_name, category_id} = category;
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('col');
    categoryDiv.innerHTML = `
    <a class = 'btn' onclick="showcard('${category_id}')">${category_name}</a>
    `
    categoryContainer.appendChild(categoryDiv);
   })

}
const selectCategory= async (value) => {
    try {
        const category = `https://openapi.programming-hero.com/api/news/category/${value}`
        const res = await fetch(category)
        const data = await res.json();
        displayCategriOne(data.data);

    } catch (e) {
        console.log("some error");

    }


}
const showcard = (category_id) => {
    loadingSpinner(true);
    categorieOne(category_id);

}
selectCategory();
loadAllCategories();

