import React from 'react';
import { Button, Header, Icon, Dimmer, Container } from 'semantic-ui-react'
import ScrollController from '../utils/scrollController.js'

class WarningModal extends React.Component {
    constructor() {
        super();
        this.state = { active: true };
        ScrollController.disableScroll();
    }
    handleOpen() {
        this.setState({ active: true });
        ScrollController.disableScroll();
    }
    handleClose() {
        this.setState({ active: false });
        ScrollController.enableScroll();
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
                    history.go(-1);
                }} />
                <Button content="Continue" color="green" icon="chevron right" labelPosition="right" inverted onClick={() => {
                    this.handleClose();
                }} />
            </Container>
        </Dimmer>
    }
}

export default WarningModal;