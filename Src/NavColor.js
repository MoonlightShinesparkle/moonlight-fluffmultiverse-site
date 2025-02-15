function Iluminate(){
	const NavPanel = document.getElementsByTagName("nav")[0]
	const DocTitle = document.getElementsByTagName("title")[0].innerHTML.trimStart().trimEnd()
	const AList = NavPanel.getElementsByTagName("a")
	for (Obj in AList){
		const Ele = AList[Obj]
		if(typeof(Ele) != "object"){
			continue
		}
		var Inner = Ele.innerHTML.trimStart().trimEnd()
		if (Inner == DocTitle){
			Ele.className = "Current"
		} else if(Ele.getAttribute("Alias") == DocTitle){
			Ele.className = "Current"
		}
	}
}

Iluminate()