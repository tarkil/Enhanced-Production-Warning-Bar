export function savePreferences() {
    return {
        type: "SAVE_PREFERENCES"
    };
}

export function changeWarningBarColor(color) {
    return {
        type: "CHANGE_WARNING_BAR_COLOR",
        color: color
    };
}

export function changeWarningBarMessage(message) {
    return {
        type: "CHANGE_WARNING_BAR_MESSAGE",
        message: message
    };
}


export function enableWarningBar(value) {
    return {
        type: "ENABLE_WARNING_BAR",
        enable: value
    };
}

export function loadPreferences(preferences) {
    return {
        type: "LOAD_PREFERENCES",
        preferences: preferences
    };
}

export function addDomain(domain) {
    return {
        type: "ADD_DOMAIN",
        domain: domain
    };
}

export function modifyDomain(newDomain, oldDomain) {
    return {
        type: "MODIFY_DOMAIN",
        newDomain: newDomain,
        oldDomain: oldDomain
    };
}

export function removeDomain(domain) {
    return {
        type: "REMOVE_DOMAIN",
        domain: domain
    };
}

export function enableModal(enable) {
    return {
        type: "ENABLE_MODAL",
        enable: enable
    };
}

export function setFilter(filter) {
    return {
        type: "SET_FILTER",
        filter: filter
    };
}

export function addEnvironment(environment) {
    return {
        type: "ADD_ENVIRONMENT",
        environment: environment
    };
}

export function removeEnvironment(environment) {
    return {
        type: "REMOVE_ENVIRONMENT",
        environment: environment
    };
}

export function changeEnvironment(environment) {
    return {
        type: "CHANGE_ENVIRONMENT",
        name: environment
    };
}

export function loadEnvironmentPreferences(environment) {
    return {
        type: "LOAD_ENVIRONMENT_PREFERENCES",
        environment: environment
    };
}

export function loadEnvironment(properties) {
    return {
        type: "LOAD_ENVIRONMENT",
        preferences: properties
    };
}