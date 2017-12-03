import React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { setFilter } from '../actions/actionsType';
import PropTypes from 'prop-types';

class WebFilterPrefencesComponent extends React.Component {

    render() {
        return (
            <Card expanded={true}>
                <CardHeader
                    title="Warning filter"
                    subtitle="Apply a filter to the web in order to modify its appearance"
                    avatar="../img/svg/view-calendar-workweek.svg"
                    actAsExpander={false}
                    showExpandableButton={false}
                />
                <CardText>
                    <SelectField
                        floatingLabelText="Filter type"
                        value={this.props.filter}
                        onChange={(event, index, value) => {
                            this.props.onChangeFilter(value);
                        }
                        }
                    >
                        <MenuItem value={"none"} primaryText="None" />
                        <MenuItem value={"grayscale(1)"} primaryText="Grayscale" />
                        <MenuItem value={"sepia(1)"} primaryText="Sepia" />
                        <MenuItem value={"invert(1)"} primaryText="Invert" />
                    </SelectField>
                </CardText>
            </Card>
        );
    }

}

const mapStateToProps = (state) => ({
    filter: state.filter
});

const mapDispatchToProps = (dispatch) => ({
    onChangeFilter: (value) => {
        dispatch(setFilter(value));
    }
});


const WebFilterPreferences = connect(
    mapStateToProps,
    mapDispatchToProps
)(WebFilterPrefencesComponent);

WebFilterPrefencesComponent.propTypes = {
    filter: PropTypes.string,
    onChangeFilter: PropTypes.func
};

export default WebFilterPreferences;