function focusFunction() {
    document.getElementById("searchBodyButton").classList.add("border border-primary");
}

// No focus = Changes the background color of input to red
function blurFunction() {
    document.getElementById("searchBodyButton").classList.remove("border border-primary");
}
