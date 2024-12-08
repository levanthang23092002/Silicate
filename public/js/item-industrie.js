if (typeof URLSearchParams !== 'undefined') {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'vi';
  const id = urlParams.get('id')
  fetch(`/api/products/detail?lang=${lang}&id=${id}`)
    .then((response) => response.json())
    .then((response) => {
      document.getElementById("product-name").textContent = response.data.name;
      document.getElementById("product-description").textContent = response.data.description;
      document.getElementById("product-name-highlight").textContent = response.data.name;
      document.getElementById("product-name-photos").textContent = response.data.name;

      const benefitsList = document.getElementById("product-benefits");
      benefitsList.innerHTML = ""; // Clear the benefits list before appending new items

      for (let i = 1; i <= 5; i++) {
        const benefitKey = `benefits${i}`;
        if (response.data[benefitKey]) { // Corrected this part
          const li = document.createElement("li");
          li.textContent = response.data[benefitKey]; // Corrected this part
          benefitsList.appendChild(li);
        }
      }

      const productImage = document.getElementById("product-image");
      productImage.src = response.data.image;
      productImage.alt = response.data.name;
    })
    .catch((error) => console.log("Error fetching product detail:", error));

  // Lấy danh sách sản phẩm
  fetch(`/api/products?lang=${lang}`)
    .then((response) => response.json())
    .then((data) => {
      const productList = document.getElementById("product-list");
      productList.innerHTML = ""; // Clear list before appending new items
      data.data.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="item-industries?id=${item.id}&lang=${lang}">${item.name}</a>`;
        productList.appendChild(listItem);
      });
    })
    .catch((error) => console.log("Error fetching product list:", error));
} else {
  console.log('URLSearchParams is not supported in this browser.');
}
