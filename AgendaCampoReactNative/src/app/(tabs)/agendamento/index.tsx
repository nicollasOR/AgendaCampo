import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseShadow, Btn, Colors, Column, Container, H4, Input, P, theme } from "../../../constants/theme";
import PesquisaIcon from "../../../../assets/svg/PesquisaIcon.svg"
import CalendarioIcon from "../../../../assets/svg/CalendarioIcon.svg"
import RelogioIcon from "../../../../assets/svg/RelogioIcon.svg"
import ConfirmarIcon from "../../../../assets/svg/ConfirmarIcon.svg"

export default function Agendamento() {
  return (
    <SafeAreaView style={{ ...Container }}>
      <ScrollView contentContainerStyle={{ ...Column }} showsVerticalScrollIndicator={false}>
        <View style={styles.topo}>
          <Text style={theme.h1}>Nova Visita</Text>
          <Text style={{ ...H4, color: Colors.gray }}>Preencha os detalhes para agendar uma nova visita técnica.</Text>
        </View>

        <View style={styles.formulario}>

          <View style={styles.areaFormulario}>
            <View style={styles.campoForm}>
              <Text style={{ ...P, color: Colors.gray }}>Cliente / Propriedade</Text>
              <View style={styles.campoInput}>
                <PesquisaIcon style={styles.inputIcon} />
                <TextInput style={theme.input} placeholder="Buscar cliente..." />
              </View>
            </View>

            <View style={styles.campoForm}>
              <Text style={{ ...P, color: Colors.gray }}>Data da Visita</Text>
              <View style={styles.campoInput}>
                <CalendarioIcon style={styles.inputIcon}/>
                <TextInput style={theme.input} placeholder="mm/dd/yyyy" />
              </View>
            </View>

            <View style={styles.campoForm}>
              <Text style={{ ...P, color: Colors.gray }}>Horário Previsto</Text>
              <View style={styles.campoInput}>
                <RelogioIcon style={styles.inputIcon}/>
                <TextInput style={theme.input} placeholder="--:-- --" />
              </View>
            </View>

            <View style={styles.campoForm}>
              <Text style={{ ...P, color: Colors.gray }}>CEP</Text>
              <TextInput style={theme.input} placeholder="00000-000" />
            </View>

            <View style={styles.campoForm}>
              <Text style={{ ...P, color: Colors.gray }}>Logradouro / Endereço</Text>
              <TextInput style={theme.input} />
            </View>

            <View style={styles.campoForm}>
              <Text style={{ ...P, color: Colors.gray }}>Número</Text>
              <TextInput style={theme.input} />
            </View>

            <View style={styles.campoForm}>
              <Text style={{ ...P, color: Colors.gray }}>Descrição do Serviço</Text>
              <TextInput style={theme.input} placeholder="Instruções específicas para o técnico..." />
            </View>
          </View>

          <View style={styles.botoes}>
            <TouchableOpacity style={{ ...Btn, borderColor: Colors.red }}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnAgendar}>
              <ConfirmarIcon color={Colors.blue} />
              <Text>Confirmar Agendamento</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  topo: {
  },

  formulario: {
    ...baseShadow,
    width: "100%",

    backgroundColor: Colors.smoothBgc,
    borderWidth: 1,
    borderColor: Colors.lightgray,
    borderRadius: 10,

    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  areaFormulario: {
    ...Column
  },

  campoForm: {
    gap: 4
  },

  campoInput: {
    flexDirection: "row",
    alignItems: "center",

    position: "relative"
  },

  inputIcon: {
    position: "absolute",
    left: 10,
    zIndex: 2 // zIndex -> sobe uma camada dos elementos dentro view
  },

  botoes: {
  },

  btnCancelar: {
  },

  btnAgendar: {
  }

})
