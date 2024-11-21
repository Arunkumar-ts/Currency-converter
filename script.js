let api=`0c12b3a6b379cdca939f30f8`;
fetch(`https://v6.exchangerate-api.com/v6/${api}/latest/usd`)
.then(responce => responce.json())
.then(data=>displayselects(data))

let select1=document.getElementById('select1');
let select2=document.getElementById('select2');

function displayselects(data){
    let countries=Object.entries(data)[8][1];
    let onlycountries=Object.entries(countries);
    for(let i=0;i<onlycountries.length;i++){
        let opt=`<option value="${onlycountries[i][0]}">${onlycountries[i][0]}</option>`;
        select1.innerHTML+=opt;
        select2.innerHTML+=opt;
    }
}
let outputdata=document.getElementById('outputdata');
let btn=document.getElementById('btn');
var inputvalue;
btn.addEventListener('click',()=>{
    var inputdata=document.getElementById('inputdata');
    let country1=select1.value;
    let country2=select2.value;
    inputvalue=inputdata.value;
    if(country1=="FROM" || country2=="TO" ||Number(inputvalue)<=0){
        outputdata.value="Enter the Amount";
    }
    else{
        convert(country1,country2,inputvalue);
    }
});

function convert(curr1,curr2,amount){
    fetch(`https://v6.exchangerate-api.com/v6/${api}/pair/${curr1}/${curr2}`)
    .then(res=>res.json())
    .then((data)=>{
        let ans=Object.entries(data)[9][1];
        ans=ans*amount
        if(inputvalue && Number(inputvalue)>0){
            outputdata.value=`${inputvalue} ${curr1} = ${ans} ${curr2}`;
        }
        else{
            outputdata.value="Enter the Amount";
        }
    });
}  

function clearfn(){
    location.reload();
}