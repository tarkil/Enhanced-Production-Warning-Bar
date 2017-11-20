import React from 'react';
import { Button, Header, Icon, Dimmer, Container } from 'semantic-ui-react'
import ScrollController from '../utils/scrollController.js'
import PropTypes from 'prop-types';


class WarningModal extends React.Component {
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
    onContinue: PropTypes.func,
    onExit: PropTypes.func,
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