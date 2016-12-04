import React from 'react';

import { ChromePicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import EditorFormatColorFill from 'material-ui/svg-icons/editor/format-color-fill';
import {fullWhite} from 'material-ui/styles/colors';


class ColorPicker extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            color: props.color ? props.color : "#a4c639",
            previousColor: props.color ? props.color : "#a4c639"
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
    }


    handleChangeComplete (newColor, event) {
        this.setState({ color: newColor.hex });
    }

    handleClick () {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker,
            previousColor: this.state.color
        })
    }

    handleAccept () {
        this.setState({
            displayColorPicker: false
        });
    }

    handleClose () {
        this.setState({
            displayColorPicker: false,
            color: this.state.previousColor
        });
    }

    render () {
        const style = {
            margin: 12
        };

        const customDialogStyle = {
            width: 'fit-content',
            height: 'fit-content',
        };

        const actions = [
            <FlatButton
                label="Cancel"
                primary={ true }
                onTouchTap={ this.handleClose }
            />,
            <FlatButton
                label="Submit"
                primary={ true }
                keyboardFocused={ true }
                onTouchTap={ this.handleAccept }
            />
        ];

         return (
            <div>
                <label alt="Choose colour">Colour:</label>
                <RaisedButton
                    backgroundColor={ this.state.color }
                    style={ style }
                    icon={ <EditorFormatColorFill color={fullWhite} /> }
                    onClick={ this.handleClick }
                />
                <Dialog
                    title="Choose color"
                    actions={ actions }
                    modal={ false }
                    open={ this.state.displayColorPicker }
                    contentStyle={ customDialogStyle }
                    onRequestClose={ this.handleClose }>
                    <ChromePicker color= { this.state.color } onChangeComplete={ this.handleChangeComplete }/>
                </Dialog>
            </div>
        );
    }

}

export default ColorPicker;