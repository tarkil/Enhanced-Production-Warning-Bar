import React from 'react';

import { ChromePicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import EditorFormatColorFill from 'material-ui/svg-icons/editor/format-color-fill';
import { fullWhite } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';

class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
    }


    handleChangeComplete(newColor) {
        this.setState({ color: newColor.hex });
    }

    handleClick() {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker,
            color: this.props.color
        })
    }

    handleAccept() {
        this.setState({
            displayColorPicker: false
        });
        this.props.onColorChange(this.state.color);
    }

    handleClose() {
        this.setState({
            displayColorPicker: false,
            color: this.props.color
        });
    }

    render() {
        const style = {
            margin: 12
        };

        const customDialogStyle = {
            width: 'fit-content',
            height: 'fit-content'
        };

        const actions = [
            <FlatButton
                key="cancel"
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                key="submit"
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleAccept}
            />
        ];

        return (
            <div>
                <label alt="Choose colour">Colour:</label>
                <RaisedButton
                    backgroundColor={this.props.color}
                    style={style}
                    icon={<EditorFormatColorFill color={fullWhite} />}
                    onClick={this.handleClick}
                />
                <Dialog
                    title="Choose color"
                    actions={actions}
                    modal={false}
                    open={this.state.displayColorPicker}
                    contentStyle={customDialogStyle}
                    onRequestClose={this.handleClose}>
                    <ChromePicker color={this.state.color} onChangeComplete={this.handleChangeComplete} />
                </Dialog>
            </div>
        );
    }

}

ColorPicker.propTypes = {
    color: PropTypes.string,
    onColorChange: PropTypes.func
};

export default ColorPicker;
