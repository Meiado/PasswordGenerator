let pswdLength = 16;

const inputEl = document.querySelector("#password")  

function generatePassword() {
    const chars = "abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789?!@&*()[].,-="

    let password = ""

    for(let i=0; i<pswdLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    
    inputEl.value = password 
}

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

const pswdLengthEl = document.querySelector("#pswd-length")
pswdLengthEl.addEventListener("input", () => {
    pswdLength = pswdLengthEl.value
    generatePassword()
})

document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)
document.querySelector("#renew").addEventListener("click",generatePassword)

generatePassword()