
import React from 'react';
import ReactDOM from 'react-dom';
import ShadowDOM from 'react-shadow';
import WarningModal from '../components/warningModal.jsx'
import ExtensionHelper from '../utils/extensionHelper'

import 'semantic-ui-css/semantic.min.css';

/**
 * Create a new div element that is appended as a div element to body
 * @param {string} htmlStr html element
 * @param {string} id element id
 * @returns {element} created element
 */
function createHTMLElement(htmlStr, id) {
    let frag = document.createDocumentFragment();
    let newDiv = document.createElement('div');
    newDiv.setAttribute('id', id);
    newDiv.innerHTML = htmlStr;
    let temp = document.createElement('div');
    temp.innerHTML = newDiv.outerHTML;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    document.body.appendChild(frag);
    return document.getElementById(id);
}

/**
 * Load font-faces required by semantic-ui. This function is useful to load font faces, when you are using
 * shadow dom. According to {@link http://robdodson.me/at-font-face-doesnt-work-in-shadow-dom/|this}, currently
 * font faces are not working with shadow dom.
 * @returns {void}
 */
function loadFontFace() {
    const eotFont = ExtensionHelper.getURL('build/js/icons.eot');
    const ttfFont = ExtensionHelper.getURL('build/js/icons.ttf');
    const svgFont = ExtensionHelper.getURL('build/js/icons.svg');

    var newStyle = document.createElement('style');
    newStyle.appendChild(document.createTextNode(`
                        @font-face {
                            font-family: 'Icons';
                            src: url("${eotFont}");
                            src: url("${eotFont}?#iefix") format('embedded-opentype'), url("${ttfFont}") format('truetype'), url("${svgFont}#icons") format('svg');
                            font-style: normal;
                            font-weight: normal;
                            font-variant: normal;
                            text-decoration: inherit;
                            text-transform: none;
                          }
                        `));

    document.head.appendChild(newStyle);
}

/**
 * Decorator used to not duplicate the definition of font face
 * @param {*} target The class that the member is on.
 * @param {*} name The name of the member in the class
 * @param {*} descriptor The member descriptor. The function that is being annotated in this case
 * @returns {function} wrapped original function
 */
function includeFontFace(target, name, descriptor) {
    const original = descriptor.value;
    if (typeof original === 'function') {
        descriptor.value = function (...args) {
            if (this.fontFacesIncluded !== true) {
                this.fontFacesIncluded = true;
                loadFontFace();
            }
            try {
                const result = Reflect.apply(original, this, args);
                return result;
            } catch (exception) {
                console.error(`Error: ${exception}`);
                throw exception;
            }
        }
    }
    return descriptor;
}

/**
 * A service that renders components created with semantic-ui
 */
class SemanticComponentsService {

    /**
     * Render a warning modal using shadow dom
     * @param {string} id element id
     * @returns {void}
     */
    @includeFontFace
    renderWarningModal(id = Math.random().toString(36).
        substring(7)) {
        const container = createHTMLElement('', id);
        ReactDOM.render(
            <ShadowDOM include={[ExtensionHelper.getURL('build/js/styles.css')]}>
                <div>
                    <WarningModal />
                </div>
            </ShadowDOM>, container);
    }
}

export default new SemanticComponentsService();