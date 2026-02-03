function UpdateTerminal(){
	const Terminal = document.getElementById("Terminal")
	if (Terminal == null) {return}
	for (const Interactable of Terminal.getElementsByTagName("input")){
		Interactable.onkeyup = () => {
			if (Interactable.value == ""){
				return
			}
			const Length = Interactable.value.length+2;
			Interactable.style.width = ((Length+1)*8) + "px"
		}
		Interactable.value = Interactable.placeholder
		Interactable.onkeyup.call();

		Interactable.onchange = () => {
			if (!Interactable.checkValidity()){
				Interactable.value = Interactable.placeholder
			}
		}
	}

}

UpdateTerminal();