import { fetchRequests, fetchClowns } from "./dataAccess.js"
import { Buttons } from "./Buttons.js"


const mainContainer = document.querySelector("#container")


const render = () => {
    fetchRequests().then(
        () => {
            mainContainer.innerHTML = Buttons()
        }
    )
}

const renderClowns = () => {
    fetchClowns().then(
        () => {
            mainContainer.innerHTML = Buttons()
        }
    )
}

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        renderClowns()
        render()
    }
)
renderClowns()
render()