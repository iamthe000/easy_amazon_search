// フィルタパネルの表示/非表示切り替え
function toggleFilters() {
  const panel = document.getElementById("filterPanel");
  panel.classList.toggle("active");
}

// 検索実行
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value;
  if (!query.trim()) return;

  // フィルタ設定の取得
  const sort = document.getElementById("sortOrder").value;
  const category = document.getElementById("category").value;
  const isPrime = document.getElementById("primeOnly").checked;
  const minPrice = document.getElementById("minPrice").value;
  const maxPrice = document.getElementById("maxPrice").value;
  const freeShipping = document.getElementById("freeShipping").checked;

  // Amazon検索URLの構築
  let baseUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}`;
  let rhParams = [];

  // パラメータ追加
  if (category !== "aps") baseUrl += `&i=${category}`;
  if (sort) baseUrl += `&s=${sort}`;
  if (isPrime) rhParams.push("p_76:410811011"); // Prime対象
  if (freeShipping) rhParams.push("p_n_shipping_option-bin:2423875011"); // 送料無料
  
  if (minPrice && maxPrice) {
    rhParams.push(`p_36:${minPrice}00-${maxPrice}00`);
  } else if (minPrice) {
    rhParams.push(`p_36:${minPrice}00-`);
  } else if (maxPrice) {
    rhParams.push(`p_36:-${maxPrice}00`);
  }
  
  if (rhParams.length > 0) {
    baseUrl += `&rh=${encodeURIComponent(rhParams.join(","))}`;
  }

  window.location.href = baseUrl;
});

function luckySearch() {
  window.location.href = "https://www.amazon.co.jp/gp/bestsellers/";
}

// パネルの外をクリックしたら閉じる
document.addEventListener("click", (e) => {
  const panel = document.getElementById("filterPanel");
  const btn = document.querySelector(".apps-button");
  if (!panel.contains(e.target) && !btn.contains(e.target)) {
    panel.classList.remove("active");
  }
});
