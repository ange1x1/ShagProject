const inputValue = document.querySelector(".inp-search")
const ctx = document.querySelector('.chart');
const centerDiv = document.querySelector('.center')
const inputLeverege = document.querySelector('.inp-lev')
const marginBtn = document.querySelector('.margin-btn')
const textLeverage = document.querySelector('.leverage')
const wallet = document.querySelector('.wallet')
const orderqty = document.querySelector('.orderQtyVal')
const orderValue = document.querySelector('.orderValue')
const btnLong = document.querySelector('.btn-long')
const btnShort = document.querySelector('.btn-short')
const marketprice = document.querySelector('.text-price')
const poscont = document.querySelector('.pos1')
const btnShow = document.querySelector('.btn-show')
let positions =[
]
let lastprice;
let data2;
const getCurrencyPrice = async (crypto1) => {
    try {
          const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto1.toLowerCase()}&vs_currencies=usd`, {
                method: "GET",
                headers: {
                    'accept' : 'application/json',
                    'x-cg-demo-api-key': 'CG-ixnULvmT3ag4XHXmKcT5erSJ',
                  }
              })
              if (res.ok) {
                    const data = await res.json();
                    console.log(data.bitcoin.usd)
                    return data;
          
                }
            } catch (error) {
                  throw new Error(error);
              }
            }
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
      data2 = data
      lastprice = data.prices[14][1]
      return data;

    }
  } catch (error) {
    throw new Error(error);
  }
}

const createChart = (data1, name, chart) => {
  let accountBalance = localStorage.getItem("balance")
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
  wallet.textContent = `Balance:${accountBalance} USDT`
  marketprice.textContent = `Market price:${data1.prices[14][1]}`
  let labels = datas;
  labels[14]="NOW"
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
const posLong = (data1)=>{
  let accountBalance = localStorage.getItem("balance")
  let orderq = orderqty.value
  let accbalance = 0;
  accbalance = accountBalance
  if(orderq>+accbalance || orderq==0){
    orderqty.textContent =""
    alert("Недостаточно средств или Впишите количество валюты")
  }else{
    totalValue = Math.floor(orderq * inputLeverege.value)
    orderValue.textContent = `Order Value: ${totalValue} USDT`
    accbalance = accbalance -orderq
    localStorage.setItem("balance",accbalance)
    wallet.textContent = `Balance:${accountBalance} USDT`
    positions.push({
      margin : marginBtn.textContent,
      tokenname : inputValue.value,
      count : totalValue/data1.prices[14][1],
      orderval : totalValue,
      leverage : inputLeverege.value,
      direction : "long",
      buyprice : data1.prices[14][1]
    })
    localStorage.setItem("positions",JSON.stringify(positions))
  }
}
const posShort = (data1)=>{
  let accountBalance = localStorage.getItem("balance")
  let totalValue;
  let orderq = orderqty.value
  let accbalance = 0;
  accbalance = accountBalance
  if(orderq>+accbalance || orderq==0){
    orderqty.textContent =""
    alert("Недостаточно средств или Впишите количество валюты")
  }else{
    totalValue = Math.floor(orderq * inputLeverege.value)
    orderValue.value = `Order Value: ${totalValue} USDT`
    accbalance-=orderq
    localStorage.setItem("balance",accbalance)
    wallet.textContent = `Balance:${accountBalance} USDT`
    positions.push({
      margin : marginBtn.textContent,
      tokenname : inputValue.value,
      count : totalValue/data1.prices[14][1],
      orderval : totalValue,
      leverage : inputLeverege.value,
      direction : "short",
      buyprice : data1.prices[14][1]
    })
    localStorage.setItem("positions",JSON.stringify(positions))
  }
}
const posCard = ()=>{
  poscont.innerHTML=''
  const posInfo = JSON.parse(localStorage.getItem('positions'))
  if(localStorage.getItem('positions')==null){
    return
  }else{
    if(posInfo!=null){
      for(let i = 0;i<posInfo.length;i++){
        if(posInfo[i].tokenname == inputValue.value){
          if(posInfo[i].direction=="short"){
            const poscard1 = `
                    <div class="pos">
                        <div>
                            <h3 class="curtext curname">${posInfo[i].tokenname}</h3>
                            <h3 class="curtext">Profit:${((((posInfo[i].buyprice-lastprice).toFixed(2))*posInfo[i].leverage)*posInfo[i].count.toFixed(2)).toFixed(2)}$</h3>
                            <h3 class="curtext">${posInfo[i].margin}</h3>
                            <h3 class="curtext">Price Now:${lastprice}$</h3>
                            <h3 class="curtext curdirection">Direction: ${posInfo[i].direction}<div class=""></div></h3>
                        </div>
                        <h3 class="curtext curcount">Count: ${posInfo[i].count.toFixed(2)}</h3>
                        <h3 class="curtext">Sell Price: ${posInfo[i].buyprice}$</h3>
                        <h3 class="curtext curleverage">Leverage: ${posInfo[i].leverage}X</h3>
                        <h3 class="curtext curvalue">Position Value: ${posInfo[i].orderval}$</h3>
                    </div>
          `
          poscont.insertAdjacentHTML('beforeend',poscard1)
          }else{
            const poscard1 = `
            <div class="pos">
                <div>
                    <h3 class="curtext curname">${posInfo[i].tokenname}</h3>
                    <h3 class="curtext">Profit:${((((lastprice-posInfo[i].buyprice).toFixed(2))*posInfo[i].leverage)*posInfo[i].count.toFixed(2)).toFixed(2)}$</h3>
                    <h3 class="curtext">${posInfo[i].margin}</h3>
                    <h3 class="curtext">Price Now:${lastprice}$</h3>
                    <h3 class="curtext curdirection">Direction: ${posInfo[i].direction}<div class=""></div></h3>
                </div>
                <h3 class="curtext curcount">Count: ${posInfo[i].count.toFixed(2)}</h3>
                <h3 class="curtext">Buy Price: ${posInfo[i].buyprice}$</h3>
                <h3 class="curtext curleverage">Leverage: ${posInfo[i].leverage}X</h3>
                <h3 class="curtext curvalue">Position Value: ${posInfo[i].orderval}$</h3>
            </div>
  `
            poscont.insertAdjacentHTML('beforeend',poscard1)
          }
        }
      }
    }
  }
  positions = posInfo
  
}

btnShow.addEventListener("click",()=>{
  poscont.innerHTML=''
  const posInfo = JSON.parse(localStorage.getItem('positions'))
  positions = posInfo
  if(posInfo!=null){
    for(let i = 0;i<posInfo.length;i++){
      const poscard1 = `
                  <div class="pos">
                      <div>
                          <h3 class="curtext curname">${posInfo[i].tokenname}</h3>
                          <h3 class="curtext">${posInfo[i].margin}</h3>
                          <h3 class="curtext curdirection">Direction: ${posInfo[i].direction}<div class=""></div></h3>
                      </div>
                      <h3 class="curtext curcount">Count: ${posInfo[i].count.toFixed(2)}</h3>
                      <h3 class="curtext">Buy/Sell Price: ${posInfo[i].buyprice}$</h3>
                      <h3 class="curtext curleverage">Leverage: ${posInfo[i].leverage}X</h3>
                      <h3 class="curtext curvalue">Position Value: ${posInfo[i].orderval}$</h3>
                  </div>
      `
      poscont.insertAdjacentHTML('beforeend',poscard1)
    }
  }
})
inputValue.addEventListener("change", async() => {
  let accountBalance = localStorage.getItem("balance")
  if(accountBalance==null){
    localStorage.setItem("balance",10000)
  }
  centerDiv.classList.remove("hide")
  await getPriceTwoMonth(inputValue.value)
  posCard()
})
marginBtn.addEventListener("click",()=>{
  if(marginBtn.textContent == "Cross"){
    marginBtn.textContent = "Isoleted"
  }else{
    marginBtn.textContent = "Cross"
  }
})
inputLeverege.addEventListener('input',()=>{
  textLeverage.textContent = `Leverage:${inputLeverege.value}x`
})
btnLong.addEventListener('click',()=>{
  posLong(data2)
  posCard()
})
btnShort.addEventListener('click',()=>{
  posShort(data2)
  posCard()
})