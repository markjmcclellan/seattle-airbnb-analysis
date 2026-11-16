// Display the summary data prepared by analysis.py.

const roomFilter = document.getElementById("room-filter");
const numberFormat = new Intl.NumberFormat("en-US");

function drawHistogram(groupName) {
  const group = dashboardData.groups[groupName];
  const maxCount = Math.max(...group.histogram);
  const chart = document.getElementById("histogram");

  chart.innerHTML = "";
  group.histogram.forEach((count, index) => {
    const column = document.createElement("div");
    column.className = "hist-item";
    const height = maxCount ? (count / maxCount) * 100 : 0;
    column.innerHTML = `
      <div class="bar" style="height: ${height}%" title="${dashboardData.bins[index]}: ${numberFormat.format(count)} listings"></div>
      <span class="bar-label">${dashboardData.bins[index]}</span>
    `;
    chart.appendChild(column);
  });
}

function drawBars(elementId, values) {
  const chart = document.getElementById(elementId);
  const maxValue = Math.max(...values.map(item => item.price));
  chart.innerHTML = "";

  values.forEach(item => {
    const row = document.createElement("div");
    row.className = "horizontal-row";
    const width = (item.price / maxValue) * 100;
    row.innerHTML = `
      <span>${item.label}</span>
      <div class="track"><div class="fill" style="width: ${width}%"></div></div>
      <strong>$${item.price.toFixed(item.price % 1 ? 1 : 0)}</strong>
    `;
    chart.appendChild(row);
  });
}

function drawCorrelations() {
  const chart = document.getElementById("correlation-chart");
  chart.innerHTML = "";
  dashboardData.correlations.forEach(item => {
    const row = document.createElement("div");
    row.className = "correlation-row";
    row.innerHTML = `
      <span>${item.label}</span>
      <div class="track"><div class="fill ${item.value < 0 ? "negative" : ""}" style="width: ${Math.abs(item.value) * 100}%"></div></div>
      <strong>${item.value.toFixed(2)}</strong>
    `;
    chart.appendChild(row);
  });
}

function updateRoomFilter() {
  const room = roomFilter.value;
  const group = dashboardData.groups[room];
  document.getElementById("listing-count").textContent = numberFormat.format(group.count);
  document.getElementById("median-price").textContent = `$${group.median.toFixed(group.median % 1 ? 1 : 0)}`;
  document.getElementById("under-150").textContent = `${group.under150.toFixed(1)}%`;
  document.getElementById("current-room").textContent = room;
  drawHistogram(room);
}

roomFilter.addEventListener("change", updateRoomFilter);
drawBars("room-chart", dashboardData.roomMedians);
drawBars("bedroom-chart", dashboardData.bedroomMedians);
drawCorrelations();
document.getElementById("test-r2").textContent = dashboardData.model.r2.toFixed(3);
document.getElementById("test-mae").textContent = `$${dashboardData.model.mae.toFixed(2)}`;
updateRoomFilter();
