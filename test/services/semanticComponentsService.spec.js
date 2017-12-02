import SemanticComponentsService from '../../src/js/services/semanticComponentsService'

describe('SemanticComponentsService', () => {

    beforeAll(() => {
        //Setup a stub for attachShadow. It is required by Shadow DOM
        window.HTMLElement.prototype.attachShadow = function () {
            const boundary = window.document.createElement('fake-boundary');
            this.appendChild(boundary);
            return boundary;
        };
    });

    it('Modal is rendered as a shadow dom subtree', () => {
        //When we render a warning modal
        SemanticComponentsService.renderWarningModal();
        //We expect that it is rendered as shadow dom
        expect(document.documentElement.innerHTML).toMatchSnapshot();
    });
});