import { sendRequest } from "./dataAccess.js"

export const ServiceForm = () => {
    let html = `
    <div class="field">
            <label class="label" for="pName">Parent's Name</label>
            <input type="text" name="pName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="cName">Child's Name</label>
            <input type="text" name="cName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="userAddress">Address of Party</label>
            <input type="text" name="userAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="numAttending">How many are attending? (approximately)</label>
            <input type="number" name="numAttending" class="input" />
        </div>
        <div class="field">
            <label class="label" for="dateParty">Date of the Party</label>
            <input type="date" name="dateParty" class="input" />
        </div>
        <div class="field">
            <label class="label" for="lengthParty">How many hours will the party be? (approximately)</label>
            <input type="number" name="lengthParty" class="input" />
        </div>
        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const pName = document.querySelector("input[name='pName']").value
        const cName = document.querySelector("input[name='cName']").value
        const userAddress = document.querySelector("input[name='userAddress']").value
        const nAttending = document.querySelector("input[name='numAttending']").value
        const userDate = document.querySelector("input[name='dateParty']").value
        const userHours = document.querySelector("input[name='lengthParty']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: pName,
            childName: cName,
            attendingParty: nAttending,
            address: userAddress,
            dateParty: userDate,
            lengthReservation: userHours
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})