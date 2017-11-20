import React from 'react'

import WarningModal from '../../src/js/components/warningModal.jsx';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import JestReactRendererUtils from '../utils/jestReactRendererUtils'

describe("WarningModal", () => {
    it('Modal is rendered correctly when it is created and continue button is clicked', () => {
        //When: modal is created
        const component = renderer.create(
            <WarningModal />
        );
        //Then:
        expect(component.toJSON()).toMatchSnapshot();

        //And: Continue button is clicked
        //component.toTree().rendered.props.children[1].props.children[1].props.onClick();l
        const button = JestReactRendererUtils.selectComponent(component, 'Dimmer > Container > Button')[1];

        button.props.onClick();
        //Then: modal disappear
        expect(component.toJSON()).toMatchSnapshot();

    });

    it('Modal is rendered correctly when it is created and exit button is clicked', () => {
        //When: modal is created
        const component = renderer.create(
            <WarningModal />
        );
        //Then:
        expect(component.toJSON()).toMatchSnapshot();

        //And: Exit button is clicked
        const button = JestReactRendererUtils.selectComponent(component, 'Dimmer > Container > Button')[0];

        button.props.onClick();
        //Then: modal disappear
        expect(component.toJSON()).toMatchSnapshot();
    });


    it('Modal should block web page and disappear when we click on continue', () => {
        //Given:
        const onShowFunctionMock = jest.fn();
        const onContinueFunctionMock = jest.fn();
        const onexitFunctionMock = jest.fn();
        const component = shallow(<WarningModal onShow={onShowFunctionMock} onContinue={onContinueFunctionMock} onExit={onexitFunctionMock} />);

        //then: Dimmer should block user interaction with the current web page
        let dimmer = component.find('Dimmer');
        expect(dimmer.props().active).toBeTruthy();
        expect(onShowFunctionMock.mock.calls.length).toBe(1);
        expect(onContinueFunctionMock.mock.calls.length).toBe(0);
        expect(onexitFunctionMock.mock.calls.length).toBe(0);


        //and: if the continue button is clicked
        const continueButton = component.find('Button').last();
        continueButton.simulate('click');
        component.update();

        //Then: modal disappears
        dimmer = component.find('Dimmer');
        expect(dimmer.props().active).toBeFalsy();
        expect(onShowFunctionMock.mock.calls.length).toBe(1);
        expect(onContinueFunctionMock.mock.calls.length).toBe(1);
        expect(onexitFunctionMock.mock.calls.length).toBe(0);
    });


    it('Modal should block web page and exit when we click on continue', () => {
        //Given:
        const onShowFunctionMock = jest.fn();
        const onContinueFunctionMock = jest.fn();
        const onexitFunctionMock = jest.fn();
        const component = shallow(<WarningModal onShow={onShowFunctionMock} onContinue={onContinueFunctionMock} onExit={onexitFunctionMock} />);

        //then: Dimmer should block user interaction with the current web page
        let dimmer = component.find('Dimmer');
        expect(dimmer.props().active).toBeTruthy();
        expect(onShowFunctionMock.mock.calls.length).toBe(1);
        expect(onContinueFunctionMock.mock.calls.length).toBe(0);
        expect(onexitFunctionMock.mock.calls.length).toBe(0);


        //and: if the exit button is clicked
        const continueButton = component.find('Button').first();
        continueButton.simulate('click');
        component.update();

        //Then: modal disappears
        dimmer = component.find('Dimmer');
        expect(dimmer.props().active).toBeTruthy();
        expect(onShowFunctionMock.mock.calls.length).toBe(1);
        expect(onContinueFunctionMock.mock.calls.length).toBe(0);
        expect(onexitFunctionMock.mock.calls.length).toBe(1);
    });
});
