import React from 'react';
import { HeaderTextButtonComponent } from "../Components";

/**
 * Cria as opções de navegação padrão usada nos fluxos de cadastro.
 * 
 * Parâmetros:
 *   - `{ navigation, screenProps }`: parâmetros passados pelo react-navigation na função definida como propriedade estática `navigationOptions`;
 *   - `headerRightHasColor`: passado para o componente `HeaderTextButtonComponent`, indica se o texto do botão à direita deve ser colorido (ver `HeaderTextButtonComponent`).
 * 
 * Exemplo de uso:
 * 
 *      export default class ExampleScreen extends Component {
 *          static navigationOptions = CreateDefaultNavigationOptions;
 *      }
 * 
 * Para usar essas opções e sobrescrever alguma propriedade:
 * 
 *      export default class ExampleScreen extends Component {
 *          static navigationOptions = (params) => {
 *              return {
 *                  ...CreateDefaultNavigationOptions(params),
 *                  // customizações...
 *              }
 *          }
 *      }
 * 
 */
const CreateDefaultNavigationOptions = ({ navigation, screenProps }, headerRightHasColor = false) => {
    const headerRightTitle = screenProps.headerRightTitle || navigation.getParam("headerRightTitle", "Cancelar");
    const headerRightOnPress = screenProps.onCanccel || navigation.getParam("onCancel");

    return {
        title: screenProps.title || navigation.getParam("title"),
        headerRight: <HeaderTextButtonComponent text={headerRightTitle} onPress={headerRightOnPress} hasColor={headerRightHasColor} />
    };
}

export default CreateDefaultNavigationOptions;
