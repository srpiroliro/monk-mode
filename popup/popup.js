document.addEventListener('DOMContentLoaded', function() {
  const settingsContainer = document.getElementById('sliders');

  // Load settings from storage and then create sliders
  chrome.storage.local.get(['settings'], function(result) {
    const savedSettings = result.settings || defaultSettings; // Assume defaultSettings is predefined

    for (const [part, { block }] of Object.entries(savedSettings.youtube.parts)) {
      const slider = document.createElement('input');
      slider.type = 'checkbox';
      slider.id = part;
      slider.checked = block;

      const label = document.createElement('label');
      label.htmlFor = part;
      label.textContent = part;

      slider.addEventListener('change', function() {
        savedSettings.youtube.parts[part].block = slider.checked;
        chrome.storage.local.set({settings: savedSettings});
        // Send message to content script if needed
      });

      settingsContainer.appendChild(label);
      settingsContainer.appendChild(slider);
    }
  });
});
