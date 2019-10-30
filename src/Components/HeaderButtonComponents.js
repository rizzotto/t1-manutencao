import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import AppStyle from '../styles';

/**
 * Botão do header com texto.
 * 
 * Parâmetros:
 *   - `text`: texto do botão;
 *   - `hasColor`: se o botão é colorido (por padrão, `false`);
 *   - `onPress`: callback chamado quando o botão é clicado.
 */
const HeaderTextButtonComponent = ({ text, hasColor, onPress }) => {
    const color = hasColor ? AppStyle.colors.main : AppStyle.colors.darkText

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={[styles.text, { color }]}>{text}</Text>
        </TouchableOpacity>
    );
}

/**
 * Botão do header com imagem.
 * 
 * Parâmetros:
 *   - `image`: imagem do botão (passada na props `source` da imagem);
 *   - `tintColor`: cor da imagem do botão (por padrão, `AppStyle.colors.main`);
 *   - `onPress`: callback chamado quando o botão é clicado.
 */
const HeaderImageButtonComponent = ({ image, tintColor = AppStyle.colors.main, onPress }) => (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image style={[styles.image, { tintColor }]} source={image} />
    </TouchableOpacity>
)

export { HeaderTextButtonComponent, HeaderImageButtonComponent };

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 12
    },
    text: {
        fontSize: 17
    },
    image: {
        alignSelf: "center",
        width: 28,
        height: 28
    }
})