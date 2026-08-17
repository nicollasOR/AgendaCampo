import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Btn2,
  BtnText,
  Colors,
  Column,
  Container,
  H4,
  InputIcon,
  Label,
  Row,
  Scroll,
  theme,
} from "../../../constants/theme";
import RuaIcon from "../../../../assets/svg/RuaIcon.svg";
import LocalIcon from "../../../../assets/svg/LocalIcon.svg";
import NumeroIcon from "../../../../assets/svg/NumeroIcon.svg";
import RelogioIcon from "../../../../assets/svg/RelogioIcon.svg";
import CancelarIcon from "../../../../assets/svg/CancelarIcon.svg";
import PesquisaIcon from "../../../../assets/svg/PesquisaIcon.svg";
import ConfirmarIcon from "../../../../assets/svg/ConfirmarIcon.svg";
import DescricaoIcon from "../../../../assets/svg/DescricaoIcon.svg";
import CalendarioIcon from "../../../../assets/svg/CalendarioIcon.svg";

export default function Agendamento() {
  return (
    <SafeAreaView style={Container} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={{ ...Column, ...Scroll }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={theme.h1}>Nova Visita</Text>
          <Text style={{ ...H4, color: Colors.darkgray }}>
            Preencha os detalhes para agendar uma nova visita técnica.
          </Text>
        </View>

        <View style={theme.formulario}>
          <View style={{ ...Column }}>
            <View style={theme.campoForm}>
              <Text style={{ ...Label, color: Colors.darkblue }}>
                Cliente / Propriedade
              </Text>
              <View style={theme.campoInput}>
                <PesquisaIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput
                  style={theme.input}
                  placeholder="Buscar cliente..."
                />
              </View>
            </View>

            <View style={theme.campoForm}>
              <Text style={{ ...Label, color: Colors.darkblue }}>
                Data da Visita
              </Text>
              <View style={theme.campoInput}>
                <CalendarioIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput style={theme.input} placeholder="mm/dd/yyyy" />
              </View>
            </View>

            <View style={theme.campoForm}>
              <Text style={{ ...Label, color: Colors.darkblue }}>
                Horário Previsto
              </Text>
              <View style={theme.campoInput}>
                <RelogioIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput style={theme.input} placeholder="--:-- --" />
              </View>
            </View>

            <View style={theme.campoForm}>
              <Text style={{ ...Label, color: Colors.darkblue }}>Cep</Text>
              <View style={theme.campoInput}>
                <LocalIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput style={theme.input} placeholder="00000-000" />
              </View>
            </View>

            <View style={theme.campoForm}>
              <Text style={{ ...Label, color: Colors.darkblue }}>
                Logradouro / Endereço
              </Text>
              <View style={theme.campoInput}>
                <RuaIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput style={theme.input} />
              </View>
            </View>

            <View style={theme.campoForm}>
              <Text style={{ ...Label, color: Colors.darkblue }}>Número</Text>
              <View style={theme.campoInput}>
                <NumeroIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput style={theme.input} />
              </View>
            </View>

            <View style={theme.campoForm}>
              <Text style={{ ...Label, color: Colors.darkblue }}>
                Descrição do Serviço
              </Text>
              <View style={theme.campoInput}>
                <DescricaoIcon
                  style={{ ...InputIcon, top: 15 }}
                  color={Colors.gray}
                />
                <TextInput
                  style={theme.textarea}
                  placeholder="Instruções específicas para o técnico..."
                  multiline={true}
                />
              </View>
            </View>
          </View>

          <View style={{ ...Column }}>
            
            <TouchableOpacity
              style={{
                ...Btn2,
                ...Row,
                backgroundColor: Colors.lightred,
                borderWidth: 2,
                borderColor: Colors.red,
              }}
            >
              <CancelarIcon color={Colors.red} />
              <Text style={{ ...BtnText, color: Colors.red }}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnAgendar}>
              <ConfirmarIcon color={Colors.white} />
              <Text style={{ ...BtnText, color: Colors.white }}>
                Confirmar Agendamento
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnAgendar: {
    ...Btn2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    position: "relative",

    backgroundColor: Colors.btnBlue,
  },
});
