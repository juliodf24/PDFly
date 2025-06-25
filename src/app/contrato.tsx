import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

Font.register({
  family: 'Ancizar-Serif',
  src: '/font/AncizarSerif-VariableFont_wght.ttf',
});
const styles = StyleSheet.create({
  page: {
    padding: 30,
    paddingRight: 40,
    paddingLeft: 40,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: "Times-Roman",

  },
  cabecalio: {
    marginBottom: 20,
  },
  negrito: {
    fontWeight: "bold",
  },
  brasao: {
    width: "60px",
    alignSelf: "center",
  },
  header: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
    lineHeight: 1.3,
  },
  headerContainer: {
    margin: 5,
  },
  titulo: {
    fontSize: 16,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",

  },
  data: {
    alignSelf: "flex-end",
    margin: 10,
  },
  conteudo: {
    marginBottom: 12,
    marginTop: 30,
    lineHeight: 1.2,
    fontSize: 14,
    textAlign: "justify",
  },
  blocoPergunta: {
    marginBottom: 9,
    marginTop: 9,
    lineHeight: 1.2,
    fontSize: 14,
    textAlign: "justify",
  },
  alternativas: {
    marginBottom: 10,
    marginTop: 3,
    lineHeight: 1.2,
    fontSize: 14,
    textAlign: "justify",
  },
  alternativa: {
    marginBottom: 2,
    marginTop: 2,
    lineHeight: 1.2,
    fontSize: 14,
    textAlign: "justify",
  },
  questao: {
    fontWeight: "bold",
    color: "#ffff",
    boxshadow: "15px 0 0 0 #000, -5px 0 0 0 #000",
    backgroundColor: "#108FFF",
    padding: "3px"
  },

  espaco: {
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    lineHeight: 1.2,
    textAlign: "center",
  },
});
interface interfaceDados {
  conteudo: string,
}
interface Alternativa {
  questao: string;
  pergunta: string;
  alternativas: string[];
}

interface Gabarito {
  titulo: string;
  questoes: Alternativa[];
}

interface ModeloJson {
  titulo: string;
  questoes: Alternativa[];
  gabarito: Gabarito;
}


export default function GerarContrato(dados: interfaceDados) {
  const informacoes: ModeloJson = JSON.parse(dados.conteudo);
  console.log(informacoes)
const ContractPDF = () => (
  <Document>
    <Page size="A4" style={styles.page} orientation="portrait">
      <Text style={styles.titulo}>{informacoes.titulo}</Text>

      <View style={styles.conteudo}>
        {informacoes.questoes.map((questao, qIndex) => (
          <View key={qIndex} style={styles.blocoPergunta}>
            <Text style={styles.questao}>{questao.questao}</Text>
            <Text style={styles.espaco}>{questao.pergunta}</Text>

            <View style={styles.alternativas}>
              {questao.alternativas.map((alternativa, aIndex) => (
                <Text key={aIndex} style={styles.alternativa}>
                  {/* <Text style={{ fontWeight: 'bold' }}>
                    {String.fromCharCode(97 + aIndex)})
                  </Text>{' '} */}
                  {alternativa}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Page>

    <Page size="A4" style={styles.page} orientation="portrait">
      <Text style={styles.titulo}>{informacoes.gabarito.titulo}</Text>

      <View style={styles.conteudo}>
        {informacoes.gabarito.questoes.map((questao, qIndex) => (
          <View key={qIndex} style={styles.blocoPergunta}>
            <Text style={styles.questao}>{questao.questao}</Text>

            <View style={styles.alternativas}>
              {questao.alternativas.map((alternativa, aIndex) => (
                <Text key={aIndex} style={styles.alternativa}>
                  {/* <Text style={{ fontWeight: 'bold' }}>
                    {String.fromCharCode(97 + aIndex)})
                  </Text>{' '} */}
                  {alternativa}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

  return ContractPDF
}

