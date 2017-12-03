import React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { enableModal } from '../actions/actionsType';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';

class ModalPreferencesComponent extends React.Component {

    render() {
        return (
            <Card expanded={this.props.enable}>
                <CardHeader
                    title="Warning modal"
                    subtitle="Display a modal warning that you are in a production environment"
                    avatar="../img/svg/konversation.svg"
                    actAsExpander={true}
                    showExpandableButton={false}
                />
                <CardText>
                    <Toggle
                        toggled={this.props.enable}
                        onToggle={() => {
                            this.props.onEnableModal(!this.props.enable);
                        }
                        }
                        labelPosition="left"
                        label="Enable"
                    />
                </CardText>
            </Card>
        );
    }

}

ModalPreferencesComponent.propTypes = {
    enable: PropTypes.bool,
    onEnableModal: PropTypes.func
}

const mapStateToProps = (state) => ({
    enable: state.enableWarningModal
});

const mapDispatchToProps = (dispatch) => ({
    onEnableModal: (value) => {
        dispatch(enableModal(value));
    }
});


const ModalPreferences = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalPreferencesComponent);

export default ModalPreferences;