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
  Btn,
  Btn2,
  BtnText,
  CampoForm,
  CampoInput,
  Center,
  Colors,
  Column,
  Container,
  Form,
  H1,
  H4,
  Input,
  InputIcon,
  Label,
  Row,
  Scroll,
  TextArea,
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
    <SafeAreaView style={[Container]} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={[Scroll]}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={[H1]}>Nova Visita</Text>
          <Text style={[H4, { color: Colors.darkgray }]}>
            Preencha os detalhes para agendar uma nova visita técnica.
          </Text>
        </View>

        <View style={[Form]}>
          <View style={[Column]}>
            <View style={[CampoForm]}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Cliente / Propriedade
              </Text>
              <View style={[CampoInput]}>
                <PesquisaIcon style={[InputIcon]} color={Colors.gray} />
                <TextInput
                  style={[Input]}
                  placeholder="Buscar cliente..."
                />
              </View>
            </View>

            <View style={[CampoForm]}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Data da Visita
              </Text>
              <View style={[CampoInput]}>
                <CalendarioIcon style={[InputIcon]} color={Colors.gray} />
                <TextInput style={[Input]} placeholder="mm/dd/yyyy" />
              </View>
            </View>

            <View style={[CampoForm]}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Horário Previsto
              </Text>
              <View style={[CampoInput]}>
                <RelogioIcon style={[InputIcon]} color={Colors.gray} />
                <TextInput style={[Input]} placeholder="--:-- --" />
              </View>
            </View>

            <View style={[CampoForm]}>
              <Text style={[Label, { color: Colors.darkblue }]}>Cep</Text>
              <View style={[CampoInput]}>
                <LocalIcon style={[InputIcon]} color={Colors.gray} />
                <TextInput style={[Input]} placeholder="00000-000" />
              </View>
            </View>

            <View style={[CampoForm]}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Logradouro / Endereço
              </Text>
              <View style={[CampoInput]}>
                <RuaIcon style={[InputIcon]} color={Colors.gray} />
                <TextInput style={[Input]} />
              </View>
            </View>

            <View style={[CampoForm]}>
              <Text style={[Label, { color: Colors.darkblue }]}>Número</Text>
              <View style={[CampoInput]}>
                <NumeroIcon style={[InputIcon]} color={Colors.gray} />
                <TextInput style={[Input]} />
              </View>
            </View>

            <View style={[CampoForm]}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Descrição do Serviço
              </Text>
              <View style={[CampoInput]}>
                <DescricaoIcon
                  style={[InputIcon, { top: 15 }]}
                  color={Colors.gray}
                />
                <TextInput
                  style={[TextArea]}
                  placeholder="Instruções específicas para o técnico..."
                  multiline={true}
                />
              </View>
            </View>
          </View>

          <View style={[Column, Center]}>
            <TouchableOpacity
              style={[
                Btn2,
                {
                  backgroundColor: Colors.lightred,
                  borderWidth: 2,
                  borderColor: Colors.red,
                },
              ]}
            >
              <CancelarIcon color={Colors.darkred} />
              <Text style={[BtnText, { color: Colors.darkred }]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[Btn]}>
              <ConfirmarIcon color={Colors.white} />
              <Text style={[BtnText, { color: Colors.white }]}>
                Confirmar Agendamento
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}