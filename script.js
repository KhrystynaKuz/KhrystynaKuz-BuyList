document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".input");
    const addBtn = document.querySelector(".add-btn");
    const productList = document.querySelector(".first-column");
  
    const existingNameInputs = document.querySelectorAll(".product-name-input");
    const existingMinusButtons = document.querySelectorAll(".minus");
    const existingPlusButtons = document.querySelectorAll(".plus");
    const existingStatusButtons = document.querySelectorAll(".status-btn");
    const existingDeleteButtons = document.querySelectorAll(".delete");

    // Для існуючих назв продуктів
    existingNameInputs.forEach((nameInput) => {
        nameInput.addEventListener("click", () => {
            nameInput.readOnly = false;
            nameInput.focus();
            });
            nameInput.addEventListener("blur", () => {
            nameInput.readOnly = true;
            if (nameInput.value.trim() === "") {
            nameInput.value = "Без назви";
            }
            updateStatistics();
        });
    });
    // Для існуючих кнопок -
    existingMinusButtons.forEach((minusBtn) => {
        minusBtn.addEventListener("click", () => {
          const countSpan = minusBtn.nextElementSibling; 

          let count = parseInt(countSpan.textContent);
          if (count > 1) {
            count--;
            countSpan.textContent = count;
            if (count === 1) {
              minusBtn.disabled = true;
            }
          }
          updateStatistics();
        });
    });
    // Для існуючих кнопок +
    existingPlusButtons.forEach((plusBtn) => {
        plusBtn.addEventListener("click", () => {
          const countSpan = plusBtn.previousElementSibling;
          const minusBtn = countSpan.previousElementSibling;

          let count = parseInt(countSpan.textContent);
          count++;
          countSpan.textContent = count;

          if (count > 1) {
            minusBtn.disabled = false;
          }
          updateStatistics();
      });
    });
    // Для існуючих кнопок "Куплено"/ "Не куплено"
    existingStatusButtons.forEach((buyBtn) => {
      buyBtn.addEventListener("click", () => {
        const productRow = buyBtn.closest(".product-row");
        const nameInput = productRow.querySelector(".product-name-input") || productRow.querySelector(".product-name-crossed");
        const minusBtn = productRow.querySelector(".minus");
        const plusBtn = productRow.querySelector(".plus");
        const deleteBtn = productRow.querySelector(".delete");

        const isBought = productRow.classList.toggle("bought");

        if (isBought) {
          buyBtn.textContent = "Не куплено";
          buyBtn.setAttribute("data-tooltip", "Позначити як не куплене");

          if (minusBtn) minusBtn.style.display = "none";
          if (plusBtn) plusBtn.style.display = "none";
          if (deleteBtn) deleteBtn.style.display = "none";
        } else {
          buyBtn.textContent = "Куплено";
          buyBtn.setAttribute("data-tooltip", "Позначити як куплене");

          if (minusBtn) minusBtn.style.display = "inline-block";
          if (plusBtn) plusBtn.style.display = "inline-block";
          if (deleteBtn) deleteBtn.style.display = "inline-block";
        }
        updateStatistics();
      });
    });
    // Для існуючих кнопок "Видалити"
    existingDeleteButtons.forEach((deleteBtn) => {
        deleteBtn.addEventListener("click", () => {
        const productRow = deleteBtn.closest(".product-row");
        const prev = productRow.previousElementSibling;
            if (prev && prev.tagName === "HR") {
            productRow.parentNode.removeChild(prev);
            }
        productRow.remove();
        updateStatistics();
        });
    });

    // Функція створення нового рядка з даними про продукт
    function createProductElement(name) {
        const productRow = document.createElement("div");
        productRow.className = "product-row";
      
        // Назва
        const nameInput = document.createElement("input");
        nameInput.className = "product-name-input";
        nameInput.value = name;
        nameInput.readOnly = true;

        nameInput.addEventListener("click", () => {
        nameInput.readOnly = false;
        nameInput.focus();
        });
        nameInput.addEventListener("blur", () => {
        nameInput.readOnly = true;
        if (nameInput.value.trim() === "") {
        nameInput.value = "Без назви";
        }
        updateStatistics();
        });
      
        // Лічильник
        const counter = document.createElement("div");
        counter.className = "product-counter";
      
        const minusBtn = document.createElement("button");
        minusBtn.className = "minus";
        minusBtn.disabled = true;
        minusBtn.textContent = "−";
        minusBtn.setAttribute("data-tooltip", "Зменшити");

        minusBtn.addEventListener("click", () => {
            let count = parseInt(countSpan.textContent);
            if (count > 1) {
              count--;
              countSpan.textContent = count;
              if (count === 1) {
                minusBtn.disabled = true;
              }
            }
            updateStatistics();
          });          
      
        const countSpan = document.createElement("span");
        countSpan.className = "count";
        countSpan.textContent = "1";
      
        const plusBtn = document.createElement("button");
        plusBtn.className = "plus";
        plusBtn.textContent = "+";
        plusBtn.setAttribute("data-tooltip", "Збільшити");

        plusBtn.addEventListener("click", () => {
            let count = parseInt(countSpan.textContent);
            count++;
            countSpan.textContent = count;
          
            if (count > 1) {
              minusBtn.disabled = false;
            }
            updateStatistics();
          });
      
        counter.appendChild(minusBtn);
        counter.appendChild(countSpan);
        counter.appendChild(plusBtn);
      
        // Дії
        const actions = document.createElement("div");
        actions.className = "product-actions";
      
        const buyBtn = document.createElement("button");
        buyBtn.className = "status-btn";
        buyBtn.textContent = "Куплено";
        buyBtn.setAttribute("data-tooltip", "Позначити як куплене");
      
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "×";
        deleteBtn.setAttribute("data-tooltip", "Видалити");
      
        // "Куплено / Не куплено"
        buyBtn.addEventListener("click", () => {
          const isBought = productRow.classList.toggle("bought");
      
          if (isBought) {
            nameInput.style.textDecoration = "line-through";
            nameInput.style.color="gray";
            buyBtn.textContent = "Не куплено";
            buyBtn.setAttribute("data-tooltip", "Позначити як не куплене");
            minusBtn.style.display = "none";
            plusBtn.style.display = "none";
            deleteBtn.style.display = "none";
          } else {
            nameInput.style.textDecoration = "none";
            nameInput.style.color="black";
            buyBtn.textContent = "Куплено";
            buyBtn.setAttribute("data-tooltip", "Позначити як куплене");
            minusBtn.style.display = "inline-block";
            plusBtn.style.display = "inline-block";
            deleteBtn.style.display = "inline-block";
          }
          updateStatistics();
        });

        // Видалення
        deleteBtn.addEventListener("click", () => {
          const prev = productRow.previousElementSibling;
          if (prev && prev.tagName === "HR") {
            productRow.parentNode.removeChild(prev);
          }
          productRow.remove();
          updateStatistics();
        });
      
        actions.appendChild(buyBtn);
        actions.appendChild(deleteBtn);
      
        productRow.appendChild(nameInput);
        productRow.appendChild(counter);
        productRow.appendChild(actions);
      
        return productRow;
      }
      
    // Функція, яка додає новий продукт
    function addProduct() {
        const name = input.value.trim();
        if (name === "") return;
    
        const hr = document.createElement("hr");
        const newProduct = createProductElement(name);

        productList.appendChild(hr);
        productList.appendChild(newProduct);
    
        input.value = "";
        input.focus();
    }
  
    addBtn.addEventListener("click", addProduct);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addProduct();
      }
      updateStatistics();
    });

    // Функція оновлення статистики
    function updateStatistics() {
      const notBoughtList = document.getElementById("not-bought-list");
      const boughtList = document.getElementById("bought-list");

      notBoughtList.innerHTML = "";
      boughtList.innerHTML = "";

      const products = document.querySelectorAll(".product-row");

      products.forEach((productRow) => {
        const isBought = productRow.classList.contains("bought");
        const name = productRow.querySelector("input").value.trim() || "Без назви";
        const count = parseInt(productRow.querySelector(".count").textContent);

        const span = document.createElement("span");

        if (isBought) {
          span.className = "tag-crossed";
          span.innerHTML = `${name} <span class="tag-count-crossed">${count}</span>`;
          boughtList.appendChild(span);
        } else {
          span.className = "tag";
          span.innerHTML = `${name} <span class="tag-count">${count}</span>`;
          notBoughtList.appendChild(span);
        }
      });
    }
});