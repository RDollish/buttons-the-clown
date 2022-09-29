const applicationState = {
    requests: [

    ],
    clowns: [

    ],
    bookings: [

    ]

}

const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")

export const fetchRequests = () => {
    return fetch(`${API}/Bookings`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const fetchClowns = () => {
    return fetch(`${API}/Clowns`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.clowns = serviceRequests
            }
        )
}

export const fetchBookings = () => {
    return fetch(`${API}/ClownBookings`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.bookings = serviceRequests
            }
        )
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/Bookings`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const sendClown = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/ClownBookings`, fetchOptions)
        .then(response => response.json())
}
export const changeClown = (id) => {
    const fetchOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(id)
    }

    return fetch(`${API}/ClownBookings/${id.id}`, fetchOptions)
        .then(response => response.json())
}

export const deleteRequest = (id) => {
    return fetch(`${API}/Bookings/${id.clownID}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
}

export const getBookings = () => {
    return applicationState.bookings.map(booking => ({...booking}))
}