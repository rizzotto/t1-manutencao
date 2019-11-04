import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppStyle from '../styles';

/**
 * Header das screens da tabbar.
 * 
 * Parâmetros:
 * - `title`: texto exibido como título
 * - `hasBottomDivider`: se deve exibir a borda inferior
 * 
 * Exemplo de uso:
 * 
 *      <HeaderTitleComponent title="Diário">
 */
const HeaderTitleComponent = ({ title, hasBottomDivider = false }) => {
    const styles = createStyles(hasBottomDivider)
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default HeaderTitleComponent;

const createStyles = (hasBottomDivider) => {
    return StyleSheet.create({
        container: {
            paddingHorizontal: 20,
            paddingBottom: 9,
            borderBottomWidth: hasBottomDivider ? 1 : 0,
            borderBottomColor: AppStyle.colors.mediumGray
        },
        title: {
            fontWeight: "bold",
            fontSize: 34,
            color: AppStyle.colors.darkText
        }
    })
}
