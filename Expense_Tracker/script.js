const list = document.getElementById("list");
const total = document.getElementById("total");
const addBtn = document.getElementById("addBtn");
let sum = 0;

addBtn.addEventListener("click", () => {
  const item = document.getElementById("item").value;
  const amount = Number(document.getElementById("amount").value);
  if (!item || !amount) return;

  const li = document.createElement("li");
  li.innerHTML = `${item} - ₹${amount} <button class="remove">X</button>`;
  list.append(li);

  sum += amount;
  total.textContent = sum;

  li.querySelector(".remove").addEventListener("click", () => {
    li.remove();
    sum -= amount;
    total.textContent = sum;
  });

  document.getElementById("item").value = "";
  document.getElementById("amount").value = "";
});
