class DigitalClock {
    constructor(element) {
        this.element = element;
    }

    start() {
        this.update();

        setInterval(() => {
            this.update();
        }, 500);
    }

    update() {
        const parts = this.getTimeParts();
        const minuteFormatted = parts.minute.toString().padStart(2, "0");
        const timeFormatted = `${parts.hour}:${minuteFormatted}`;
        const secondsFormatted = `:${parts.seconds.toString().padStart(2,"0")}`;
        const amPm = parts.isAm ? "AM" : "PM";

        this.element.querySelector(".clock-time").textContent = timeFormatted;
        this.element.querySelector(".clock-ampm").textContent = amPm;
        this.element.querySelector(".clock-seconds").textContent = secondsFormatted
    }

    getTimeParts() {
        const now = new Date();

        return {
            hour: now.getHours() % 12 || 12,
            minute: now.getMinutes(),
            isAm: now.getHours() < 12,
            seconds: now.getSeconds()
        };
    }

}

const clockElement = document.querySelector(".clock");
const clockObject = new DigitalClock(clockElement);

clockObject.start()

const form = document.querySelector(".top-banner form");
const apiform = document.querySelector(".keyenter")
const keyinput = document.querySelector(".keyenter input");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const info = document.querySelector(".weather .info")

var apiKey = "44c610c96423a63dd2582335723e6937";

var localStorage = window.localStorage

form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;

    var apiKey = localStorage.getItem('key')    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url) 
    .then(response => response.json())
    .then(data => {
        var name = data.name
        var weather = data.weather[0].description
        if (info) {
            info.textContent = `Welcome to the City of ${name}. Your current weather is ${weather}.`
        }
    })
    .catch((response) => {
        msg.textContent = "Invalid city/API Key";
        if (info) {
            info.textContent = "";
        }
    });

    msg.textContent = "";
    form.reset();
    input.focus();
});

apiform.addEventListener("submit", e => {
    e.preventDefault();
    localStorage.clear();
    if (keyinput) {
        localStorage.setItem('key',keyinput.value);
        console.log("Stored ", keyinput.value)
    }
})