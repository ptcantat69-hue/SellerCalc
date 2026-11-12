const $ = (id) => document.getElementById(id);
const num = (id) => {
  const value = Number($(id)?.value);
  return Number.isFinite(value) ? value : 0;
};
const money = (value, currency) => new Intl.NumberFormat(undefined,{style:"currency",currency:currency||"USD",maximumFractionDigits:2}).format(Number.isFinite(value)?value:0);
const readCurrency = () => $("currency")?.value || "USD";
const showResult = (html) => { $("result").innerHTML=html; $("result").classList.add("visible"); };
const error = (message) => showResult(`<div class="result-error">${message}</div>`);
const resultRow = (label,value,emphasis=false) => `<div class="result-row ${emphasis?"result-emphasis":""}"><span>${label}</span><strong>${value}</strong></div>`;
const field = (id) => $(id);
const form = $("calculator-form");
form?.addEventListener("submit",(event)=>{
  event.preventDefault();
  const page=document.body.dataset.calculator;
  const currency=readCurrency();
  if(page==="pricing"){
    const cost=num("unit-cost"), packaging=num("packaging"), labor=num("labor"), overhead=num("overhead"), fee=num("fee")/100, margin=num("margin")/100;
    const total=cost+packaging+labor+overhead;
    if(total<0||fee<0||fee>=1||margin<0||margin>=1)return error("Please use non-negative costs and percentages below 100%.");
    const price=total/(1-fee-margin);
    if(!Number.isFinite(price)||price<=0)return error("Please enter a total cost greater than zero and valid percentages.");
    const feeAmount=price*fee, profit=price-total-feeAmount;
    showResult(`<div class="result-kicker">RECOMMENDED SELLING PRICE</div><div class="result-big">${money(price,currency)}</div><div class="result-rows">${resultRow("Total product cost",money(total,currency))}${resultRow("Estimated selling fee",money(feeAmount,currency))}${resultRow("Estimated profit per unit",money(profit,currency),true)}${resultRow("Profit margin",`${(profit/price*100).toFixed(1)}%`)}</div><p class="result-note">This estimate assumes the selling fee is a percentage of the selling price and excludes taxes unless included in your costs.</p>`);
  } else if(page==="margin"){
    const revenue=num("revenue"), costs=num("costs"), fees=num("fees");
    const total=costs+fees;
    if(revenue<=0||costs<0||fees<0)return error("Enter revenue greater than zero and non-negative costs.");
    const profit=revenue-total, margin=profit/revenue*100, markup=total>0?profit/total*100:0;
    showResult(`<div class="result-kicker">NET PROFIT</div><div class="result-big">${money(profit,currency)}</div><div class="result-rows">${resultRow("Revenue",money(revenue,currency))}${resultRow("Total costs and fees",money(total,currency))}${resultRow("Profit margin",`${margin.toFixed(2)}%`,true)}${resultRow("Markup on costs",`${markup.toFixed(2)}%`)}</div><p class="result-note">${profit>=0?"You are making a profit based on the figures entered.":"Your costs exceed your revenue. Review your price or costs."}</p>`);
  } else if(page==="breakeven"){
    const fixed=num("fixed"), price=num("price"), variable=num("variable");
    const contribution=price-variable;
    if(fixed<0||price<=0||variable<0||contribution<=0)return error("Selling price must be greater than variable cost, and fixed costs cannot be negative.");
    const units=Math.ceil(fixed/contribution), revenue=units*price;
    showResult(`<div class="result-kicker">UNITS TO BREAK EVEN</div><div class="result-big">${units.toLocaleString()} <small>units</small></div><div class="result-rows">${resultRow("Contribution per unit",money(contribution,currency))}${resultRow("Break-even sales revenue",money(revenue,currency),true)}${resultRow("Fixed costs",money(fixed,currency))}${resultRow("Contribution margin",`${(contribution/price*100).toFixed(1)}%`)}</div><p class="result-note">You need to sell at least ${units.toLocaleString()} units to cover the fixed and variable costs entered. This is an estimate, not a forecast.</p>`);
  } else if(page==="hourly"){
    const income=num("income"), expenses=num("expenses"), hours=num("hours"), weeks=num("weeks"), buffer=num("buffer")/100;
    if(income<0||expenses<0||hours<=0||weeks<=0||buffer<0||buffer>=1)return error("Enter positive working hours and weeks, and a buffer below 100%.");
    const annual=(income+expenses)/(1-buffer), billable=hours*weeks, rate=annual/billable;
    showResult(`<div class="result-kicker">SUGGESTED HOURLY RATE</div><div class="result-big">${money(rate,currency)} <small>/ hour</small></div><div class="result-rows">${resultRow("Annual income goal",money(income,currency))}${resultRow("Annual business expenses",money(expenses,currency))}${resultRow("Billable hours per year",billable.toLocaleString())}${resultRow("Annual target including buffer",money(annual,currency),true)}</div><p class="result-note">This is a planning estimate before personal income taxes. Your actual rate may need to account for unpaid leave, retirement, insurance and local tax rules.</p>`);
  } else if(page==="shipping"){
    const product=num("product"), customer=num("customer-shipping"), carrier=num("carrier"), packaging=num("packaging"), order=num("order-price"), fee=num("fee")/100;
    if([product,customer,carrier,packaging,order,fee].some(v=>v<0)||fee>=1)return error("Enter non-negative amounts and a platform fee below 100%.");
    const feeAmount=order*fee, shippingNet=customer-carrier-packaging, profit=order+customer-product-carrier-packaging-feeAmount;
    showResult(`<div class="result-kicker">PROFIT AFTER SHIPPING</div><div class="result-big">${money(profit,currency)}</div><div class="result-rows">${resultRow("Shipping collected",money(customer,currency))}${resultRow("Carrier + packaging",money(carrier+packaging,currency))}${resultRow("Shipping surplus / shortfall",money(shippingNet,currency),true)}${resultRow("Platform fee",money(feeAmount,currency))}</div><p class="result-note">Order profit includes the product cost, carrier charge, packaging and platform fee. It excludes other overheads, refunds and taxes.</p>`);
  }
});
form?.addEventListener("reset",()=>{setTimeout(()=>{$("result").classList.remove("visible");$("result").innerHTML="";},0)});
