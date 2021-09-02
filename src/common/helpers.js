export const vehicleConditions = [
    {
        key: "Used",
        label: "Used"
    },
    {
        key: "New",
        label: "New"
    },
    {
        key: "Wrecked",
        label: "Wrecked"
    }
]
export const vehicleTypes = [
    {
        key: "Truck",
        label: "Truck"
    },
    {
        key: "Car",
        label: "Car"
    },
    {
        key: "Motor",
        label: "Motor"
    }
]

export const helpersIcons = {
    
}

export const addInputsValidation = (inputErrors) => {
    inputErrors.forEach((error) => {
        const div = document.createElement("div")
        error.parentElement.append(div)
        div.innerHTML = "Wypełnij pole."
        error.classList.add("is-invalid")
        div.classList.add("invalid-feedback")
     
    })
}

export const removeInputsValidation = () => {
    const errors = document.getElementsByClassName("invalid-feedback")
    Array.from(errors).forEach((error) => {
        error.innerHTML = ""
    })
    const formControl = document.getElementById('add-form').getElementsByClassName('form-control')
    Array.from(formControl).forEach((form)=> {
        form.classList.remove("is-invalid")
    })
}

export const setDefaultInputsValue = () => {
    const newVehicleType = document.getElementById("type-select")
    const newVehicleCondition = document.getElementById("condition-select")

    const inputs = [
        document.getElementById("brand-input"),
        document.getElementById("model-input"),
        document.getElementById("course-input"),
        document.getElementById("price-input")
    ]

    inputs.forEach((input) => input.value = "")

    newVehicleType.value = "Truck"
    newVehicleCondition.value = "New"
}

