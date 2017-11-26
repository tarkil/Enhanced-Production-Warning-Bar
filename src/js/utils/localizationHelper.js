import BrowserDetector from './browserDetector'

class ChromeLocalizationService {
    getTranslatedMessage(code, parameters = []) {
        return chrome.i18n.getMessage(code, parameters)
    }
}

class FirefoxLocalizationService {
    getTranslatedMessage(code, parameters = []) {
        return browser.i18n.getMessage(code, parameters);
    }
}

class FakeLocalizationService {
    getTranslatedMessage(code, parameters = []) {
        return code;
    }
}

/**
 * Provides useful functions to adapt an application to a specific country or region
 */
class LocalizationHelper {

    constructor() {
        const browserDetector = new BrowserDetector();
        if (browserDetector.isChrome() || browserDetector.isChromium()) {
            this.i18nService = new ChromeLocalizationService();
        } else if (browserDetector.isFirefox()) {
            this.i18nService = new FirefoxLocalizationService();
        } else {
            this.i18nService = new FakeLocalizationService();
        }
    }

    /**
     * Given a code, it retrieves its translated message
     * @param {string} code The code to resolve the message for
     * @param {Array<string>} parameters a list of argument values to apply to the message
     * @returns {string} the message translation for the given code
     */
    getTranslatedMessage(code, parameters = []) {
        return this.i18nService.getTranslatedMessage(code, parameters);
    }
}
export default new LocalizationHelper();