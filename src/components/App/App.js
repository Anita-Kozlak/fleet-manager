import { Vehicle } from "./../../common/Vehicle.class.js"
import { addInputsValidation, removeInputsValidation, setDefaultInputsValue } from "./../../common/helpers.js"
import { validateFulfilledData } from "./../../common/validation.js"

let fleet = [
    new Vehicle("Truck", "Iveco", "Daily", 4343125, 15000, "Used"),
    new Vehicle("Car", "Skoda", "Octavia", 2343875, 5000, "Used"),
    new Vehicle("Motor", "Suzuki", "Hayabusa", 9, 85000, "New"),
    new Vehicle("Car", "VW", "Passat B5", 784390, 200, "Wrecked"),
]

const generateMainContent = () => {
    const mainContentElement = document.getElementById("main-content")
    mainContentElement.innerHTML = `<div class="row mt-2 g-2">${fleet.map(item => item.generateItem()).join("")}</div>`
    fleet.forEach((item) => item.assignDefaultInputValue())

}

const generateHeader = () => {
    const headerElement = document.querySelector("#header")
    const header = document.createElement("div")
    header.classList.add("bg-secondary", "bg-gradient", "bg-opacity-10", "w-100", "d-flex", "justify-content-center", "align-items-center")
    header.style.height = "100px"

    const headerContent = document.createElement("h1")
    headerContent.innerHTML = "Fleet Manager"

    header.append(headerContent)

    headerElement.append(header)
}

const generateSummary = () => {
    const summaryElement = document.querySelector(".container").querySelector("#summary")

    const fleetPrice = fleet.reduce((accSum, vehicle) => {
        accSum += Number(vehicle.price)
        return accSum
    }, 0)

    const summarySpanElement = document.createElement("h2")
    summarySpanElement.classList.add("mt-2")
    summarySpanElement.classList.add("w-100")
    summarySpanElement.classList.add("d-flex")
    summarySpanElement.classList.add("justify-content-center")
    summarySpanElement.classList.add("align-items-center")
    // summarySpanElement.className = "mt-2 w-100 d-flex justify-content-center align-items-center"

    summarySpanElement.innerHTML = `Fleet worth: ${fleetPrice} zł`

    if (summaryElement.firstChild) {
        // summaryElement.replaceChild(summarySpanElement, summaryElement.firstChild)
        summaryElement.firstChild.replaceWith(summarySpanElement)
    } else {
        summaryElement.append(summarySpanElement)
    }

}

const deleteEventListeners = () => fleet.forEach((vehicle) => deleteEventListener(vehicle))

const editMenuEventListeners = () => fleet.forEach((vehicle) => editMenuListener(vehicle))

const editPriceEventListeners = () => fleet.forEach((vehicle) => editPriceListener(vehicle))

const editConditionEventListeners = () => fleet.forEach((vehicle) => editConditionListener(vehicle))

const editTypeEventListeners = () => fleet.forEach((vehicle) => editTypeListener(vehicle))

const editCourseEventListeners = () => fleet.forEach((vehicle) => editCourseListener(vehicle))

const editPriceListener = (vehicle) => {
    const priceButton = document.getElementById(`${vehicle.id}-change-price-button`)
    priceButton.addEventListener("click", () => {
        vehicle.changePrice()
        generateSummary()
    })
}

const editConditionListener = (vehicle) => {
    const priceButton = document.getElementById(`${vehicle.id}-condition-select`)
    priceButton.addEventListener("change", (event) => {
        const newValue = event.target.value
        vehicle.changeCondition(newValue)
    })
}
const editTypeListener = (vehicle) => {
    const typeButton = document.getElementById(`${vehicle.id}-type-select`)
    typeButton.addEventListener("change", (event) => {
        const newType = event.target.value
        vehicle.changeType(newType)
    })
}


const editCourseListener = (vehicle) => {
    const courseButton = document.getElementById(`${vehicle.id}-change-course-button`)
    courseButton.addEventListener("click", () => {
        vehicle.changeCourse()
    })
}

const editMenuListener = (vehicle) => {
    const editButton = document.getElementById(`${vehicle.id}-edit-button`)
    editButton.addEventListener("click", () => {
        const settingsElement = document.getElementById(vehicle.id).querySelector("#settings-container")
        const areSettingsHidden = settingsElement.classList.contains("d-none")

        if (areSettingsHidden) {
            settingsElement.classList.add("d-block")
            settingsElement.classList.remove("d-none")
        } else {
            settingsElement.classList.remove("d-block")
            settingsElement.classList.add("d-none")
        }
    })
}

const deleteEventListener = (vehicle) => {
    const deleteButton = document.getElementById(`${vehicle.id}-delete-button`)
    deleteButton.addEventListener("click", () => {
        const elementToDelete = document.getElementById(vehicle.id)
        elementToDelete.parentElement.removeChild(elementToDelete)
        fleet = fleet.filter((vahicleInState) => vahicleInState.id !== vehicle.id)
        generateSummary()
    })
}

const addVehicleProcess = () => {
    removeInputsValidation()
    const { errors, data } = validateFulfilledData()
    if (errors.length > 0) {
        addInputsValidation(errors)
    }else {
        const newVehicle = new Vehicle(...data)
        fleet = [newVehicle, ...fleet]

        const rowElement = document.getElementById("main-content").querySelector("div.row")
        rowElement.insertAdjacentHTML("afterbegin", newVehicle.generateItem())
        generateSummary()
        editMenuListener(newVehicle)
        editPriceListener(newVehicle)
        editConditionListener(newVehicle)
        editTypeListener(newVehicle)
        editCourseListener(newVehicle)
        deleteEventListener(newVehicle)
        newVehicle.assignDefaultInputValue()
        setDefaultInputsValue()
    }
}

const addNewVehicleListener = () => {
    const addButton = document.getElementById("add-vehicle-button")
    addButton.addEventListener("click", (event) => {
        event.preventDefault()
        addVehicleProcess()
    })
}

const formSubmitListener = () => {
    const formEl = document.getElementById("add-form")
    formEl.addEventListener("submit", (event) => {
        event.preventDefault()
        addVehicleProcess()
    })
}

export const refreshView = () => {
    generateMainContent()
    generateHeader()
    generateSummary()
    deleteEventListeners()
    editMenuEventListeners()
    editPriceEventListeners()
    editConditionEventListeners()
    editTypeEventListeners()
    editCourseEventListeners()
    addNewVehicleListener()
    formSubmitListener()
  
}