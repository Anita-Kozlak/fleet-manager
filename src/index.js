import { refreshView } from "./components/App/App"

refreshView()

// User can edit vehicle. Please add additional fields: Type and Course.

// On card after vehicle brand and model, there is static Car icon, please make it dynamic, based on Vehicle.type property.
// You can use already embedded icons.
// https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free

// Every Vehicle has condition property, please add dynamic card borders depending on that variable:
// New – green border,
// Used – yellow border,
// Wrecked – red border.

// There is implemented easy and simple validation (src/common/helpers) during adding new vehicle process.
// Please implement mechanism to style inputs during that process - for example use borders classes from bootstrap

// Please in settings container for each Vehicle, in condition-select – make one of option as selected – depending on selected type.
