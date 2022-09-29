import { fetchBookings, fetchClowns, getRequests, getClowns, getBookings, sendClown, changeClown } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


export const convertRequestToListElement = (request) => {
    let HTMLString = ""
    if( request.id % 2 !== 0) {
    HTMLString += `<li class="hammer">
        ${request.childName}'s Party
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
        ${chooseClown(request)}
    </li>
    `}
    else {HTMLString += `<li class="hammer2">
    ${request.childName}'s Party
    <button class="request__delete"
            id="request--${request.id}">
        Delete
    </button> 
    ${chooseClown(request)}
</li>
`

    }
    return HTMLString
}
fetchBookings()
export const chooseClown = (request) => {
    fetchClowns()
    const clowns = getClowns()
    const bookings = getBookings()

    let checkBookingsRequest = bookings.find(booking => booking.requestID == request.id)
    if (checkBookingsRequest != undefined){
    for (const clown of clowns) {
    if (checkBookingsRequest.clownID == clown.id){
    let html = `
    <select class="clowns" name="clowns">
    <option value="${clown.id}">${clown.Name}</option>
    ${
        clowns.map(
            clown => {
                return `<option value="${request.id}--${clown.id}">${clown.Name}</option>`
            }
        ).join("")
    }
    </select>
    `
    return html
    }}}

    else {
    let html = `
    <select class="clowns" name="clowns">
    <option value="clowns">Choose Clown</option>
    ${
        clowns.map(
            clown => {
                return `<option value="${request.id}--${clown.id}">${clown.Name}</option>`
            }
        ).join("")
    }
    </select>
    `
    return html
}}


export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul class="list_item">
            ${requests.map(convertRequestToListElement).join("")
        }
        </ul>
    `

    return html
}

mainContainer.addEventListener(
    "change",
    (event) => {

    }
)
document.addEventListener(
    "click",
    (event) => {
        fetchBookings()
        let bookings = getBookings()
        if (event.target.name === "clowns") {
            const clownPartyID = event.target.value
            const [partyID,clownsID] = clownPartyID.split("--")
    
            // Make an object out of the user input
            let checkBookings = bookings.find(booking => booking.requestID === partyID)
            if (checkBookings === undefined) {
            const dataToSendToAPI = {
                clownID: clownsID,
                requestID: partyID
            }
            if (isNaN(clownsID || partyID)) {

            }
            else{
            // Send the data to the API for permanent storage
            sendClown(dataToSendToAPI)}
            fetchBookings()
        }
        else {
            const bookingID = checkBookings.id
            const updateClownID = 
            
                    {
                        clownID : clownsID,
                        id : bookingID

                    }

            changeClown(updateClownID)

        }
        }
    })
