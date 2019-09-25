import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import AppStyle from '../styles';

/**
 * Botão de cancelar do header.
 * 
 * Parâmetros:
 *   - `text`: texto do botão;
 *   - `hasColor`: se o botão é colorido (por padrão, `false`);
 *   - `onPress`: callback chamado quando o botão é clicado.
 */
const HeaderButtonComponent = ({ text, hasColor, onPress }) => {
    const styles = createStyles(hasColor);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

export default HeaderButtonComponent;

const createStyles = (hasColor) => {
    return StyleSheet.create({
        container: {
            paddingHorizontal: 15,
            paddingVertical: 12
        },
        text: {
            fontSize: 17,
            color: hasColor ? AppStyle.colors.main : AppStyle.colors.darkText
        }
    });
}