/**
 * An utility class to select elements from a React component that has been rendered with
 * react-test-renderer
 */
class JestReactRendererUtils {


    /**
     * Select the react elements that meet a criteria
     * @param {ReactTestRenderer} component a component created with 'react-test-renderer
     * @param {string} query an expression that defines which elements must be selected
     * @returns {Array<react.element>} react elements
     */
    selectComponent(component, query) {
        const selectors = query.split('>');
        const rootElement = component.toTree().rendered;
        if (this.checkIfElementIsInstanceOf(rootElement, selectors[0])) {
            let currentElement = [rootElement];
            for (let selector of selectors.slice(1)) {
                let newCurrentElement = [];
                for (let subElement of currentElement) {
                    newCurrentElement = newCurrentElement.concat(this.selectChildrenOfType(subElement, selector));
                }
                if (newCurrentElement.length > 0) {
                    currentElement = newCurrentElement;
                } else {
                    return [];
                }
            }
            return currentElement;
        }
        return [];
    }

    /**
     * Check if the direct children of an element are of a given type
     * @param {react.element} element react element
     * @param {string} selector element type
     * @returns {Array<react.element>} a list of elements of a given types
     */
    selectChildrenOfType(element, selector) {
        let result = [];
        for (let childElement of element.props.children) {
            if (this.checkIfElementIsInstanceOf(childElement, selector)) {
                result.push(childElement);
            }
        }
        return result;
    }

    /**
     * Check if an element is of the given type
     * @param {react.element} element react element
     * @param {string} type type name
     * @returns {boolean} true if the element is of the given type
     */
    checkIfElementIsInstanceOf(element, type) {
        return element.type._meta.name === type.trim();
    }

}

export default new JestReactRendererUtils();