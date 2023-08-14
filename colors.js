const colors = {
    "LightMode":{
        "DarkGrey":"#e7e7e7",
        "LightGrey":"#ffffff",
        "WhiteText":"#000000",
        "DarkPurple":"#d08be8"
    },
    "DarkMode":{
        "DarkGrey":"#3c3c3c",
        "LightGrey":"#505050",
        "WhiteText":"#ffffff",
        "DarkPurple":"#3f2a46"
    }
}

var mode = "DarkMode"
if (!(localStorage.getItem("Mode") == null)){
    mode = localStorage.getItem("Mode")
} else {
    localStorage.setItem("Mode",mode)
}

function loop(arraylike, fn){
    const array = Array.from(arraylike)
    if (array == null){
        return
    }
    for (const index in array){
        const element = array[index]
        fn(element)
    }
}

function ChangeAll(){
    const prefixelement = document.getElementById("Prefix")
    var prefix = ""
    if (prefixelement != null){
        prefix = prefixelement.getAttribute("content")
    }
    //Specific
    document.getElementById("ThemeButton").setAttribute("src",prefix + "images/"+ mode +".png")
    //General
    document.body.style.background = colors[mode].LightGrey
    loop(document.getElementsByClassName("Topbar"), (obj) => {
        obj.style.background = colors[mode].DarkGrey
    })
    loop(document.getElementsByClassName("Selectable"), (obj) => {
        obj.style.background = colors[mode].LightGrey
        obj.style.color = colors[mode].WhiteText
        obj.onmouseenter = () => {
            obj.style.color = "#d344ff"
        }
        obj.onmouseleave = () => {
            obj.style.color = colors[mode].WhiteText
        }
    })
    loop(document.getElementsByClassName("Current"), (obj) => {
        obj.style.background = colors[mode].DarkPurple
    })
    loop(document.getElementsByClassName("MainBG"), (obj) => {
        obj.style.color = colors[mode].WhiteText
    })
    loop(document.getElementsByClassName("Bottom"), (obj) => {
        obj.style.color = colors[mode].WhiteText
        obj.style.background = colors[mode].DarkGrey
    })
}

function ThemeButtonClick(event){
    console.log("Theme button pressed")
    if (mode == "DarkMode"){
        mode = "LightMode"
    } else {
        mode = "DarkMode"
    }
    localStorage.setItem("Mode",mode)
    ChangeAll()
}

document.getElementById("ThemeButtonBtn").onclick = ThemeButtonClick
console.log("Loaded main script :3")