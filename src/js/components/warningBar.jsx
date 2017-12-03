import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';

class WarningBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }

    render() {
        if (this.state.show) {
            return <AppBar
                title={this.props.title}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                style={this.props.style}
                iconElementLeft={<IconButton onClick={() => {
                    if (!this.props.disableClose) {
                        this.setState({ show: false });
                        this.props.onClose();
                    }
                }
                }
                ><NavigationClose /></IconButton>}
            />;
        }
        return null;
    }
}

WarningBar.propTypes = {
    onClose: PropTypes.func,
    disableClose: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.string
};

WarningBar.defaultProps = {
    onClose: () => { },
    disableClose: false,
    style: {
        'backgroundColor': 'red',
        'filter': 'none !important'
    },
    title: 'Production warning bar'
};

export default WarningBar;
