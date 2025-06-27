// 模拟数据（后续替换为接口 fetch）
const mockHuobi = [
  { price: "7.16", name: "安妮小姐姐" },
  { price: "7.16", name: "沪上阿姨24小时" },
  { price: "7.17", name: "买我币会发财" },
  { price: "7.17", name: "大雄" },
  { price: "7.18", name: "USDT哥" },
];
const mockBinance = [
  { price: "7.20", name: "币安优选商家" },
  { price: "7.21", name: "小林同学" },
];
const mockOKX = [
  { price: "7.19", name: "OKX极速达" },
  { price: "7.20", name: "风中劲草" },
];

function renderRates(id, data) {
  const box = document.getElementById(id);
  box.innerHTML = "";
  data.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "rate-line";
    div.innerHTML = `<span>${index + 1}) ${item.price}</span> ${item.name}`;
    box.appendChild(div);
  });
}

renderRates("huobi-rates", mockHuobi);
renderRates("binance-rates", mockBinance);
renderRates("okx-rates", mockOKX);