import React from 'react'

import WarningModal from '../../src/js/components/warningModal.jsx';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import JestReactRendererUtils from '../utils/jestReactRendererUtils'

describe("WarningModal", () => {
    it('Modal is rendered correctly when it is created and continue buttom is clicked', () => {
        //When: modal is created
        const component = renderer.create(
            <WarningModal />
        );
        //Then:
        expect(component.toJSON()).toMatchSnapshot();
        //And: Continue button is clicked
        const button = JestReactRendererUtils.selectComponent(component, 'Dimmer > Container > Button')[1]; //component.toTree().rendered.props.children[1].props.children[1].props.onClick();

        button.props.onClick();
        //Then: modal disappear
        expect(component.toJSON()).toMatchSnapshot();

    });

    it('Modal should block web page and disappear when we click on continue', () => {
        //Given:
        const component = shallow(<WarningModal />);

        //then: Dimmer should block user interaction with the current web page
        let dimmer = component.find('Dimmer');
        expect(dimmer.props().active).toBeTruthy();

        //and: if the continue button is clicked
        const continueButton = component.find('Button').last();
        continueButton.simulate('click');
        component.update();

        //Then: modal dissapears
        dimmer = component.find('Dimmer');
        expect(dimmer.props().active).toBeFalsy();

    });
});
