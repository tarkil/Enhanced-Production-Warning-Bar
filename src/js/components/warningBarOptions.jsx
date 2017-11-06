import React from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import { Card, CardHeader, CardText, CardActions } from 'material-ui/Card';


import ColorPicker from './colorPicker.jsx';
import WarningBar from './warningBar.jsx';

class WarningBarOptions extends React.Component {

    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.hanldeWarningMessageChange = this.hanldeWarningMessageChange.bind(this);

    }


    handleToggle () {
        this.props.onBarEnable(!this.props.enable);
    }

    handleColorChange (color) {
        this.props.onColorChange(color);
    }

    hanldeWarningMessageChange (event) {
        this.props.onMessageChange(event.target.value);
    }

    render() {

        const barStyle = {
            'backgroundColor': this.props.barColor
        };

        return (
            <Card expanded={ this.props.enable }>
                <CardHeader
                    title="Warning bar options"
                    subtitle="Set custom configuration for the warning bar"
                    avatar="../img/svg/application-info.svg"
                    actAsExpander={ true }
                    showExpandableButton={ false }
                />
                <CardText>
                    <Toggle
                        toggled={ this.props.enable }
                        onToggle={ this.handleToggle }
                        labelPosition="left"
                        label="Enable"
                    />
                </CardText>
                <CardActions expandable= { true }>
                    <WarningBar title={ this.props.warningMessage }
                                disableClose= { true }
                                style={ barStyle }
                    ></WarningBar>
                </CardActions>
                <CardText expandable={true}>
                    <TextField
                        hintText="Default message"
                        floatingLabelText="Warning message"
                        value={ this.props.warningMessage }
                        floatingLabelFixed={ false }
                        onChange={ this.hanldeWarningMessageChange }
                    />
                    <ColorPicker color={ this.props.barColor } onColorChange={ this.handleColorChange }></ColorPicker>
                </CardText>
            </Card>
        );
    }
}

 WarningBarOptions.propTypes = {
     onMessageChange: PropTypes.func,
     onColorChange: PropTypes.func,
     barColor: PropTypes.string,
     warningMessage: PropTypes.string,
     enable: PropTypes.bool,
     onBarEnable: PropTypes.func
 };

WarningBarOptions.defaultProps = {
    onMessageChange: () => { },
    onColorChange: () => { },
    barColor: '#ff0000',
    warningMessage: 'Production Environment',
    enable: true
};

export default WarningBarOptions;
