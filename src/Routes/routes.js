import { createBottomTabNavigator, createAppContainer, createStackNavigator, getActiveChildNavigationOptions } from 'react-navigation';
import {
    AnamnesesRecordsScreen, AnamnesisDetailScreen,
    JournalsScreen, DiaryDetailScreen,
    ListExamsScreen, DetailExamScreen,
    ConfigScreen,
    ListSubitemsScreen, ListScreen, TextInputScreen, EmojiScreen, MultiTextInputScreen, ImageSelectionScreen,
    GalleryScreen, LoadingScreen, CreateTabBarIcon
} from '../Screens';
import AnamnesisFormCoordinator from './AnamnesisFormCoordinator';
import JournalEntryFormCoordinator from './JournalEntryFormCoordinator';
import ExamFormCoordinator from './ExamFormCoordinator';
import AppStyle from '../styles';

const defaultNavigationOptions = {
    headerBackTitle: "Voltar",
    headerTintColor: AppStyle.colors.main,
    headerTitleStyle: {
        color: AppStyle.colors.darkText
    },
    headerStyle: {
        borderBottomWidth: 0
    }
}

//
// ANAMNESE
//

// FORM
const AnamnesisForm = createStackNavigator({
    // uma entrada para o coordinator (rota inicial)
    Coordinator: AnamnesisFormCoordinator,

    // demais entradas para os tipos de telas do form (entrada de texto, listagem fechada, ...)
    TextInput: TextInputScreen,
    MultiTextInput: MultiTextInputScreen,
    List: ListScreen,
    SubitemsList: ListSubitemsScreen
}, {
    defaultNavigationOptions,
    initialRouteName: "Coordinator",
})

// TAB
const AnamnesisTab = createStackNavigator({
    AnamnesesRecords: AnamnesesRecordsScreen,
    AnamnesisDetail: AnamnesisDetailScreen
}, {
    defaultNavigationOptions
});

AnamnesisTab.navigationOptions = {
    title: "Ficha",
    tabBarIcon: CreateTabBarIcon(require("../Resources/anamnesesTabBarIcon.png"))
}

//
// DIÁRIO
//

// FORM
const JournalEntryForm = createStackNavigator({
    Coordinator: JournalEntryFormCoordinator,
    TextInput: TextInputScreen,
    List: ListScreen,
    Emoji: EmojiScreen
}, {
    defaultNavigationOptions,
    initialRouteName: "Coordinator",
})

// TAB
const JournalsTab = createStackNavigator({
    JournalsHistory: JournalsScreen,
    DiaryDetail: DiaryDetailScreen
}, {
    defaultNavigationOptions
});

JournalsTab.navigationOptions = {
    title: "Diário",
    tabBarIcon: CreateTabBarIcon(require("../Resources/journalsTabBarIcon.png"))
}

//
// EXAMES
//

// FORM
const ExamForm = createStackNavigator({
    Coordinator: ExamFormCoordinator,
    ImageSelection: ImageSelectionScreen,
    TextInput: TextInputScreen
}, {
    defaultNavigationOptions,
    initialRouteName: "Coordinator"
})

// TAB
const ExamsTab = createStackNavigator({
    ExamsList: ListExamsScreen,
    ExamDetail: DetailExamScreen
}, {
    defaultNavigationOptions
});

ExamsTab.navigationOptions = ({ navigation, screenProps }) => {
    // usar a navigationOptions da primeira tela exibida pela stack
    let activeRouteOptions = {}
    if (navigation.state.index === 0) {
        activeRouteOptions = getActiveChildNavigationOptions(navigation, screenProps)
    }

    return {
        title: "Exames",
        tabBarIcon: CreateTabBarIcon(require("../Resources/examsTabBarIcon.png")),
        ...activeRouteOptions
    }
}

// TAB
const ConfigTab = createStackNavigator({
    Config: ConfigScreen,
}, {
    defaultNavigationOptions
});

ConfigTab.navigationOptions = ({ navigation, screenProps }) => {
    // usar a navigationOptions da primeira tela exibida pela stack
    let activeRouteOptions = {}
    if (navigation.state.index === 0) {
        activeRouteOptions = getActiveChildNavigationOptions(navigation, screenProps)
    }

    return {
        title: "Configurações",
        tabBarIcon: CreateTabBarIcon(require("../Resources/cog.png")),
        ...activeRouteOptions
    }
}

//
// APP
//

const TabNavigator = createBottomTabNavigator({
    Anamnesis: AnamnesisTab,
    Journals: JournalsTab,
    Exams: ExamsTab,
    Config: ConfigTab
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
    AnamnesisForm: AnamnesisForm,
    JournalEntryForm: JournalEntryForm,
    ExamForm: ExamForm,

    // telas auxiliares
    Loading: LoadingScreen,
    Gallery: GalleryScreen
}, {
    // esconder header e apresentar com animação de modal (de baixo para cima)
    mode: "modal",
    headerMode: "none",
    initialRouteName: "Main",
    transparentCard: true
});

export default createAppContainer(AppNavigator);
