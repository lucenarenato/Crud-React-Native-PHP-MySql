import React, { Component } from 'react';

import { StyleSheet, View, Alert, TextInput, Button, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';

import { StackNavigator } from 'react-navigation';

class MainActivity extends Component {

  static navigationOptions =
  {
     title: 'MainActivity',
  };

constructor(props) {

   super(props)

   this.state = {

     TextInput_Student_Name: '',
     TextInput_Student_Class: '',
     TextInput_Student_PhoneNumber: '',
     TextInput_Student_Email: '',

   }

 }

 InsertStudentRecordsToServer = () =>{

      fetch('https://reactnativecode.000webhostapp.com/Student/InsertStudentData.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        student_name : this.state.TextInput_Student_Name,

        student_class : this.state.TextInput_Student_Class,

        student_phone_number : this.state.TextInput_Student_PhoneNumber,

        student_email: this.state.TextInput_Student_Email

      })

      }).then((response) => response.json())
          .then((responseJson) => {

            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);

          }).catch((error) => {
            console.error(error);
          });

}

 GoTo_Show_StudentList_Activity_Function = () =>
  {
    this.props.navigation.navigate('Second');
    
  }

 render() {
   return (

<View style={styles.MainContainer}>


       <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Student Registration Form </Text>
 
       <TextInput
         
         placeholder="Enter Student Name"

         onChangeText={ TextInputValue => this.setState({ TextInput_Student_Name : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TextInput
         
         placeholder="Enter Student Class"

         onChangeText={ TextInputValue => this.setState({ TextInput_Student_Class : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TextInput
         
         placeholder="Enter Student Phone Number"

         onChangeText={ TextInputValue => this.setState({ TextInput_Student_PhoneNumber : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

       <TextInput

         placeholder="Enter Student Email"

         onChangeText={ TextInputValue => this.setState({ TextInput_Student_Email : TextInputValue }) }

         underlineColorAndroid='transparent'

         style={styles.TextInputStyleClass}
       />

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.InsertStudentRecordsToServer} >

        <Text style={styles.TextStyle}> INSERT STUDENT RECORD TO SERVER </Text>

      </TouchableOpacity>

      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_StudentList_Activity_Function} >

        <Text style={styles.TextStyle}> SHOW ALL INSERTED STUDENT RECORDS IN LISTVIEW </Text>

      </TouchableOpacity>
 

</View>
           
   );
 }
}

class ShowStudentListActivity extends Component {

  constructor(props) { 

    super(props);

    this.state = {

      isLoading: true

    }
  }

  static navigationOptions =
  {
     title: 'ShowStudentListActivity',
  };

  componentDidMount() {
    
       return fetch('https://reactnativecode.000webhostapp.com/Student/ShowAllStudentsList.php')
         .then((response) => response.json())
         .then((responseJson) => {
           let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
           this.setState({
             isLoading: false,
             dataSource: ds.cloneWithRows(responseJson),
           }, function() {
             // In this block you can do something with new state.
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }
    
     GetStudentIDFunction=(student_id,student_name, student_class, student_phone_number, student_email)=>{

          this.props.navigation.navigate('Third', { 

            ID : student_id,
            NAME : student_name,
            CLASS : student_class,
            PHONE_NUMBER : student_phone_number,
            EMAIL : student_email

          });

     }

     ListViewItemSeparator = () => {
       return (
         <View
           style={{
             height: .5,
             width: "100%",
             backgroundColor: "#000",
           }}
         />
       );
     }

     render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
        <View style={styles.MainContainer_For_Show_StudentList_Activity}>
   
          <ListView
   
            dataSource={this.state.dataSource}
   
            renderSeparator= {this.ListViewItemSeparator}
   
            renderRow={ (rowData) => <Text style={styles.rowViewContainer} 

                      onPress={this.GetStudentIDFunction.bind(
                        this, rowData.student_id,
                         rowData.student_name, 
                         rowData.student_class, 
                         rowData.student_phone_number, 
                         rowData.student_email
                         )} > 

                      {rowData.student_name} 
                      
                      </Text> }
   
          />
   
        </View>
      );
    }

}

class EditStudentRecordActivity extends Component {
  
  constructor(props) {
    
       super(props)
    
       this.state = {
    
         TextInput_Student_ID: '',
         TextInput_Student_Name: '',
         TextInput_Student_Class: '',
         TextInput_Student_PhoneNumber: '',
         TextInput_Student_Email: '',
    
       }
    
     }

     componentDidMount(){

      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        TextInput_Student_ID : this.props.navigation.state.params.ID,
        TextInput_Student_Name: this.props.navigation.state.params.NAME,
        TextInput_Student_Class: this.props.navigation.state.params.CLASS,
        TextInput_Student_PhoneNumber: this.props.navigation.state.params.PHONE_NUMBER,
        TextInput_Student_Email: this.props.navigation.state.params.EMAIL,
      })

     }
  
    static navigationOptions =
    {
       title: 'EditStudentRecordActivity',
    };

    UpdateStudentRecord = () =>{
      
            fetch('https://reactnativecode.000webhostapp.com/Student/UpdateStudentRecord.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
      
              student_id : this.state.TextInput_Student_ID,

              student_name : this.state.TextInput_Student_Name,
      
              student_class : this.state.TextInput_Student_Class,
      
              student_phone_number : this.state.TextInput_Student_PhoneNumber,
      
              student_email: this.state.TextInput_Student_Email
      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
      
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                });
      
      }


    DeleteStudentRecord = () =>{
        
          fetch('https://reactnativecode.000webhostapp.com/Student/DeleteStudentRecord.php', {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
        
            student_id : this.state.TextInput_Student_ID
        
          })
        
          }).then((response) => response.json())
          .then((responseJson) => {
        
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
        
          }).catch((error) => {
             console.error(error);
          });

          this.props.navigation.navigate('First');

      }

    render() {

      return (
   
   <View style={styles.MainContainer}>
   
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Student Record Form </Text>
    
          <TextInput
            
            placeholder="Student Name Shows Here"
            
            value={this.state.TextInput_Student_Name}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Student_Name : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="Student Class Shows Here"

            value={this.state.TextInput_Student_Class}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Student_Class : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="Student Phone Number Shows Here"

            value={this.state.TextInput_Student_PhoneNumber}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Student_PhoneNumber : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
          <TextInput
   
            placeholder="Student Email Shows Here"

            value={this.state.TextInput_Student_Email}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_Student_Email : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >
   
            <Text style={styles.TextStyle}> UPDATE STUDENT RECORD </Text>
   
         </TouchableOpacity>
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteStudentRecord} >
   
            <Text style={styles.TextStyle}> DELETE CURRENT RECORD </Text>
   
         </TouchableOpacity>
    
   
   </View>
              
      );
    }

}

export default MyNewProject = StackNavigator(

  {

    First: { screen: MainActivity },

    Second: { screen: ShowStudentListActivity },

    Third: { screen: EditStudentRecordActivity }

  });

const styles = StyleSheet.create({

  MainContainer :{

    alignItems: 'center',
    flex:1,
    paddingTop: 30,
    backgroundColor: '#fff'

  },

  MainContainer_For_Show_StudentList_Activity :{
    
    flex:1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
    
    },

  TextInputStyleClass: {

  textAlign: 'center',
  width: '90%',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  borderColor: '#FF5722',
  borderRadius: 5 ,

  },

  TouchableOpacityStyle: {

    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    marginBottom:7,
    width: '90%',
    backgroundColor: '#00BCD4'

  },

  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }

});