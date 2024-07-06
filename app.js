const BaseUrl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdownSe = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btnexch");
const fromCurr = document.querySelector(".from");
const toCurr = document.querySelector(".to");
const message = document.querySelector(".exchange-message");
const body = document.querySelector("body");

window.addEventListener("load",()=>{
    updateExchangeRate();
});
for(let select of dropdownSe){
    for(let currCode in countryList){
        //console.log(currCode, countryList[currCode]);

        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }
        else if(select.name==="to" && currCode==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);

    }
    
    select.addEventListener("change",(evt) =>{
        updateFlag(evt.target);
    });

}

const updateFlag = (element)=>{
    let currCode = element.value;
    let countryCode= countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click" , (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
   
});

const updateExchangeRate = async ()=>{
    let amount = document.querySelector(".amount input");
    // console.log(toCurr.value.toLowerCase());
    if(amount.value == "" && amount.value <1){
        amount.value = 1;
    }

    let url =  `${BaseUrl}/${fromCurr.value.toLowerCase()}.json`;
    
    let data = await fetch(url);
    let dataJS = await data.json();
    // console.log(dataJS);

    let exchange = amount.value * dataJS[`${fromCurr.value.toLowerCase()}`][`${toCurr.value.toLowerCase()}`];
    message.innerText = `${amount.value}${fromCurr.value} = ${exchange}${toCurr.value}`;
}