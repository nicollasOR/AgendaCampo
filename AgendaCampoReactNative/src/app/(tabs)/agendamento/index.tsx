import {
  Platform,
  Pressable,
  ScrollView,
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
  Scroll,
  TextArea,
  theme,
} from "@/src/constants/theme";
import RuaIcon from "@/assets/svg/RuaIcon.svg";
import LocalIcon from "@/assets/svg/LocalIcon.svg";
import NumeroIcon from "@/assets/svg/NumeroIcon.svg";
import RelogioIcon from "@/assets/svg/RelogioIcon.svg";
import CancelarIcon from "@/assets/svg/CancelarIcon.svg";
import PesquisaIcon from "@/assets/svg/PesquisaIcon.svg";
import ConfirmarIcon from "@/assets/svg/ConfirmarIcon.svg";
import DescricaoIcon from "@/assets/svg/DescricaoIcon.svg";
import CalendarioIcon from "@/assets/svg/CalendarioIcon.svg";

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from "react";

export default function Agendamento() {

  const [data, setData] = useState<Date>(new Date());
  const [mostrarCalendario, setMostrarCalendario] = useState<boolean>(false);
  const [texto, setTexto] = useState<string>('Selecionar data...'); // Texto inicial que vai estar escrito no botão, muda quando a data for selecionada

  const Calendario = (event: DateTimePickerEvent, selectedDate?: Date) => {

    // Fechar a janela do calendário assim que acontecer alguma ação(confirmar ou cancelar)
    // Platform.OS -> recurso do react native que detecta qual o sistema operacional que está rodando(ios ou android)
    if (Platform.OS === 'android') {
      setMostrarCalendario(false);
    }

    // Ao confirmar a data escolhida, clicar no "Ok"
    if (event.type === 'set' && selectedDate) {
      const currentDate = selectedDate;
      setData(currentDate); // Atualiza o estado da data com a escolhida


      // Formatação para leitura da data
      const dia = String(currentDate.getDate()).padStart(2, '0'); // .padStart(2, '0') -> garante que se o número for menor que 10, acrescenta um 0 na frente
      const mes = String(currentDate.getMonth() + 1).padStart(2, '0'); // Soma +1 para que na visualização os meses iniciem em 01 e não em 00(padrão js)
      const ano = currentDate.getFullYear();

      setTexto(`${dia}/${mes}/${ano}`);
    } else if (event.type === 'dismissed') { // Caso o usuário cancele a operação
      setMostrarCalendario(false);
    }
  }

  // Constante criada para permitir agendamento de visita somente a partir do dia seguinte
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);


  return (
    <SafeAreaView style={Container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={Scroll}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={H1}>Nova Visita</Text>
          <Text style={[H4, { color: Colors.darkgray }]}>
            Preencha os detalhes para agendar uma nova visita técnica.
          </Text>
        </View>

        <View style={Form}>
          <View style={Column}>
            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Cliente / Propriedade
              </Text>
              <View style={CampoInput}>
                <PesquisaIcon style={InputIcon} color={Colors.gray} />
                <TextInput style={Input} placeholder="Buscar cliente..." />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}> Data da Visita </Text>
              <Pressable style={Input} onPress={() => setMostrarCalendario(true)}>
                <CalendarioIcon style={InputIcon} color={Colors.gray} />
                <Text style={texto === 'Selecionar data...' ? {color: Colors.darkgray} : {color: Colors.black}}>{texto}</Text>
              </Pressable>

              {/* Exibição do Calendário */}
              {mostrarCalendario && (
                <DateTimePicker
                  value={data} // data inicial selecionada ao abrir o calendário, geralmente é a data mínima
                  mode="date" // Aceita apenas data (ignora hora)
                  display={Platform.OS === 'ios' ? 'inline' : 'default'} // Estilo visual
                  onChange={Calendario}
                  minimumDate={amanha} // Bloqueia datas passadas
                />
              )}

            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Horário Previsto
              </Text>
              <View style={CampoInput}>
                <RelogioIcon style={InputIcon} color={Colors.gray} />
                <TextInput style={Input} placeholder="--:-- --" />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>Cep</Text>
              <View style={CampoInput}>
                <LocalIcon style={InputIcon} color={Colors.gray} />
                <TextInput style={Input} placeholder="00000-000" />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Logradouro / Endereço
              </Text>
              <View style={CampoInput}>
                <RuaIcon style={InputIcon} color={Colors.gray} />
                <TextInput style={Input} placeholder="Rua Niterói" />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>Número</Text>
              <View style={CampoInput}>
                <NumeroIcon style={InputIcon} color={Colors.gray} />
                <TextInput style={Input} placeholder="1234" />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Descrição do Serviço
              </Text>
              <View style={CampoInput}>
                <DescricaoIcon
                  style={[InputIcon, { top: 15 }]}
                  color={Colors.gray}
                />
                <TextInput
                  style={TextArea}
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
            <TouchableOpacity style={Btn}>
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
