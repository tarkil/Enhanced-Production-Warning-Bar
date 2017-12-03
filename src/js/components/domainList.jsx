import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import { grey400 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';

class DomainList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showNewDomain: false,
            urlText: "",
            oldUrlText: ""
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleAddDomain = this.handleAddDomain.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleOpen() {
        this.setState({ showNewDomain: true });
    }

    handleClose() {
        this.setState({ showNewDomain: false });
    }

    handleAddDomain() {
        this.setState({ showNewDomain: false });
        if (this.state.oldUrlText !== "") {
            this.props.onModifyDomain(this.state.urlText, this.state.oldUrlText);
        } else if (this.state.urlText) {
            this.props.onAddDomain(this.state.urlText);
        }
    }

    createListItems(items) {
        var listItems = [];
        const iconButtonElement =
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
            ;

        items.forEach((item) => {
            listItems.push(<ListItem
                key={item}
                leftAvatar={<ContentLink />}
                rightIconButton={<IconMenu iconButtonElement={iconButtonElement}>
                    <MenuItem onClick={() => {
                        this.setState({
                            showNewDomain: true,
                            urlText: item,
                            oldUrlText: item
                        });
                    }
                    }>Edit</MenuItem>
                    <MenuItem onClick={() => {
                        this.props.onRemoveDomain(item);
                    }
                    }>Delete</MenuItem>
                </IconMenu>
                }
                primaryText={item}
            />);
            listItems.push(<Divider key={`divider-${item}`} inset={true} />);
        });

        return listItems;
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                key="cancel"
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={this.state.urlText.trim().length === 0}
                onTouchTap={this.handleAddDomain}
                key="submit"
            />
        ];

        const urls = this.props.domainList;
        const listItems = this.createListItems(urls);
        return (
            <Card
                onExpandChange={() => {
                    this.setState({
                        showNewDomain: true,
                        urlText: "",
                        oldUrlText: ""
                    });
                }
                }>
                <CardHeader
                    title="Domain List"
                    subtitle="Production environment's domain"
                    avatar="../img/svg/network-offline.svg"
                    actAsExpander={true}
                    showExpandableButton={true}
                    closeIcon={<ContentAdd>
                    </ContentAdd>}
                    openIcon={<ContentAdd>
                    </ContentAdd>}
                />
                <CardText>
                    <List>
                        {listItems}
                    </List>
                    <Dialog
                        title="Add production domain"
                        actions={actions}
                        modal={true}
                        open={this.state.showNewDomain}
                    >
                        <TextField
                            id="text-field-controlled"
                            value={this.state.urlText}
                            onChange={(event) => {
                                this.setState({ urlText: event.target.value });
                            }
                            }
                        />
                    </Dialog>
                </CardText>
            </Card>
        );
    }
}


DomainList.propTypes = {
    onAddDomain: PropTypes.func.isRequired,
    onModifyDomain: PropTypes.func.isRequired,
    onRemoveDomain: PropTypes.func.isRequired,
    domainList: PropTypes.array.isRequired
};

DomainList.defaultProps = {
    onAddDomain: () => { },
    onModifyDomain: () => { },
    onRemoveDomain: () => { },
    domainList: []
};

export default DomainList;