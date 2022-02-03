
const DARK_THEME_PATH = "css/style_dark_min.css";
const LIGHT_THEME_PATH = "css/style_light_min.css";

const STYLE_LINK = document.getElementById("theme-style");

if (isDark) {
    enableDarkTheme();
} else {
    disableDarkTheme();
}



function enableDarkTheme() {
    STYLE_LINK.setAttribute("href", DARK_THEME_PATH);
    document.getElementById("theme-text").innerHTML = "Appearance: Dark";
    DarkTheme();
}

function disableDarkTheme() {
    STYLE_LINK.setAttribute("href", LIGHT_THEME_PATH);
    document.getElementById("theme-text").innerHTML = "Appearance: Light";
    LightTheme();
}