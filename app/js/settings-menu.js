(function(window) {
    var settingsButton = document.querySelector(".fl-settings-icon"),
        settingsMenu = document.querySelector(".settings-menu");

    settingsButton.addEventListener("click", function() {
        classie.toggle(settingsButton, "open");
        classie.toggle(settingsMenu, "open");
    })
})( window );