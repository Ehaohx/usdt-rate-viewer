let rawData = {};
let currentFilter = "all";

async function fetchData() {
  try {
    const res = await fetch("/api/rate");  // 此处应替换为实际接口路径
    const data = await res.json();
    rawData = data;
    render();
  } catch (err) {
    document.getElementById("binance").innerText = "加载失败";
    document.getElementById("okx").innerText = "加载失败";
  }
}

function filterData(method) {
  currentFilter = method;
  render();
}

function render() {
  ["binance", "okx"].forEach(platform => {
    const box = document.getElementById(platform);
    const list = rawData[platform] || [];
    const filtered = list.filter(item => 
      currentFilter === "all" || item.payment.includes(currentFilter)
    );
    if (filtered.length === 0) {
      box.innerText = "无符合条件的数据";
      return;
    }
    box.innerText = filtered.map((item, i) => {
      return `${i+1}) ${item.price}  ${item.name} [${item.payment.join("+")}]`;
    }).join("\n");
  });
}

fetchData();