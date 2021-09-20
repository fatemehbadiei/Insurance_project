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
