const backups = {
	"/pages/MainHeader.html":"<h1>Error loading header!</h1>"
}
var HasWarned = false

function Main(){
	const elements = document.getElementsByTagName("insert")
	for (var index = 0; index < elements.length; index++){
		const element = elements[index]
		const name = element.getAttribute("src")
		try {
			fetch(name).then(document => {
				document.text().then(text => {
					element.insertAdjacentHTML("afterend",text)
					element.remove()
					})
			})
		} catch (err){
			if (!HasWarned) {
				console.warn("This is either the browser or an error ocurred:\n"+err)
				HasWarned = true
			}
			if (backups[name] != null){
				element.insertAdjacentHTML("afterend",backups[name])
				element.remove()
			}
		}
	}
}

Main()