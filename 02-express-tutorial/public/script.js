const searchForm = document.getElementById("search-form");
const searchResults = document.getElementById("results");

searchForm.addEventListener("submit", (e) => {
  searchResults.innerHTML = "";
  e.preventDefault();

  const formData = new FormData(searchForm);
  const params = new URLSearchParams(formData);
  const query = params.toString();

  fetch(`/api/v1/query?${query}`)
    .then((response) => {
      return response.json();
    })
    .then((newProducts) => {
      newProducts.map((product) => {
        let item = document.createElement("li");
        item.innerHTML = `
            <h3>Name: ${product.name}</h3>
            <p>Price: $${product.price}</p>
            <p>Description: ${product.desc}</p>
            `;
        searchResults.append(item);
      });
    });
});
