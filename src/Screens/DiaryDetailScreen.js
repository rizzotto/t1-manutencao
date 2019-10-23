import React, {Component} from 'react';
import DiaryDetailContainer from '../Containers/DiaryDetailContainer';

export default class DiaryDetailScreen extends Component{
    userId = "user-id-001"
    render(){
        const item = this.props.navigation.state.params.journalEntry;
        const action  = () => {
            this.props.navigation.navigate("JournalEntryForm", {
                userId: this.userId,
                journalEntry: item
            });
        }
    
        return (
            <DiaryDetailContainer item={item} action={action}></DiaryDetailContainer>
        )
    }
}