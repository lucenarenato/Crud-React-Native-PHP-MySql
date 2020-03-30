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
  
        fetch('http://localhost:8000/InsertStudentData.php', {
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