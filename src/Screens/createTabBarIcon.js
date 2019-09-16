import React from 'react';
import { TabBarIcon } from '../Components';

/**
 * Função que retorna uma função nor formato esperado pelo react-nativation para ícone da tabbar.
 * 
 * Parâmetros:
 *   - `icon`: ícone exibido (passado para o componente `TabBarIcon`).
 * 
 * Exemplo de uso:
 * 
 *      navigationOptions: {
 *          tabBarTitle: "Texto",
 *          tabBarIcon: createTabBarIcon(require("./imagem.png"))
 *      }
 */
const createTabBarIcon = (icon) => ({ tintColor }) => <TabBarIcon icon={icon} tintColor={tintColor} />;

export default createTabBarIcon;
