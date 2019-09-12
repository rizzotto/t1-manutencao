import React from 'react';
import { Image, StyleSheet } from 'react-native';

/**
 * Componente usado como ícone na tabbar.
 * 
 * Parâmetros:
 *   - `icon`: ícone exibido (passado como parâmetro `source` do componente `Image`);
 *   - `tintColor`: cor do ícone quando selecionado;
 * 
 * A função `createTabBarIcon` é mais útil (ver `Routes/createTabBarIcon`).
 */
const TabBarIcon = ({ icon, tintColor }) => {
    const styles = createStyles(tintColor);
    return <Image source={icon} style={styles.image} />;
}

const createStyles = (tintColor) => {
    return StyleSheet.create({
        image: {
            width: 24,
            height: 24,
            tintColor: tintColor
        }
    });
};

export default TabBarIcon;
