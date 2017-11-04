import PreferencesManager from '../utils/preferences';

class Preferences {
    constructor(values, oldOptions = {
            enableWarningBar: false,
            barPosition: 'top',
            barColor: '#FF0000',
            barText: 'In Production Environment from Save preferences',
            filter: 'none',
            domainList: [],
            enableWarningModal: false,
            environments: ['default'],
            currentEnvironment: ""
    }) {
        Object.assign(this, oldOptions, values);
    }

    setWarningBarMessage(message) {
        return new Preferences({ barText: message }, this);
    }
    setWarningBarColor(color) {
        return new Preferences({ barColor: color }, this);
    }

    setEnableWarningBar(enable) {
        return new Preferences({ enableWarningBar: enable }, this);
    }

    addDomain(domain) {
        if ( this.domainList.indexOf(domain) === -1) {
            let domainListCopy = this.domainList.slice();
            domainListCopy.push(domain);
            return new Preferences({ domainList: domainListCopy }, this);
        }
        return new Preferences({}, this);
    }

    addEnvironment(environment) {
        if ( this.environments.indexOf(environment) === -1) {
            let environmentsCopy = this.environments.slice();
            environmentsCopy.push(environment);
            return new Preferences({ environments: environmentsCopy }, this);
        }
        return new Preferences({}, this);
    }

    removeEnvironment(environment) {
        let index = this.environments.indexOf(environment);
        if (index >= 0) {
            let environmentCopy = this.environments.slice();
            environmentCopy.splice( index, 1 );
            return new Preferences({ environments: environmentCopy }, this);
        }
        return new Preferences({}, this);
    }

    removeDomain(domain) {
        let index = this.domainList.indexOf(domain);
        if (index >= 0) {
            let domainListCopy = this.domainList.slice();
            domainListCopy.splice( index, 1 );
            return new Preferences({ domainList: domainListCopy }, this);
        }
        return new Preferences({}, this);
    }

    modifyDomain(newDomain, oldDomain) {
        let index = this.domainList.indexOf(oldDomain);
        if (index >= 0) {
            let domainListCopy = this.domainList.slice();
            domainListCopy.splice( index, 1 );
            domainListCopy.push(newDomain);
            return new Preferences({ domainList: domainListCopy }, this);
        }
        return new Preferences({}, this);
    }

    setEnableWarningModal(enable) {
        return new Preferences({ enableWarningModal: enable }, this);
    }

    setFilter(filter) {
        return new Preferences({ filter: filter }, this);
    }

    setEnvironment(environments) {
        return new Preferences({ environments: environments.slice() }, this);
    }

    setCurrentEnvironment(environment) {
        return new Preferences({ currentEnvironment: environment }, this);
    }
}

export default (options = new Preferences(), action) => {
    let updatePreferences = {};
    switch (action.type) {
        case 'LOAD_PREFERENCES':
            return new Preferences().setCurrentEnvironment(action.preferences.environments[0]).
                setEnvironment(action.preferences.environments);
        case 'CHANGE_WARNING_BAR_MESSAGE':
            return options.setWarningBarMessage(action.message);
        case 'SAVE_PREFERENCES': {
            let preferencesCopy = new Preferences({}, options);
            Reflect.deleteProperty(preferencesCopy, "currentEnvironment");
            Reflect.deleteProperty(preferencesCopy, "environments");
            PreferencesManager.INSTANCE().savePreferences({ [options.currentEnvironment]: preferencesCopy });
            return options;
        }
        case 'CHANGE_WARNING_BAR_COLOR':
            return options.setWarningBarColor(action.color);
        case 'ENABLE_WARNING_BAR':
            return options.setEnableWarningBar(action.enable);
        case 'ADD_DOMAIN':
            return options.addDomain(action.domain);
        case 'REMOVE_DOMAIN':
            return options.removeDomain(action.domain);
        case 'MODIFY_DOMAIN':
            return options.modifyDomain(action.newDomain, action.oldDomain);
        case 'ENABLE_MODAL':
            return options.setEnableWarningModal(action.enable);
        case 'SET_FILTER':
            return options.setFilter(action.filter);
        case 'ADD_ENVIRONMENT':
            updatePreferences = options.addEnvironment(action.environment);
            PreferencesManager.INSTANCE().saveEnvironments(updatePreferences.environments);
            return updatePreferences;
        case 'REMOVE_ENVIRONMENT':
            updatePreferences = options.removeEnvironment(action.environment);
            PreferencesManager.INSTANCE().saveEnvironments(updatePreferences.environments);
            PreferencesManager.INSTANCE().removeEnvironment(action.environment);
            return updatePreferences;
        case 'LOAD_ENVIRONMENT_PREFERENCES':
            return new Preferences(action.environment[options.currentEnvironment], options);
        case 'CHANGE_ENVIRONMENT':
            return options.setCurrentEnvironment(action.name);
        default:
            return options;
    }
}