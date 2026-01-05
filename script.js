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

  // Amazon検索URLの構築
  let baseUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(query)}`;

  // パラメータ追加
  if (category !== "aps") baseUrl += `&i=${category}`;
  if (sort) baseUrl += `&s=${sort}`;
  if (isPrime) baseUrl += `&rh=p_76%3A410811011`; // Prime対象フィルタ

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
