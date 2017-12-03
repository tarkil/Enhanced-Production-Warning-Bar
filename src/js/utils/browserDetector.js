/**
 * Utility class to detect the current browser
 * Extracted from http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 */

class BrowserDetector {

    getBrowserType() {
        if (this.isChrome() || this.isChromium()) {
            return "chrome";
        }
        if (this.isFirefox()) {
            return "firefox";
        }

        //From extension's options, isChrome function does not work
        return "chrome";
    }

    //Chromium
    isChromium() {
        // Actually, isWithChromiumPDFReader
        if (typeof navigator.plugins === 'undefined') {
            return false;
        }
        for (let counter = 0; counter < navigator.plugins.length; counter += 1) {
            if (navigator.plugins[counter].name === 'Chromium PDF Viewer') {
                return true;
            }
        }
        return false;
    }

    // Opera 8.0+
    isOpera() {
        return Boolean(window.opr) && Boolean(opr.addons) || Boolean(window.opera) || navigator.userAgent.indexOf(' OPR/') >= 0;
    }

    // Firefox 1.0+
    isFirefox() {
        return typeof InstallTrigger !== 'undefined'
    }

    // Safari 3.0+ "[object HTMLElementConstructor]"
    isSafari() {
        let safariNotification = (function (value) {
            return value.toString() === "[object SafariRemoteNotification]";
        }(!window.safari || safari.pushNotification));
        return Reflect.apply(toString, window.HTMLElement).indexOf('Constructor') > 0 || safariNotification;
    }

    // Edge 20+
    isEdge() {
        return !isIE && Boolean(window.StyleMedia);
    }

    // Chrome 1+
    isChrome() {
        return Boolean(window.chrome) && Boolean(window.chrome.webstore);
    }
}

export default BrowserDetector;