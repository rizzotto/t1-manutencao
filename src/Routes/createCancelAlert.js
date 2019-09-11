
/**
 * Cria o conteúdo de um alerta exibido antes de cancelar um fluxo de cadastro/edição.
 * 
 * Parâmetros:
 *   - `onExit`: função chamada quando o botão "Sair" é clicado
 * 
 * Exemplo de uso: `Alert.alert(...createCancelAlert(() => console.warn("cancelar!"))));`
 */
const createCancelAlert = (onExit) => {
    // manter a ordem: title, message, buttons
    return [
        "Tem certeza?",
        "Todos os dados já inseridos serão perdidos.",
        [
            {
                text: "Voltar",
                style: "cancel"
            },
            {
                text: "Sair",
                style: "destructive",
                onPress: onExit
            }
        ]
    ]
};

export default createCancelAlert;
