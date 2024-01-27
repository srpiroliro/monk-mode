const config = {
    youtube: {
        url: "youtube.com",

        status: true,
        block: false,
        parts: {
            shorts: {
                block: true,

                url: "/shorts/",
                patterns: ["[is-shorts]", "ytd-reel-shelf-renderer", 'ytd-guide-entry-renderer a#endpoint[title="Shorts"]']
            },
            comments: {
                block: false,
                patterns: ["ytd-comments"]
            },
            recommendations: {
                block: false,
                patterns: ["ytd-watch-next-secondary-results-renderer", "ytd-shelf-renderer", "ytd-rich-grid-row"]
            },
            live_chat: {
                block: false,
                patterns: ["ytd-live-chat-frame"]
            },
            likes: {
                block: false,
                patterns: ["ytd-toggle-button-renderer"]
            },
            views: {
                block: false,
                patterns: ["ytd-video-primary-info-renderer"]
            }
        }
    }
};