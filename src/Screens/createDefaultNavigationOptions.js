import React from 'react';
import { HeaderButton } from "../Components";

/**
 * Cria as opções de navegação padrão usada nos fluxos de cadastro.
 * 
 * Parâmetros:
 *   - `{ navigation, screenProps }`: parâmetros passados pelo react-navigation na função definida como propriedade estática `navigationOptions`;
 *   - `headerRightHasColor`: passado para o componente `HeaderButton`, indica se o texto do botão à direita deve ser colorido (ver `HeaderButton`).
 * 
 * Exemplo de uso:
 * 
 *      export default class ExampleScreen extends Component {
 *          static navigationOptions = createDefaultNavigationOptions;
 *      }
 * 
 * Para usar essas opções e sobrescrever alguma propriedade:
 * 
 *      export default class ExampleScreen extends Component {
 *          static navigationOptions = (params) => {
 *              return {
 *                  ...createDefaultNavigationOptions(params),
 *                  // customizações...
 *              }
 *          }
 *      }
 * 
 */
const createDefaultNavigationOptions = ({ navigation, screenProps }, headerRightHasColor = false) => {
    const headerRightTitle = screenProps.headerRightTitle || navigation.getParam("headerRightTitle", "Cancelar");
    const headerRightOnPress = screenProps.onCanccel || navigation.getParam("onCancel");

    return {
        title: screenProps.title || navigation.getParam("title"),
        headerRight: <HeaderButton text={headerRightTitle} onPress={headerRightOnPress} />
    };
}

export default createDefaultNavigationOptions;
