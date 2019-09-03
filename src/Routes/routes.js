import {createStackNavigator, createAppContainer} from 'react-navigation';
import QuestionScreen from '../Screens/MainScreen'

const AppNavigator = createStackNavigator({
    Home: QuestionScreen
})

export default createAppContainer(AppNavigator)