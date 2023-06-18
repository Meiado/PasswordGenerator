let pswdLength = 16;

const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#numbers-check")
const symbolCheckEl = document.querySelector("#symbols-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

function generatePassword() {
    let chars = "abcdefghjklmnpqrstuvwxyz"

    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "1234567890"
    const symbolChars = "?!@&*()[].=-"

    if(upperCaseCheckEl.checked)
        chars += upperCaseChars
    if(numberCheckEl.checked)
        chars += numberChars
    if(symbolCheckEl.checked)
        chars += symbolChars

    let password = ""

    for(let i=0; i<pswdLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    
    inputEl.value = password 
    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {

    const percent = Math.round((pswdLength/64)*25 + 
        (upperCaseCheckEl.checked ? 15 : 0) + 
        (numberCheckEl.checked? 25 : 0) +
        (symbolCheckEl.checked ? 35 : 0))

    console.log(percent)

    securityIndicatorBarEl.style.width = `${percent}%`

    if(percent > 69){
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("safe")
    } else if(percent > 50){
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.add("warning")
        securityIndicatorBarEl.classList.remove("safe")
    }else {
        securityIndicatorBarEl.classList.add("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.remove("safe")
    }

    if(percent == 100)
        securityIndicatorBarEl.classList.add("completed")
    else
        securityIndicatorBarEl.classList.remove("completed")
}

function calculateFontSize() {
    if(pswdLength > 45) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xs")
        inputEl.classList.add("font-xxs")
    } else if(pswdLength > 32) {
        inputEl.classList.remove("font-sm")
        inputEl.classList.remove("font-xxs")
        inputEl.classList.add("font-xs")
    } else if(pswdLength > 22) {
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-xxs")
        inputEl.classList.add("font-sm")        
    } else {
        inputEl.classList.remove("font-xxs")
        inputEl.classList.remove("font-xs")
        inputEl.classList.remove("font-sm")
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const pswdLengthEl = document.querySelector("#pswd-length")
pswdLengthEl.addEventListener("input", () => {
    pswdLength = pswdLengthEl.value
    document.querySelector("#password-length-text").innerText = pswdLength
    generatePassword()
})
upperCaseCheckEl.addEventListener("click",generatePassword)
numberCheckEl.addEventListener("click",generatePassword)
symbolCheckEl.addEventListener("click",generatePassword)

document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click",generatePassword)

generatePassword()