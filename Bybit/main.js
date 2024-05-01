const inputValue = document.querySelector(".inp-search")
// const getPrice = async (crypto1) => {
//   try {
//       const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto1.toLowerCase()}&vs_currencies=usd`, {
//           method: "GET",
//           headers: {
//             'accept' : 'application/json',
//             'x-cg-demo-api-key': 'CG-ixnULvmT3ag4XHXmKcT5erSJ',
//           }
//       })
//       if (res.ok) {
//           const data = await res.json();
//           console.log(data.bitcoin.usd)
//           return data;

//       }
//   } catch (error) {
//       throw new Error(error);
//   }
// }
const ctx = document.querySelector('.chart');

const getPriceTwoMonth = async (crypto1) => {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto1.toLowerCase()}/market_chart?vs_currency=usd&days=14&interval=daily&precision=2`, {
      method: "GET",
      headers: {
        'accept': 'application/json',
        'x-cg-demo-api-key': 'CG-ixnULvmT3ag4XHXmKcT5erSJ',
      }
    })
    if (res.ok) {
      const data = await res.json();
      createChart(data, crypto1.toUpperCase(), ctx)
      return data;

    }
  } catch (error) {
    throw new Error(error);
  }
}

const createChart = (data1, name, chart) => {
  chart.innerHTML = `<canvas id="myChart"></canvas>`
  const ctx = document.getElementById('myChart');
  let datas = []
  let prices = []
  for (let i = 0; i < data1.prices.length; i++) {
    var date = new Date(data1.prices[i][0]);
    var month = date.getUTCMonth()+1;
    var day = date.getUTCDate();
    var year = date.getUTCFullYear()
    const fullDate = date.getUTCDate();
    datas.push(day + ":" + month + ":" + year);
    prices.push(data1.prices[i][1])
  }
  const labels = datas;
  const data = {
    labels: labels,
    datasets: [
      {
        label: name,
        data: prices,
      },
    ]
  };
  new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
        }
      }
    },
  });
}
inputValue.addEventListener("change", () => {
  getPriceTwoMonth(inputValue.value)
})