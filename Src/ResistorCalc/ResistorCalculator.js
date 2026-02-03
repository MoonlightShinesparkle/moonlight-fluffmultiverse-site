// Returns true if ANY given arguments within are null
function AnyAreNull(/*...*/){
	for (var i = 0; i < arguments.length; i++){
		if (arguments[i] == null){
			return true
		}
	}
	return false
}

// Triggers onkeyup from all arguments
function TriggerModifyUpdate(/*...*/){
	for (var i = 0; i < arguments.length; i++){
		if (arguments[i].onkeyup != null){
			arguments[i].onkeyup.call()
		}
	}
}

// Sets up all functions for the "terminal" to work with
function Resisterminal(){
	// Resistor input
	const InitialVoltageField = document.getElementById("VoltInit")
	const ConsumedVoltageField = document.getElementById("VoltCons")

	// Amps input
	const FlowingAmperageField = document.getElementById("Amps")
	const AmperageMagnitudeSelector = document.getElementById("AmpMagnitude")

	// Resistor tolerance
	const ToleranceField = document.getElementById("Tol")

	// Resistor output
	const ChosenResistorTitle = document.getElementById("ResistChosen")
	const TheoricalResistorOutput = document.getElementById("ResistCalc")
	const MinResistorOutput = document.getElementById("ResistTrue")

	// Watt output
	const RoundedWattOutput = document.getElementById("WattAprox")
	const TrueWattOutput = document.getElementById("WattTrue")

	// GUI
	const CalcButton = document.getElementById("Calc")
	const OutputWindow = document.getElementById("OutputWindow")
	const HideButton = document.getElementById("HideRes")

	// Check if all needed items are available
	if (AnyAreNull(
		InitialVoltageField, ConsumedVoltageField,
		FlowingAmperageField, AmperageMagnitudeSelector,
		ToleranceField, ChosenResistorTitle, TheoricalResistorOutput,
		MinResistorOutput, RoundedWattOutput, TrueWattOutput,
		CalcButton, OutputWindow, HideButton
	)) {
		console.log("Incomplete resistor terminal, terminating")
		return
	}

	console.log("Resistor terminal ready")

	// Button to hide result window
	HideButton.onclick = () => {
		OutputWindow.hidden = true
	}

	// Allows the terminal to function with the calculate button
	CalcButton.onclick = () => {
		// V
		var Voltage = parseFloat(InitialVoltageField.value) - parseFloat(ConsumedVoltageField.value)
		console.log("∆V = "+Voltage)

		// A
		var Amperage = parseFloat(FlowingAmperageField.value)
		Amperage *= AmperageMagnitudeSelector.value == "Norm"? 1 : 1e-3
		console.log("Given A = "+Amperage)

		// Invalid, do not work with it
		if (Amperage <= 0){
			console.log("Invalid amperage")
			return
		}
		
		// W
		var Wattage = Voltage*Amperage
		console.log("Calculated W = "+Wattage)

		// Tolerance
		var Tolerance = Math.abs(parseFloat(ToleranceField.value))
		console.log("Tolerance of ±"+Tolerance+"%")

		// Calculate through ohms law R=V/I
		var TheoricalResistance = Math.ceil( Voltage/Amperage )
		console.log("Ohm's law: "+TheoricalResistance)

		// Add +x% to account for the worst case scenario of -x%
		var TrueMinimumResistance = TheoricalResistance+(TheoricalResistance/100*Tolerance)
		console.log("Considering tolerance: "+TrueMinimumResistance)

		TheoricalResistorOutput.value = TheoricalResistance
		MinResistorOutput.value = TrueMinimumResistance

		// Create simple wattage text
		var RoundedWattText = ">1"
		if (Wattage <= 0.125){
			RoundedWattText = "1/8";
		} else if (Wattage <= 0.25){
			RoundedWattText = "1/4";
		} else if (Wattage <= 0.5){
			RoundedWattText = "1/2";
		} else if (Wattage <= 1){
			RoundedWattText = "1";
		}

		RoundedWattOutput.value = RoundedWattText
		TrueWattOutput.value = Wattage

		// Triggers the elements' onkeyup event to update their length accordingly
		TriggerModifyUpdate(
			TheoricalResistorOutput, MinResistorOutput,
			RoundedWattOutput, TrueWattOutput
		)
		
		// Unhide results window
		OutputWindow.hidden = false
	}
}

Resisterminal();