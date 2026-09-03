import {
  Alert,
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
import useVisita from "@/src/hooks/useVisita";
import { CriarVisita } from "@/src/@types/visita";

export default function Agendamento() {

  const { agendarVisita } = useVisita();

  const [nomeEvento, setNomeEvento] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [cep, setCep] = useState("");
  const [Logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [descricao, setDescricao] = useState("");

  // Controlar a formatação da data incial
  const [dataInicial, setDataInicial] = useState<Date>(new Date());
  const [mostrarCalendarioInicial, setMostrarCalendarioInicial] = useState<boolean>(false);
  const [textoCalendarioInicial, setTextoCalendarioInicial] = useState<string>('Selecionar data...'); // Texto inicial que vai estar escrito no botão, muda quando a data for selecionada

  // Controlar a formatação da data final
  const [dataFinal, setDataFinal] = useState<Date>(new Date());
  const [mostrarCalendarioFinal, setMostrarCalendarioFinal] = useState<boolean>(false);
  const [textoCalendarioFinal, setTextoCalendarioFinal] = useState<string>('Selecionar data...'); // Texto inicial que vai estar escrito no botão, muda quando a data for selecionada

  // Controlar a formatação do horário 
  const [horario, setHorario] = useState<Date>(new Date());
  const [mostrarRelogio, setMostrarRelogio] = useState<boolean>(false);
  const [textoRelogio, setTextoRelogio] = useState<string>('Selecionar horário...');

  const CalendarioInicial = (event: DateTimePickerEvent, dataSelecionada?: Date) => {

    // Fechar a janela do calendário assim que acontecer alguma ação(confirmar ou cancelar)
    // Platform.OS -> recurso do react native que detecta qual o sistema operacional que está rodando(ios ou android)
    if (Platform.OS === 'android') {
      setMostrarCalendarioInicial(false);
    }

    // Ao confirmar a data escolhida, clicar no "Ok"
    if (event.type === 'set' && dataSelecionada) {
      const currentDate = dataSelecionada;
      setDataInicial(currentDate); // Atualiza o estado da data com a escolhida


      // Formatação para leitura da data
      const dia = String(currentDate.getDate()).padStart(2, '0'); // .padStart(2, '0') -> garante que se o número for menor que 10, acrescenta um 0 na frente
      const mes = String(currentDate.getMonth() + 1).padStart(2, '0'); // Soma +1 para que na visualização os meses iniciem em 01 e não em 00(padrão js)
      const ano = currentDate.getFullYear();

      setTextoCalendarioInicial(`${dia}/${mes}/${ano}`);
    } else if (event.type === 'dismissed') { // Caso o usuário cancele a operação
      setMostrarCalendarioInicial(false);
    }
  }

  const CalendarioFinal = (event: DateTimePickerEvent, dataSelecionada?: Date) => {

    // Fechar a janela do calendário assim que acontecer alguma ação(confirmar ou cancelar)
    // Platform.OS -> recurso do react native que detecta qual o sistema operacional que está rodando(ios ou android)
    if (Platform.OS === 'android') {
      setMostrarCalendarioFinal(false);
    }

    // Ao confirmar a data escolhida, clicar no "Ok"
    if (event.type === 'set' && dataSelecionada) {
      const currentDate = dataSelecionada;
      setDataFinal(currentDate); // Atualiza o estado da data com a escolhida


      // Formatação para leitura da data
      const dia = String(currentDate.getDate()).padStart(2, '0'); // .padStart(2, '0') -> garante que se o número for menor que 10, acrescenta um 0 na frente
      const mes = String(currentDate.getMonth() + 1).padStart(2, '0'); // Soma +1 para que na visualização os meses iniciem em 01 e não em 00(padrão js)
      const ano = currentDate.getFullYear();

      setTextoCalendarioFinal(`${dia}/${mes}/${ano}`);
    } else if (event.type === 'dismissed') { // Caso o usuário cancele a operação
      setMostrarCalendarioFinal(false);
    }
  }


  // Constante criada para permitir agendamento de visita somente a partir do dia seguinte
  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);


  const Relogio = (event: DateTimePickerEvent, horaSelecionada?: Date) => {
    if (Platform.OS === 'android') {
      setMostrarRelogio(false);
    }

    if (event.type === 'set' && horaSelecionada) {
      const currentDate = horaSelecionada;
      setHorario(currentDate);

      const horas = String(horaSelecionada.getHours()).padStart(2, '0');
      const minutos = String(horaSelecionada.getMinutes()).padStart(2, '0');
      setTextoRelogio(`${horas}:${minutos}`);

    } else if (event.type === 'dismissed') {
      setMostrarRelogio(false);
    }
  }

  async function Salvar() {
    // Validação básica
    if (!nomeEvento.trim() || !nomeEmpresa.trim() || !nomeCliente.trim() || !cep.trim() || !Logradouro.trim() || !bairro.trim() || !numero.trim() || !descricao.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios (*).");
      return;
    }

    const novaVisita: CriarVisita = {
      nomeEvento: nomeEvento,
      nomeSede: nomeEmpresa,
      cliente: nomeCliente,
      dataInicial: dataInicial,
      dataFinal: dataFinal,
      horario: horario,
      cep: cep,
      logradouro: Logradouro,
      bairro: bairro,
      descricao: descricao,
    };

    const sucesso = await agendarVisita(novaVisita);

    if (sucesso) {
      setNomeEvento("");
      setNomeEmpresa("");
      setNomeCliente("");
      // setDataInicial("");
      // setDataFinal("");
      // setHorario("");
      setCep("");
      setLogradouro("");
      setBairro("");
      setDescricao("");
    }
  }


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
                Nome do Evento
              </Text>
              <View style={CampoInput}>
                <PesquisaIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Nome do evento..."
                  onChangeText={setNomeEvento}
                  value={nomeEvento} />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Nome da Empresa
              </Text>
              <View style={CampoInput}>
                <PesquisaIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Insira o nome da empresa..."
                  onChangeText={setNomeEmpresa}
                  value={nomeEmpresa} />
              </View>
            </View>


            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Cliente
              </Text>
              <View style={CampoInput}>
                <PesquisaIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Nome do cliente..."
                  onChangeText={setNomeCliente}
                  value={nomeCliente} />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}> Data Inicial da Visita </Text>
              <Pressable style={CampoInput} onPress={() => setMostrarCalendarioInicial(true)}>
                <CalendarioIcon style={InputIcon} color={Colors.gray} />
                <Text style={[Input, textoCalendarioInicial === 'Selecionar data...' ? { color: Colors.darkgray } : { color: Colors.black }]}>
                  {textoCalendarioInicial}
                </Text>
              </Pressable>

              {/* Exibição do Calendário */}
              {mostrarCalendarioInicial && (
                <DateTimePicker
                  value={dataInicial}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={CalendarioInicial}
                  minimumDate={amanha}
                />
              )}

            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}> Data Final da Visita </Text>
              <Pressable style={CampoInput} onPress={() => setMostrarCalendarioFinal(true)}>
                <CalendarioIcon style={InputIcon} color={Colors.gray} />
                <Text style={[Input, textoCalendarioFinal === 'Selecionar data...' ? { color: Colors.darkgray } : { color: Colors.black }]}>
                  {textoCalendarioFinal}
                </Text>
              </Pressable>

              {/* Exibição do Calendário */}
              {mostrarCalendarioFinal && (
                <DateTimePicker
                  value={dataFinal} // data inicial selecionada ao abrir o calendário, geralmente é a data mínima
                  mode="date" // Aceita apenas data (ignora hora)
                  display={Platform.OS === 'ios' ? 'inline' : 'default'} // Estilo visual
                  onChange={CalendarioFinal}
                  minimumDate={amanha} // Bloqueia datas passadas
                />
              )}

            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}> Horário Previsto </Text>
              <Pressable style={CampoInput} onPress={() => setMostrarRelogio(true)}>
                <RelogioIcon style={InputIcon} color={Colors.gray} />
                <Text style={[Input, textoRelogio === 'Selecionar horário...' ? { color: Colors.darkgray } : { color: Colors.black }]}>
                  {textoRelogio}
                </Text>
              </Pressable>

              Exibição do Relógio
              {mostrarRelogio && (
                <DateTimePicker
                  value={horario}
                  mode="time"
                  is24Hour={true} // Exibe o seletor de horários no formato de 24 horas
                  display="default"
                  onChange={Relogio}
                />
              )}
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>Técnicos</Text>
              <View style={CampoInput}>
                <LocalIcon style={InputIcon} color={Colors.gray} />
                <TextInput style={Input} placeholder="Selecione os técnicos que irão na visita" />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>Cep</Text>
              <View style={CampoInput}>
                <LocalIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="00000-000"
                  onChangeText={setCep}
                  value={cep} />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Logradouro / Endereço
              </Text>
              <View style={CampoInput}>
                <RuaIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Rua Niterói"
                  onChangeText={setLogradouro}
                  value={Logradouro} />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Bairro
              </Text>
              <View style={CampoInput}>
                <RuaIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Bairro"
                  onChangeText={setBairro}
                  value={bairro} />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>Número</Text>
              <View style={CampoInput}>
                <NumeroIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="1234"
                  onChangeText={setNumero}
                  value={numero} />
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
                  onChangeText={setDescricao}
                  value={descricao}
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
