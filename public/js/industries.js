if (typeof URLSearchParams !== 'undefined') {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get('lang') || 'vi';

  const name = `item.name_${lang}`
fetch(`/api/products?lang=${lang}`)
  .then(response => response.json())
  .then(data => {
    const collection = document.getElementById('collection');
    collection.innerHTML = '';
    data.data.forEach(item => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('item');
      productDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="img-fluid">
        <h4>
          <a href="item-industries?id=${item.id}&lang=vi">${item.name}</a>
        </h4>
      `;
      collection.appendChild(productDiv);
    });
  })
  .catch(error => console.error('Error fetching products:', error));
} else {
  console.error('URLSearchParams is not supported in this browser.');
}


