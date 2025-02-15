var mode = "DarkMode"
if (!(localStorage.getItem("Mode") == null)){
	mode = localStorage.getItem("Mode")
} else {
	localStorage.setItem("Mode",mode)
}

function ChangeAll(){
	const ThemeBtn = document.getElementById("ThemeButton")
	const ThemeImg = ThemeBtn.getElementsByTagName("img")[0]
	ThemeImg.setAttribute("src","/Images/GUI/Switch/"+mode+".png")
	const RootStyle = document.getElementsByTagName("html")[0].style
	try{
		fetch("/Data/Styles/"+mode+".json").then(Doc => {
			Doc.text().then(Txt => {
				const Vars = JSON.parse(Txt)
				for (Index in Vars){
					const Value = Vars[Index]
					RootStyle.setProperty(Index,Value)
				}
			})
		})
	} catch (Err) {
		console.warn("There was an error setting the style"+Err)
	}
}

function ThemeButtonClick(event){
	if (mode == "DarkMode"){
		mode = "LightMode"
	} else {
		mode = "DarkMode"
	}
	localStorage.setItem("Mode",mode)
	ChangeAll()
}

document.getElementById("ThemeButton").onclick = ThemeButtonClick

ChangeAll()

// Easter egg: Boop!
var Clicks = 0
var InBox = false
function Boopable(){
	const Icon = document.getElementById("Icon")
	if (Icon != null){
		Icon.addEventListener("click",(Event) => {
			var Rect = Event.target.getBoundingClientRect()
			var X = (Event.clientX - Rect.left)/Rect.width
			var Y = (Rect.bottom - Event.clientY)/Rect.height
			if ((X > 0.4) & (X < 0.6)){
				if ((Y > 0.35) & (Y < 0.6)){
					Clicks += 1
					if (Clicks == 1){
						Icon.setAttribute("src","/Images/Fluffs/Moonlight/Moonblep.PNG")
					}
					setTimeout(() => {
						Clicks -= 1
						if (Clicks == 0){
							Icon.setAttribute("src","/Images/Fluffs/Moonlight/Moonhead.PNG")
						} else if (Clicks < 0){
							Clicks = 0
							Icon.setAttribute("src","/Images/Fluffs/Moonlight/Moonhead.PNG")
						}
					}, 2000)
				}
			}
		})
	}
}

Boopable()