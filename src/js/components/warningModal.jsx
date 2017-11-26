import React from 'react';
import { Button, Header, Icon, Dimmer, Container } from 'semantic-ui-react'
import PropTypes from 'prop-types';

import ScrollController from '../utils/scrollController.js'
import LocalizationHelper from '../utils/localizationHelper.js'

/**
 * A modal that blocks user interaction with the page
 * @namespace
 */
class WarningModal extends React.Component {

    /**
     * Create and display a new WarningModal
     * @param {*} props properties supported by this component
     */
    constructor(props) {
        super(props);
        this.state = { active: true };
        this.props.onShow();
    }

    handleOpen() {
        this.setState({ active: true });
        this.props.onShow();
    }

    handleClose() {
        this.setState({ active: false });
        this.props.onContinue();
    }

    render() {
        return <Dimmer active={this.state.active}>
            <Header as="h2" icon inverted>
                <Icon name="industry" />
                {this.props.translationService.getTranslatedMessage('warningModal_title')}
                <Header.Subheader>
                    {this.props.translationService.getTranslatedMessage('warningModal_description')}
                </Header.Subheader>
            </Header>
            <Container>
                <Button content={this.props.translationService.getTranslatedMessage('warningModal_exit')} icon="remove" basic color="red" inverted onClick={() => {
                    this.props.onExit();
                }} />
                <Button content={this.props.translationService.getTranslatedMessage('warningModal_continue')} color="green" icon="chevron right" labelPosition="right" inverted onClick={() => {
                    this.handleClose();
                }} />
            </Container>
        </Dimmer>
    }
}

WarningModal.propTypes = {

    /**
     * @property {function} onContinue The action to perform if the user decides to interact with the page.
     * The default action enables scrolling.
     * @memberof WarningModal
     */
    onContinue: PropTypes.func,

    /**
     * @property {function} onExit The action to perform if the user decides to leave the page.
     * The default action is to go to the previous page.
     * @memberof WarningModal
     */
    onExit: PropTypes.func,

    /**
     * @property {function} onShow The action to perform when the modal is displayed.
     * The default action is to disable scrolling.
     * @memberof WarningModal
     */
    onShow: PropTypes.func,

    /**
     * @property {LocalizationHelper} translationService service that retrieves translations.
     * @memberof WarningModal
     */
    translationService: PropTypes.object
};

WarningModal.defaultProps = {
    onContinue: () => {
        ScrollController.enableScroll();
    },
    onExit: () => {
        history.go(-1);
    },
    onShow: () => {
        ScrollController.disableScroll();
    },
    translationService: LocalizationHelper
};

export default WarningModal;