fetch("./dataBase.json")
    .then(response => response.json())
    .then(data => {

        let companyLogoArea = document.querySelector(".logo");
        companyLogoArea.src = data.companyLogo;

        let heroBannerAera = document.querySelector(".h-banner-image");
        heroBannerAera.src = data.heroBanner

        document.documentElement.dir !=="rtl"
        ? document.body.style.fontFamily = "outfit"
        : document.body.style.fontFamily = ""

  let flightsArea = document.querySelector(".flights-Area");

data.flights.forEach(flight => {

    let fCard = document.createElement("div");
    let fFrom = document.createElement("p");
    let fTo = document.createElement("p");
    let fFlightNumber = document.createElement("p");
    let fDuration = document.createElement("p");
    let fPrice = document.createElement("p");

    fCard.className = "grid grid-cols-6 grid-rows-1 border-b-1"
    fFrom.textContent = flight.from.english;
    fTo.textContent = flight.to.english;
    fFlightNumber.textContent = flight.flightNumber;
    fDuration.textContent = flight.duration;
    fPrice.textContent = `$${flight.price}`;

    fCard.append(
        fFrom,
        fTo,
        fFlightNumber,
        fDuration,
        fPrice
    );

    flightsArea.append(fCard);
});

        let fromInput = document.querySelector(".from-input");
        let toInput = document.querySelector(".to-input");
        let departureInput =  document.querySelector(".departure-input");
        let returninput = document.querySelector(".return-input");
        let passengerInput = document.querySelector(".passengers-input");

        let fromCities = [];
        let toCities = [];
        let departure = []
        let returnO = []
        let passenger = []
        data.flights.forEach(flight => {

            if (!fromCities.includes(flight.from.english)) {

                fromCities.push(flight.from.english);

                let option = document.createElement("option");

                option.value = flight.from.english;
                option.textContent = flight.from.english;
                fromInput.append(option);
            }

            if (!toCities.includes(flight.to.english)) {

                toCities.push(flight.to.english);

                let option = document.createElement("option");

                option.value = flight.to.english;
                option.textContent = flight.to.english;

                toInput.append(option);
            }

            
        });

        let searchBtn = document.querySelector(".search-flights");
        let flightResult = document.querySelector(".flights-Area");
        searchBtn.addEventListener("click", () => {
        flightResult.innerHTML = ""
        let fromCity = fromInput.value;
        let toCity = toInput.value;
        let passengerNum = Number(passengerInput.value)
        let departureDate = departureInput.value
        let returnODate = returninput.value

        console.log(fromCity);
        console.log(toCity);

            let results = data.flights.filter(flight => {
            return flight.from.english === fromCity &&
            flight.to.english === toCity&&
            flight.departure === departureDate&&
            flight.return === returnODate&&
            flight.passengers === passengerNum
            });
            console.log(results);
            if(results.length === 0){
                let error = document.createElement("p")
                error.textContent = `Cant Find Any Flight from '${fromCity}' To '${toCity} with ${passengerNum} Passengers and ${returnODate} Return Date and ${departureDate} departure Date `
                flightResult.append(error)
            } else {

    results.forEach(result => {

        let output = document.createElement("div");

        output.className =
            "group relative w-full mb-5 overflow-hidden rounded-3xl border border-[#1597D4]/15 bg-white p-6 shadow-[0_10px_35px_rgba(7,26,43,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1597D4]/35 hover:shadow-[0_18px_45px_rgba(21,151,212,0.15)]";

        output.innerHTML = `
            <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div class="flex-1">

                    <div class="mb-4 flex items-center justify-between">
                        <span class="rounded-full bg-[#1597D4]/10 px-3 py-1 text-sm font-semibold text-[#1597D4]">
                            ${result.flightNumber}
                        </span>

                        <span class="text-sm font-medium text-gray-500">
                            ${result.airline}
                        </span>
                    </div>

                    <div class="flex items-center gap-5">

                        <div>
                            <p class="text-2xl font-bold text-[#071A2B]">
                                ${result.from.english}
                            </p>

                            <p class="mt-1 text-sm text-gray-500">
                                ${result.departure}
                            </p>
                        </div>

                        <div class="flex flex-1 items-center gap-3">
                            <span class="h-px flex-1 bg-[#1597D4]/25"></span>

                            <span class="text-xl text-[#1597D4]">
                                →
                            </span>

                            <span class="h-px flex-1 bg-[#1597D4]/25"></span>
                        </div>

                        <div class="text-right">
                            <p class="text-2xl font-bold text-[#071A2B]">
                                ${result.to.english}
                            </p>

                            <p class="mt-1 text-sm text-gray-500">
                                ${result.duration}
                            </p>
                        </div>

                    </div>

                </div>

                <div class="flex items-center justify-between gap-6 border-t border-gray-100 pt-5 md:min-w-[190px] md:flex-col md:items-end md:border-t-0 md:border-l md:pl-6 md:pt-0">

                    <div>
                        <p class="text-xs font-medium uppercase tracking-wider text-gray-400">
                            From
                        </p>

                        <p class="text-3xl font-extrabold text-[#071A2B]">
                            $${result.price}
                        </p>
                    </div>

                    <button
                        class="rounded-xl bg-[#1597D4] px-5 py-3 font-semibold text-white shadow-md shadow-[#1597D4]/20 transition-all duration-300 hover:bg-[#0d83bb] hover:shadow-lg hover:shadow-[#1597D4]/30 active:scale-95"
                    >
                        Book Flight
                    </button>

                </div>

            </div>
        `;

        flightResult.append(output);
    });
}
        });
// ==============================
// AEROVA AUTH SYSTEM
// ==============================

const authModal = document.querySelector("#aerova-auth-modal");
const authClose = document.querySelector("#aerova-auth-close");

const loginView = document.querySelector("#aerova-login-view");
const registerView = document.querySelector("#aerova-register-view");

const showRegister = document.querySelector("#aerova-show-register");
const showLogin = document.querySelector("#aerova-show-login");

const loginForm = document.querySelector("#aerova-login-form");
const registerForm = document.querySelector("#aerova-register-form");

const emailInput = document.querySelector("#aerova-login-email");
let emailvalid = document.querySelector(".validation");
emailInput.addEventListener("input", ()=>{
    let emailvalue = emailInput.value

    if(emailvalue === ""){
        emailvalid.classList.add('hidden')
    }
    else{
        emailvalid.classList.remove("hidden")
    }
if (emailvalue.endsWith("@gmail.com")){
    emailvalid.textContent = `${emailvalue} all good 👍`
    emailvalid.classList.remove(
    "text-red-400",
    "bg-red-400/5",
    "border-red-400/10"
);
}
else{
    emailvalid.textContent = `${emailvalue} Cannot Be a email !!  `
    emailvalid.classList.add(
    "text-emerald-400",
    "bg-emerald-400/5",
    "border-emerald-400/10"
);
}
console.log(emailvalue);
})
let nameValid = document.querySelector(".name-valid");
let nameInput = document.querySelector("#name-input");
nameInput.addEventListener("input", () => {
    let truevalue = nameInput.value

    if (truevalue === ""){
        nameValid.classList.add("hidden")
    }
    else{
        nameValid.classList.remove("hidden")
    }
    if (truevalue.length <= 4){

    nameValid.textContent = "PLS take longer name"

    } 

    else{
         nameValid.classList.remove(
    "text-red-400",
    "bg-red-400/5",
    "border-red-400/10"
    );
      nameValid.classList.add(
    "text-emerald-400",
    "bg-emerald-400/5",
    "border-emerald-400/10"
        );
    nameValid.textContent = `nice to meet you ${truevalue}`

    }
})

// Open Modal
document.querySelectorAll(".login-btn").forEach((button) => {

    button.addEventListener("click", () => {

        authModal.classList.remove("hidden");
        authModal.classList.add("flex");

        document.body.classList.add("overflow-hidden");

        // Always start from login
        loginView.classList.remove("hidden");
        registerView.classList.add("hidden");

    });

});


// Close Modal
function closeAuth() {

    authModal.classList.add("hidden");
    authModal.classList.remove("flex");

    document.body.classList.remove("overflow-hidden");

}


// Close button
authClose.addEventListener("click", closeAuth);


// Click outside
authModal.addEventListener("click", (event) => {

    if (event.target === authModal) {
        closeAuth();
    }

});


// Escape
document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        !authModal.classList.contains("hidden")
    ) {
        closeAuth();
    }

});


// Login → Register
showRegister.addEventListener("click", () => {

    loginView.classList.add("hidden");
    registerView.classList.remove("hidden");

});


// Register → Login
showLogin.addEventListener("click", () => {

    registerView.classList.add("hidden");
    loginView.classList.remove("hidden");

});


// Prevent refresh
loginForm.addEventListener("submit", (event) => {

    event.preventDefault();



});


registerForm.addEventListener("submit", (event) => {

    event.preventDefault();



});

let mobileHumber = document.querySelector("#mobile-menu-btn");
let mobileNavbar = document.querySelector(".mobile-navbar");
mobileHumber.addEventListener("click" , () => {
    mobileNavbar.classList.toggle("hidden")
})
    });