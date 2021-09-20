//variables

const form = document.querySelector("#request-quote");
const html = new HTMLUI();


//eventListeners

eventListeners();

function eventListeners() {
    //make option tag for select
    document.addEventListener("DOMContentLoaded", function () {
        //display the <option> tag
        html.displayYear();
    });
    //submit form when click
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        //access to the value of every input
        const make = document.getElementById("make").value;
        const year = document.getElementById("year").value;
        const level = document.querySelector("input[name='level']:checked").value;

        //check all value of fields are correct
        if (make === "" || year === "" || level === "") {
            html.displayError("لطفا همه مقادیر به درستی وارد شود");
        } else {
            let resultDiv = document.querySelector("#result div");
            if (resultDiv !== null) {
                resultDiv.remove();
            }
            const insurance = new Insurance(make, year, level);
            const price = insurance.calculatePrice(insurance);
            html.showResult(price, insurance);
        }
    })
}


//objects

//every thing related to the insurance
function Insurance(make, year, level) {
    this.make = make ,
        this.year = year ,
        this.level = level
}

//calculating the price
Insurance.prototype.calculatePrice = function (info) {
    let price;
    let base = 2000000;
    //get the value of make
    let model = info.make;
    /*
    make:1 ==> pride 1.15
    make:2 ==> optima 1.30
    make:3 ==> porsche 1.80
     */
    switch (model) {
        case "1" :
            price = base * 1.15
            break;
        case "2" :
            price = base * 1.30
            break;
        case "3" :
            price = base * 1.80
            break;
    }

    //get value of year
    const buildingYear = info.year;
    const difference = this.getDifferenceYear(buildingYear);

    //3% cheaper for each year
    const discount = price - (((difference * 3) / 100) * price);

    //get value of level
    const kindOf = info.level;
    const final = this.calculateLevel(kindOf, discount);
    return final;
}
//get difference year
Insurance.prototype.getDifferenceYear = function (buildingYear) {
    //convert persian number to english number
    let
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
        fixNumbers = function (str) {
            if (typeof str === 'string') {
                for (var i = 0; i < 10; i++) {
                    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
            }
            return str;
        };


    //get max year

    const now = new Date().toLocaleDateString('fa-IR');
    let nowYear = now.slice(0, 4);
    let max = fixNumbers(nowYear);
    const differenceYear = max - buildingYear;
    return differenceYear;
}
//calculate price with level
Insurance.prototype.calculateLevel = function (kindOf, discount) {
    let count;
    if (kindOf === "basic") {
        count = discount * 1.30
    }
    if (kindOf === "complete") {
        count = discount * 1.50
    }
    return count;
}

//every thing related to the html

function HTMLUI() {
}
//display year

HTMLUI.prototype.displayYear = function () {
    //convert persian number to english number
    let
        persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
        arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
        fixNumbers = function (str) {
            if (typeof str === 'string') {
                for (var i = 0; i < 10; i++) {
                    str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
                }
            }
            return str;
        };


    //get max year

    const now = new Date().toLocaleDateString('fa-IR');
    let nowYear = now.slice(0, 4);
    let max = fixNumbers(nowYear);

    //get min year
    let min = max - 20;

    //access to select tag
    let selectYear = document.querySelector("#year");

    //creat for loop for creat option tag

    for (let i = max; i >= min; i--) {

        //creat option tag
        let option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        //append option to the parent
        selectYear.appendChild(option);
    }
}

//display error when fields are empty
HTMLUI.prototype.displayError = function (err) {
    const div = document.createElement("div");
    div.classList = "error";
    div.innerText = err;

    //insert div to the form
    form.insertBefore(div, document.querySelector(".form-group"));

    //remove error after 3 seconds
    setTimeout(() => {
        document.querySelector(".error").remove();
    }, 3000)
}



//display factor of the form

HTMLUI.prototype.showResult = function (price, info) {
    //access to the div result
    const result = document.querySelector("#result");

    //create div for showing price
    const div = document.createElement("div");

    //convert make value to the persian
    //get the value of make
    let model = info.make;
    /*
    make:1 ==> pride
    make:2 ==> optima
    make:3 ==> porsche
     */
    switch (model) {
        case "1" :
            model = "پراید"
            break;
        case "2" :
            model = "اپتیما"
            break;
        case "3" :
            model = "پورشه"
            break;
    }
    //convert level to the persian
    let kindOf = info.level;
    if (kindOf === "basic") {
        kindOf = "ساده";
    }
    if (kindOf === "complete") {
        kindOf = "کامل";
    }

    div.innerHTML = `
    <p class="header">خلاصه فاکتور</p>
    <p>مدل ماشین : ${model}</p>
    <p>سال ساخت : ${info.year}</p>
    <p>نوع بیمه  : ${kindOf}</p>
    <p class="total">قیمت نهایی: ${price}</p>
    `
    //access to spinner
    const spinner = document.querySelector("#loading img");
    spinner.style.display = "block";
    //show spinner for a second and after show result
    setTimeout(() =>{
        //hide spinner
        spinner.style.display = "none";
        //append div to result
        result.appendChild(div);
    },1000)

}















