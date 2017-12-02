import BrowserDetector from './browserDetector'

class ChromeExtensionService {
    getUrl(url) {
        return chrome.extension.getURL(url);
    }
}

class FirefoxExtensionService {
    getUrl(url) {
        return browser.extension.getURL(url);
    }
}

class FakeExtensionService {
    getUrl(url) {
        return url;
    }
}

/**
 * A helper class that provides access to browser extension API.Currently, it supports Chrome and Firefox.
 */
class ExtensionHelper {
    constructor() {
        const browserDetector = new BrowserDetector();
        if (browserDetector.isChrome() || browserDetector.isChromium()) {
            this.extensionService = new ChromeExtensionService();
        } else if (browserDetector.isFirefox()) {
            this.extensionService = new FirefoxExtensionService();
        } else {
            this.extensionService = new FakeExtensionService();
        }
    }

    /**
     * Converts a relative path within an extension's install directory to a fully-qualified URL.
     * @param {string} url A path to a resource within an extension expressed relative to its install directory.
     * @return {string} The fully-qualified URL to the resource.
     */
    getURL(url) {
        return this.extensionService.getUrl(url);
    }
}

export default new ExtensionHelper();