import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from 'react-native';

module.exports = React.createClass({
  getInitialState() {
      return ({
        tasks: ['Take out the trash', 'Get groceries', 'Practice'],
        completedTasks: [],
        task: ''
      })
  },

  componentWillMount() {
    AsyncStorage.getItem('tasks')
      .then((response) => {
          this.setState({tasks: JSON.parse(response)})
      })
  },

  setStorage() {
    AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    AsyncStorage.setItem('completedTasks', JSON.stringify(this.state.completedTasks));
  },

  renderList(tasks) {
    // return individual views or rows based on the argued tasks.
    return (
        tasks.map((task, index) => {
          return (
            <View key={task} style={styles.task}>
              <Text>
                {task}
              </Text>
              <TouchableOpacity
                onPress={()=>this.completeTask(index)}
              >
                <Text>
                  &#10003;
                </Text>
              </TouchableOpacity>
            </View>
          )
        })
      )
    },

    renderCompleted(tasks) {
      return (
        tasks.map((task, index) => {
          return (
            <View key={task} style={styles.task}>
              <Text style={styles.completed}>
                {task} - completed
              </Text>
              <TouchableOpacity
              onPress={()=>this.deleteTask(index)}>
                <Text>
                  &#10005;
                </Text>
              </TouchableOpacity>
            </View>
          )
        })
      )
    },

    deleteTask(index) {
      let completedTasks = this.state.completedTasks;
      completedTasks = completedTasks.slice(0, index).concat(completedTasks.slice(index+1));
      this.setState({completedTasks});
      this.setStorage();
    },

    completeTask(index) {
      let tasks = this.state.tasks;
      tasks = tasks.slice(0, index).concat(tasks.slice(index+1));

      let completedTasks = this.state.completedTasks;
      completedTasks = completedTasks.concat([this.state.tasks[index]]);

      this.setState({
        tasks,
        completedTasks
      });

      this.setStorage();
    },

  addTask() {
    let tasks = this.state.tasks.concat([this.state.task]);
    this.setState({tasks});
    this.setStorage();
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          To-Do Master
        </Text>
        <View>
        <TextInput
          style={styles.input}
          placeholder="Add a task..."
          onChangeText={(text) => {
            this.setState({task:text});
            console.log(this.state.task)
          }}
          onEndEditing={()=>this.addTask()}
          />
          <ScrollView>
          {this.renderList(this.state.tasks)}
          {this.renderCompleted(this.state.completedTasks)}
          </ScrollView>
        </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 3,
    // borderColor: 'black',
    // flexDirection: 'row'
  },

  header: {
    margin: 30,
    marginTop: 40,
    fontSize: 18,
    textAlign: 'center'
  },

  task: {
    flexDirection: 'row',
    height: 60,
    borderWidth: 1,
    borderColor: 'purple',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center'
  },

  completed: {
    color: "green"
  },

  input: {
    height: 60,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'gold',
    textAlign: 'center',
    margin: 10
  }

  // item: {
  //   flex: 1,
  //   borderWidth: 3,
  //   borderColor: 'teal',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  //
  // largeItem: {
  //   flex: 3,
  //   borderWidth: 3,
  //   borderColor: 'blue'
  // }
})
