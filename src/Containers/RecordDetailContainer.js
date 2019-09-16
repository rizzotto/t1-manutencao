import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import TitleDescComponent from '../Components/TitleDescComponent';
import DetailedRecordComponent from '../Components/DetailedRecordComponent';

export default class RecordDetailContainer extends Component {

  getAnamnesesSymptoms(){
    return this.props.anamnese.symptoms.join()
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TitleDescComponent 
        styleView={styles.styleView}
        styleTitle={styles.generalTitle}
        styleDescription={styles.generalDescription}
        titleText="Teste" 
        descriptionText={"Ficha criada em: 16/09/2019"} />
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"E-mail:"}
        descriptionText={this.props.anamnese.email}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Data de nascimento:"}
        descriptionText={"sss"}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Peso e altura:"}
        descriptionText={this.props.anamnese.weight+" kg, "+this.props.anamnese.height+" cm"}/>
        <View style={styles.divisionBar}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Principais Sintomas:"}
        descriptionText={this.props.anamnese.symptoms.join(", ")}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Medicamentos:"}
        descriptionText={"Placeholder para medicamentos"}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Patologias:"}
        descriptionText={this.props.anamnese.pathologies.join(", ")}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Histórico Familiar:"}
        descriptionText={this.props.anamnese.familyPathologies.join(", ")}/>
        <View style={styles.divisionBar}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Hábitos:"}
        descriptionText={"Placeholder para hábitos"}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Estilo de vida:"}
        descriptionText={this.props.anamnese.lifeRhythm}/>
        <DetailedRecordComponent
        styleDescription={styles.detailRecordDescription}
        styleTitle={styles.detailRecordTitle}
        styleView={styles.styleView}
        titleText={"Alimentação:"}
        descriptionText={this.props.anamnese.eating}/>
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
    paddingVertical: 4,
    paddingRight: 7,
    paddingLeft: 7
  },
  detailRecordTitle:{
    paddingVertical: 7
  },
  detailRecordDescription:{
    paddingHorizontal: 2
  },
  generalTitle:{
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