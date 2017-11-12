import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PreferencesPage from './containers/preferencesPage.jsx';

import optionsReducer from './reducer/optionsReducer';
import { loadPreferences, loadEnvironmentPreferences } from './actions/actionsType';
import PreferencesManager from './utils/preferences.js';
import { IntlProvider, addLocaleData } from 'react-intl';
import es from 'react-intl/locale-data/es';
import en from 'react-intl/locale-data/en';

import esTranslation from './i18n/es.json'
import enTranslation from './i18n/en.json'

addLocaleData(es, en);

injectTapEventPlugin();

const translations = {
    es: esTranslation,
    en: enTranslation
};

const store = createStore(optionsReducer);
let currentEnvironment = "";
store.subscribe(() => {
    let previousEnvironment = currentEnvironment;
    currentEnvironment = store.getState().currentEnvironment;

    if (previousEnvironment !== currentEnvironment) {
        PreferencesManager.INSTANCE().loadEnvironment(currentEnvironment, (items) => {
            store.dispatch(loadEnvironmentPreferences(items));
        });
    }
});

PreferencesManager.INSTANCE().loadPreferences((items) => store.dispatch(loadPreferences(items)));

class Application extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Provider store={ store }>
                    <IntlProvider locale = { navigator.language} messages={ translations[navigator.language] }>
                        <PreferencesPage></PreferencesPage>
                    </IntlProvider>
                </Provider>
            </MuiThemeProvider>);
    }
}

ReactDOM.render(<Application/>, document.getElementById('app'));