export const config = {
    chrome: {
        browserName: "chrome",
        options: {
            binary: "C:/Users/ezequ/AppData/Local/Google/Chrome/Application/chrome.exe",
            profile: "--user-data-dir=C:/Users/ezequ/AppData/Local/Google/Chrome/User Data/Profile 1",
            lang: "--lang=en",
            windowSize: "--start-maximized",
            infobars: "--disable-infobars"
        }
    },
    firefox: {
        browserName: "firefox",
        options: {
            binary: "C:/Program Files (x86)/Mozilla Firefox/firefox.exe",
            profile: "C:/Users/ezequ/AppData/Roaming/Mozilla/Firefox/Profiles/h8bk6w6t.Test user",
            lang: {
                "intl.accept_languages": "en-US"
            }
        }
    },
    /**
     * It is better to config IE browser manually for testing purposes
     * Zoom: always in 100%
     * Security zone config: the same for all areas
     */
    iexplorer: {
        browserName: "ie",
        options: "none"
    }
}