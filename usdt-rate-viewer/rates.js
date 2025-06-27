let currentFilter = 'all';
let raw = { binance: [], okx: [] };

async function fetchData() {
  try {
    const res = await fetch("/api/rate"); // 实际接口替换此地址
    const data = await res.json();
    raw = data;
    render();
  } catch (err) {
    document.getElementById("binance").innerText = "加载失败";
    document.getElementById("okx").innerText = "加载失败";
  }
}

function setFilter(f) {
  currentFilter = f;
  render();
}

function render() {
  ['binance', 'okx'].forEach(platform => {
    const box = document.getElementById(platform);
    const list = raw[platform] || [];
    const filtered = list.filter(item =>
      currentFilter === 'all' || item.payment.includes(currentFilter)
    );
    if (filtered.length === 0) {
      box.innerText = "无符合条件的数据";
      return;
    }
    box.innerHTML = filtered.map((item, i) =>
      `<div class='line'>${i + 1}) ${item.price.padEnd(6)} ${item.name.padEnd(10)} ${item.payment.join(" ")}</div>`
    ).join("");
  });
}

fetchData();