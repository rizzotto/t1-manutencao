import React, {Component} from 'react';
import {StyleSheet, View, TextInput } from "react-native";
import DefaultButton from './DefaultButtonComponent';
import AppStyle from '../styles';
    /**
     * @param styleListItem estilo do item inteiro
     * @param stylePlacehoder estilo do placeholder do input
     * @param placeholder texto do placeholder do input
     * @param buttonText texto do botao
     * @param styleButton estilo do botao
     * @param styleButtonText estilo do texto do botao
     * @return componente de item de lista (com input e botao)
     * - Example
     *   <ItemInputListComponent
     *       styleListItem={styles.listInputStyle}
     *       placeholder={"Outro..."}
     *       stylePlacehoder={styles.placeholderStyle}
     *       buttonText={"Adicionar"} 
     *       buttonAction={this.action}
     *       styleButton={styles.buttonStyle}
     *       styleButtonText={styles.buttonTextStyle}
     *   />
     */
export default class ItemListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }
    render(){
        const { selected, pressDisabled } = this.props;
        const styles = createStyles(selected);

        submitAndClear = () => {
            
          }
        dataToAdd = () => {
            this.props.dataToAdd(this.state.text);
            this.setState({
            text: ''
            })
        }
        return (
            <View style={[styles.container, this.props.style]}>
                
                <TextInput
                    style={[styles.textInput, this.props.stylePlaceholder]}
                    maxLength={50}
                    placeholder={this.props.placeholder}
                    autoCorrect={false}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    />
                <DefaultButton 
                    text={this.props.buttonText} 
                    action={() => dataToAdd()} 
                    style={[styles.button, this.props.styleButton]}
                    textStyle={[styles.text, this.props.styleButtonText]}
                    />
            </View>
        )
    }
}



const createStyles = (selected) => {
    return StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: selected ? AppStyle.colors.lightGray : AppStyle.colors.background,
        },
        textInput: {
            flex: 1,
            flexGrow: 1,
            minHeight: 40,
            fontSize: 20,
            color: '#333333',
            borderColor: '#999999',
            borderBottomWidth: 1,
        },
        button: {
            margin: 0,
            marginLeft: 10,
            minWidth: 40,
        },
        text: {
            fontSize: 15,
            textAlignVertical: "center"
        },
    })
}

