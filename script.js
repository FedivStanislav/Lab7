document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");

  document.getElementById("home-link").addEventListener("click", () => {
    content.innerHTML = `
      <div class="text-center">
        <h1 class="display-5">Ласкаво просимо до каталогу товарів!</h1>
        <p class="lead">Оберіть категорію вгорі або перегляньте спеціальні пропозиції.</p>
      </div>`;
  });

  document.getElementById("catalog-link").addEventListener("click", loadCategories);
  document.getElementById("specials-link").addEventListener("click", loadRandomCategory);

  function loadCategories() {
    fetch("categories.json")
      .then(res => res.json())
      .then(categories => {
        let html = "<h2>Категорії:</h2><div class='list-group'>";
        categories.forEach(cat => {
          html += `<a href="#" class="list-group-item list-group-item-action category-link" data-shortname="${cat.shortname}">${cat.name}</a>`;
        });
        html += "</div>";
        content.innerHTML = html;

        document.querySelectorAll(".category-link").forEach(link => {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            const shortname = e.target.dataset.shortname;
            loadCategory(shortname);
          });
        });
      });
  }

  function loadCategory(shortname) {
    fetch(`${shortname}.json`)
      .then(res => res.json())
      .then(data => {
        let html = `<h2 class="mb-4 text-capitalize">${shortname}</h2><div class="row">`;
        data.forEach(item => {
          html += `
            <div class="col-md-4 mb-4">
              <div class="card h-100">
                <img src="https://place-hold.it/200x200?text=${item.shortname}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                </div>
                <div class="card-footer">
                  <strong>${item.price}</strong>
                </div>
              </div>
            </div>`;
        });
        html += "</div>";
        content.innerHTML = html;
      });
  }

  function loadRandomCategory() {
    fetch("categories.json")
      .then(res => res.json())
      .then(categories => {
        const random = categories[Math.floor(Math.random() * categories.length)];
        loadCategory(random.shortname);
      });
  }
});
