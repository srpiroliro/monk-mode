class ElementBlocker {

    constructor() {
        this.settings = {};
    }

    apply() {
        chrome.storage.local.get(null, function(settings) {
            // Check and apply settings for each YouTube part
            this.settings = settings;

            if(this.settings?.youtube) this.youtube();
            if(this.settings?.twitter) this.twitter();
        });
    }

    youtube() {
        updateVisibility(config.youtube.parts.shorts, settings.blockShorts);
        updateVisibility(config.youtube.parts.comments, settings.blockComments);
        updateVisibility(config.youtube.parts.recommendations, settings.blockRecommendations);
        updateVisibility(config.youtube.parts.live_chat, settings.blockLive_chat);
        updateVisibility(config.youtube.parts.likes, settings.blockLikes);
        updateVisibility(config.youtube.parts.views, settings.blockViews);
    }

    twitter() {
        // ...
    }

    updateVisibility(part, shouldBeBlocked) {
        const elements = document.querySelectorAll(part.patterns.join(","));
    
        elements.forEach(element => {
            element.style.display = shouldBeBlocked?'none':'block';
        });
    }
}