import { Component } from 'react';

/**
 * Pega o valor de um parâmetro de configuração de um componente a partir de suas `props` ou `navigation.params`.
 * 
 * Como as screens dos fluxos de cadastro/edição tem de ser configuradas tanto a partir das props quanto dos parâmetros de navegação, essa função deve ser bem utilizada, por isso está sendo definida. :D
 * 
 * Exemplo de uso:
 * 
 * Antes:
 * 
 *      const progress = this.props.progress || this.props.navigation.getParam("progress", 0);
 * 
 * Agora:
 * 
 *      const progress = this.getParam("progress", 0);
 */
Component.prototype.getParam = function(param, fallback) {
    const propsValue = this.props[param];

    if (propsValue !== undefined && propsValue !== null) {
        return propsValue;
    }

    if (this.props.navigation !== undefined && this.props.navigation !== null) {
        return this.props.navigation.getParam(param, fallback);
    }

    return fallback;
}
