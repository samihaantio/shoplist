import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { StackNavigator,} from 'react-navigation';

import Item from './Item';

export default class Memberarea extends Component {

  state = {
    username: [],
    itemArray: [],
    itemText: '',
  }

  componentDidMount() {
    this._loadInitialState().done();

    fetch('http://192.168.10.53:3000/users/items', {
      method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.success === true ) {

        for(var i = 0; i < res.items.length; i++){
          this.state.itemArray.push( {id: res.items[i]._id, date: res.items[i].date, 'item': res.items[i].name});
          this.setState({ itemArray: this.state.itemArray });
        }

      } else {
        alert('not working');
      }

    })
    .done();
  }

  _loadInitialState = async () => {

    // Get username from AsyncStorage
    var value = await AsyncStorage.getItem('username');
    if (value !== null) {
      this.setState({username: value});
    }
  }

  render() {

    let items = this.state.itemArray.map((val, key) => {
      return <Item key={key} keyval={key} val={val} deleteMethod={ () => this.deleteItem(val.id) } />
    })

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Ostoslista</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {items}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.addItem.bind(this)} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>

          <TextInput style={styles.textInput}
          onChangeText={(itemText) => this.setState({itemText})} value={this.state.itemText}
            placeholder='> Lisää tuote' placeholderTextColor='white' underlineColorAndroid='transparent'>
          </TextInput>
        </View>
      </View>
    );
  }

  addItem(){
    if (this.state.itemText) {
      //var d = new Date();
      //this.state.itemArray.push( {date: d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate(), 'item': this.state.itemText});
      //this.setState({ itemArray: this.state.itemArray });
      //this.setState({ itemText: ''});

      // Post new item to database
      fetch('http://192.168.10.53:3000/users/items', {
        method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({
              item: this.state.itemText,
            })
      }).then((response) => response.json())
      .then((res) => {
        if (res.success === true ) {

          this.setState({ itemArray: this.state.itemArray });
          this.setState({ itemText: ''});
          this.updateList();
  
        } else {
          alert('Something went wrong');
        }
  
      })
      .done();
      Keyboard.dismiss();
    }
  }

  updateList(){

    this.setState({ itemArray: [] });

    fetch('http://192.168.10.53:3000/users/items', {
      method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.success === true ) {

        for(var i = 0; i < res.items.length; i++){
          this.state.itemArray.push( {id: res.items[i]._id, date: res.items[i].date, 'item': res.items[i].name});
          this.setState({ itemArray: this.state.itemArray });
        }

      } else {
        alert('not working');
      }

    })
    .done();
  }

  deleteItem(key){

    // Delete item from database
    fetch('http://192.168.10.53:3000/users/items/delete', {
      method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
          id: key,
          })
    }).then((response) => response.json())
    .then((res) => {
      if (res.success === true ) {

        this.setState({ itemArray: this.state.itemArray });
        this.updateList();

      } else {
        alert('Something went wrong');
      }

    })
    .done();

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26,
  },
  newButton: {
    alignSelf: 'flex-end',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButton: {
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end', 
    elevation: 8,
    marginBottom: -65,
    marginRight: 15,
    zIndex: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    paddingTop: 46,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  }
})
