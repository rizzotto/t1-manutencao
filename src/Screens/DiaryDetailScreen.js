import React, {Component} from 'react';
import DiaryDetailContainer from '../Containers/DiaryDetailContainer';
import { withUserContext } from '../Context/UserContext';

class DiaryDetailScreen extends Component{
    userId = this.props.user.user.uid;
    
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

export default withUserContext(DiaryDetailScreen);