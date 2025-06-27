let currentFilter = "all";

const sources = {
  huobi: "https://raw.githubusercontent.com/Ehaohx/usdt-rate-viewer/main/api/huobi.json",
  binance: "https://raw.githubusercontent.com/Ehaohx/usdt-rate-viewer/main/api/binance.json",
  okx: "https://raw.githubusercontent.com/Ehaohx/usdt-rate-viewer/main/api/okx.json",
};

async function loadRates() {
  for (let platform in sources) {
    try {
      const res = await fetch(sources[platform]);
      const data = await res.json();
      renderList(platform, data);
    } catch (e) {
      document.getElementById(platform + "-list").innerText = "加载失败";
    }
  }
}

function renderList(platform, data) {
  const box = document.getElementById(platform + "-list");
  const filtered = data.filter(item => {
    return currentFilter === "all" || item.payment.includes(currentFilter);
  });
  if (filtered.length === 0) {
    box.innerText = "无符合条件的数据";
    return;
  }
  box.innerText = filtered.map((item, i) =>
    `${i + 1}) ${item.price}  ${item.name}  ${item.payment.join(" ")}`
  ).join("\n");
}

function filterRates(type) {
  currentFilter = type;
  loadRates();
}

loadRates();
setInterval(loadRates, 60000);