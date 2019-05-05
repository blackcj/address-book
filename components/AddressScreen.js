import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableHighlight,
} from 'react-native';
import database from '../database/Database';

type Props = {};
class AddressScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
        };
    }

    static navigationOptions = {
        title: 'Saved Addresses',
    };

    componentDidMount() {
        database.getAddresses().then(response => {
            this.setState({
                addresses: response,
            });
        }).catch(error => {
            alert(`Error ${error}`);
        });
    }

    handleShowAddress = (address) => () => {
        const { navigate } = this.props.navigation;
        navigate('MapScreen', { address });
    }

    renderItem = ({item}) => (
        <View>
            <TouchableHighlight style={styles.touch} onPress={this.handleShowAddress(item.text)}>
                <Text style={styles.item}>{item.text}</Text>
            </TouchableHighlight>
        </View>
    )

    renderSeparator = () => (
        <View
            style={{
                height: 1,
                width: '100%',
                backgroundColor: '#CED0CE',
            }}
        />
    );

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={styles.list}
                    data={this.state.addresses}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    list: {
        flex: 1,
    },
    item: {
        fontSize: 20,
        margin: 20,
    },
    touch: {
        flexDirection: 'row',
    },
});

export default AddressScreen;
