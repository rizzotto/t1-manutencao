import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import TitleDescComponent from '../Components/TitleDescComponent';
import DetailedRecordComponent from '../Components/DetailedRecordComponent';
import {formatDate, formatHeight, formatArrayWithSeparator, formatArrayObjectsAnam, textWhenEmpty} from '../Utils/Helpers';

export default class RecordDetailContainer extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <TitleDescComponent
        styleView={styles.styleView}
        styleTitle={styles.generalTitle}
        styleDescription={styles.generalDescription}
        titleText={this.props.anamnese.name}
        descriptionText={formatDate(this.props.anamnese.creationDate)} />

        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"E-mail:"}
        descriptionText={textWhenEmpty(this.props.anamnese.email, 'N/A')}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Data de nascimento:"}
        descriptionText={formatDate(this.props.anamnese.birthDate)}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Peso e altura:"}
        descriptionText={this.props.anamnese.weight+" kg, "+formatHeight(this.props.anamnese.height)}/>
        <View style={styles.divisionBar}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Principais Sintomas:"}
        descriptionText={formatArrayWithSeparator(this.props.anamnese.symptoms, ', ')}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Medicamentos:"}
        descriptionText={formatArrayObjectsAnam(this.props.anamnese.medicines)}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Patologias:"}
        descriptionText={formatArrayWithSeparator(this.props.anamnese.pathologies, ', ')}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Histórico Familiar:"}
        descriptionText={formatArrayWithSeparator(this.props.anamnese.familyPathologies, ', ')}/>
        <View style={styles.divisionBar}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Hábitos:"}
        descriptionText={formatArrayObjectsAnam(this.props.anamnese.habits)}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Estilo de vida:"}
        descriptionText={textWhenEmpty(this.props.anamnese.lifeRhythm, 'N/A')}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Alimentação:"}
        descriptionText={textWhenEmpty(this.props.anamnese.eatingStyle, 'N/A')}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  divisionBar: {
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      marginTop: 12,
      marginBottom: 7
  },
  styleView:{
    paddingVertical: 5,
    paddingRight: 7,
    paddingLeft: 7
  },
  detailRecordTitle:{
    paddingVertical: 0,
    fontWeight:'bold',
  },
  detailRecordDescription:{
    paddingHorizontal: 0
  },
  generalTitle:{
    fontWeight:"bold",
    marginLeft: 7,
    marginTop: 15,
  },
  generalDescription:{
    marginLeft: 8,
    marginTop: 10,
    marginBottom: 4,
    color: '#999999'
  }
});