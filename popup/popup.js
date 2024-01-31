document.addEventListener('DOMContentLoaded', function() {
  // Fetch saved settings from storage, or use defaults if none are saved
  chrome.storage.local.get(null, function(savedSettings) {

    console.log("savedSettings", savedSettings);

    youtube_view(savedSettings)
  });
});

function youtube_view(savedSettings) {
  const container = document.getElementById('youtube-settings-container');
  Object.keys(config.youtube.parts).forEach(part => {

    const storageName =`block${part.charAt(0).toUpperCase() + part.slice(1)}`
      
    const defaultPartSetting = config.youtube.parts[part];
    const savedPartSetting = savedSettings[storageName];

    // Determine whether to use the saved setting or the default
    const isBlocked = savedPartSetting !== undefined ? savedPartSetting : !defaultPartSetting.block;

    let slider = document.getElementById(`${part}-slider`);
    if (!slider) 
      slider = slider_generation(isBlocked, part, container)

    // Add event listener for the slider
    slider.addEventListener('change', function() {
      const isNowBlocked = this.checked;

      // Update the settings variable and save the new setting
      config.youtube.parts[part].block = !isNowBlocked;

      chrome.storage.local.set({ [storageName]: isNowBlocked }, function() {

        console.log("Settings saved!", part, isNowBlocked ? "blocked" : "unblocked");

        // Notify content scripts to update the page
        chrome.tabs.query({}, function(tabs) { // Removed the filter to get all tabs
          tabs.forEach(tab => {
            chrome.tabs.sendMessage(tab.id, {action: "updateSettings", part: part, block: isNowBlocked}, function(response) {
              if (chrome.runtime.lastError) {
                  // Handle the error, e.g., by logging it or by taking corrective action
                console.error("Error sending message to tab:", tab.title , chrome.runtime.lastError.message);
              }
            });
          });
        });
      });
    });

  });
}

function slider_generation(isBlocked, part, container) {

  // Create slider element
  const sliderContainer = document.createElement('div');
  sliderContainer.className = "form-check form-switch";

  const slider = document.createElement('input');
  slider.className = "form-check-input danger";
  slider.type = "checkbox";
  slider.role = "switch";
  slider.id = `${part}-slider`;
  slider.checked = isBlocked;

  const label = document.createElement('label');
  label.className = "form-check-label";
  label.htmlFor = `${part}-slider`;
  label.innerText = part.charAt(0).toUpperCase() + part.slice(1).replace("_", " ");

  sliderContainer.appendChild(slider);
  sliderContainer.appendChild(label);

  container.appendChild(sliderContainer);

  return slider;
}
