import React from 'react';
import { Button, Header, Icon, Dimmer, Container } from 'semantic-ui-react'
import ScrollController from '../utils/scrollController.js'
import PropTypes from 'prop-types';

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
                Your are in production!
                <Header.Subheader>
                    Your actions may break the system. Be careful!
                </Header.Subheader>
            </Header>
            <Container>
                <Button content="Go safe" icon="remove" basic color="red" inverted onClick={() => {
                    this.props.onExit();
                }} />
                <Button content="Continue" color="green" icon="chevron right" labelPosition="right" inverted onClick={() => {
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
    onShow: PropTypes.func
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
    }
};

export default WarningModal;