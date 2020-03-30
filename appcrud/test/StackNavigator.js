export default MyNewProject = StackNavigator(
 
    {
   
      First: { screen: MainActivity },
   
      Second: { screen: ShowStudentListActivity },
   
      Third: { screen: EditStudentRecordActivity }
   
    });

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        logo: {
          width: 300,
          height: 300,
        },
        title: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        button: {
          borderRadius: 3,
          padding: 20,
          marginVertical: 10,
          marginTop: 10,
          backgroundColor: '#1B95E0',
        },
        buttonText: {
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 16,
        },
      });
      
      let hotWrapper = () => () => App;
      if (Platform.OS === 'web') {
        const { hot } = require('react-hot-loader');
        hotWrapper = hot;
      }
      export default hotWrapper(module)(App);