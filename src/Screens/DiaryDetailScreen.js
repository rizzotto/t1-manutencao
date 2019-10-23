import React, {Component} from 'react';
import DiaryDetailContainer from '../Containers/DiaryDetailContainer';

export default class DiaryDetailScreen extends Component{
    render(){
        const item = this.props.navigation.state.params.journalEntry;
        return (
            <DiaryDetailContainer item={item}></DiaryDetailContainer>
        )
    }
}