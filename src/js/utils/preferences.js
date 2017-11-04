import BrowserDetector from './browserDetector'

/*
 When used within a content script in Firefox versions prior to 52, the Promise returned by browser.storage.local.get()
 is fulfilled with an Array containing one Object. The Object in the Array contains the keys found in the storage area,
 as described above. The Promise is correctly fulfilled with an Object when used in the background context (background
 scripts, popups, options pages, etc.). When this API is used as chrome.storage.local.get(), it correctly passes an
 Object to the callback function.
 See https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/StorageArea/get
 */
function firefoxSanitizeStorage(items, callback) {
    if (items instanceof Array) {
        return callback(items[0]);
    }
    return callback(items);
}

class PreferencesManager {

    constructor(type) {
        return Object.create(this.supportedBrowsers()[type]);
    }

    static INSTANCE () {
        let browserDetector = new BrowserDetector();
        let browserType = browserDetector.getBrowserType();
        return new PreferencesManager(browserType);
    }

    defaultValues () {
        const values = {
            environments: ['default']
        };
        return values;
    }

    defaultEnvironmentValues() {
        const values = {
            enableWarningBar: false,
            barPosition: 'top',
            barColor: '#ff5063',
            barText: 'In Production Environment',
            enableWarningModal: true,
            filter: 'none',
            domainList: []
        };
        return values;
    }

    supportedBrowsers() {
        return {
            chrome: {
                loadPreferences: (callback) => {
                    chrome.storage.sync.get(this.defaultValues(), callback);
                },

                loadEnvironment: (environment, callback = () => {
                }) => {
                    chrome.storage.sync.get(environment, callback);
                },

                loadEnvironmentPreferences: (environment, callback = () => {
                }) => {
                    const dataToRead = { [environment]: this.defaultEnvironmentValues() };
                    chrome.storage.sync.get(dataToRead[environment], callback);
                },

                saveEnvironments: (environments, callback = function () {
                }) => {
                    chrome.storage.sync.set({ environments: environments }, callback);
                },

                removeEnvironment: (environment, callback = () => {
                }) => {
                    chrome.storage.sync.remove(environment, callback);
                },

                savePreferences: (properties, callback = function () {
                }) => {
                    chrome.storage.sync.set(properties, callback);
                }
            },
            firefox: {
                loadPreferences: (callback) => {
                    browser.storage.local.get(this.defaultValues()).
                        then((items) => {
 firefoxSanitizeStorage(items, callback);
}, () => {
                            console.error("Error loading preferences")
                        });
                },

                loadEnvironment: (environment, callback = () => {}) => {
                    browser.storage.local.get(environment).
                        then((items) => {
 firefoxSanitizeStorage(items, callback);
}, () => {
                            console.error("Error loading environment")
                        });
                },

                loadEnvironmentPreferences: (environment, callback = () => {}) => {
                    const dataToRead = { [environment]: this.defaultEnvironmentValues() };
                    browser.storage.local.get(dataToRead[environment]).
                        then((items) => {
 firefoxSanitizeStorage(items, callback);
}, () => {
                            console.error("Error loading environment preferences");
                        });
                },

                saveEnvironments: (environments, callback = function () {}) => {
                    browser.storage.local.set({ environments: environments }).
                        then(callback, () => {
                            console.error("Error saving enviroments");
                        });
                },

                removeEnvironment: (environment, callback = () => {
                }) => {
                    browser.storage.local.remove(environment).
                        then(callback, () => {
                            console.error("Error removing enviroment");
                        });
                },

                savePreferences: (properties, callback = function () {
                }) => {
                    browser.storage.local.set(properties).
                        then(callback, () => {
                            console.error("Error removing enviroment");
                        });
                }
            }
        };
    }
}

export default PreferencesManager;
