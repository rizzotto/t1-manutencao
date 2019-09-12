import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { AnamnesesRecordsScreen, ListSubitemsScreen } from '../Screens';
import AnamnesisFormCoordinator from './AnamnesisFormCoordinator';
import AppStyle from '../styles';

// stack navigator do formulário de anamnese
const AnamnesisForm = createStackNavigator({
    // uma entrada para o coordinator (rota inicial)
    Coordinator: AnamnesisFormCoordinator,

    // demais entradas para os tipos de telas do form (entrada de texto, listagem fechada, ...)
    SubitemsSelection: ListSubitemsScreen
}, {
    initialRouteName: "Coordinator",
    defaultNavigationOptions: {
        headerBackTitle: "Voltar",
        headerTintColor: AppStyle.colors.main,
        headerTitleStyle: {
            color: AppStyle.colors.darkText
        },
        headerStyle: {
            borderBottomWidth: 0
        }
    }
})

// tabbar do app
const TabNavigator = createBottomTabNavigator({
    AnamnesesRecords: AnamnesesRecordsScreen
    // entradas para as outras tabs (exames e diário) quando prontas
}, {
    tabBarOptions: {
        activeTintColor: AppStyle.colors.main
    }
});

// todo o app está dentro de um stack navigator para ter a animação e comportamento do botão
// "Voltar" corretos quando abre um fluxo de cadastro/edição (anamnese, exames ou diário)
// se não fizer isso, quando o usuário navegar para um fluxo de cadastro/edição, a tabbar
// continuaria sendo exibida por cima das telas desses fluxos
const AppNavigator = createStackNavigator({
    // a primeira rota é a tabbar do app
    Main: TabNavigator,

    // as demais são os fluxos de cadastro/edição
    AnamnesisForm: AnamnesisForm
}, {
    // esconder header e apresentar com animação de modal (de baixo para cima)
    mode: "modal",
    headerMode: "none",
    initialRouteName: "Main"
});

export default createAppContainer(AppNavigator);
