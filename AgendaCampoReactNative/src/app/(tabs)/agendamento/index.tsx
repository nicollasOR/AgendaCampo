import {
  ActivityIndicator,
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
} from "@/src/constants/theme";
import RuaIcon from "@/assets/svg/RuaIcon.svg";
import LocalIcon from "@/assets/svg/LocalIcon.svg";
import NumeroIcon from "@/assets/svg/NumeroIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
import RelogioIcon from "@/assets/svg/RelogioIcon.svg";
import CancelarIcon from "@/assets/svg/CancelarIcon.svg";
import PesquisaIcon from "@/assets/svg/PesquisaIcon.svg";
import ConfirmarIcon from "@/assets/svg/ConfirmarIcon.svg";
import DescricaoIcon from "@/assets/svg/DescricaoIcon.svg";
import CalendarioIcon from "@/assets/svg/CalendarioIcon.svg";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import useVisita from "@/src/hooks/useVisita";
import { CriarVisita } from "@/src/@types/visita";
import { salvarVisitaNoCalendarioNativo } from "@/src/hooks/useCalendario";

export default function Agendamento() {
  const { agendarVisita } = useVisita();

  const [nomeEvento, setNomeEvento] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [descricao, setDescricao] = useState("");

  // Estados de controle da interface
  const [loadingCep, setLoadingCep] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // Controlar a formatação da data inicial
  const [dataInicial, setDataInicial] = useState<Date>(new Date());
  const [mostrarCalendarioInicial, setMostrarCalendarioInicial] =
    useState<boolean>(false);
  const [textoCalendarioInicial, setTextoCalendarioInicial] =
    useState<string>("Selecionar data...");

  // Controlar a formatação da data final
  const [dataFinal, setDataFinal] = useState<Date>(new Date());
  const [mostrarCalendarioFinal, setMostrarCalendarioFinal] =
    useState<boolean>(false);
  const [textoCalendarioFinal, setTextoCalendarioFinal] =
    useState<string>("Selecionar data...");

  // Controlar a formatação do horário
  const [horario, setHorario] = useState<Date>(new Date());
  const [mostrarRelogio, setMostrarRelogio] = useState<boolean>(false);
  const [textoRelogio, setTextoRelogio] = useState<string>(
    "Selecionar horário...",
  );

  const CalendarioInicial = (
    event: DateTimePickerEvent,
    dataSelecionada?: Date,
  ) => {
    if (Platform.OS === "android") {
      setMostrarCalendarioInicial(false);
    }

    if (event.type === "set" && dataSelecionada) {
      const currentDate = dataSelecionada;
      setDataInicial(currentDate);

      const dia = String(currentDate.getDate()).padStart(2, "0");
      const mes = String(currentDate.getMonth() + 1).padStart(2, "0");
      const ano = currentDate.getFullYear();

      setTextoCalendarioInicial(`${dia}/${mes}/${ano}`);
    } else if (event.type === "dismissed") {
      setMostrarCalendarioInicial(false);
    }
  };

  const CalendarioFinal = (
    event: DateTimePickerEvent,
    dataSelecionada?: Date,
  ) => {
    if (Platform.OS === "android") {
      setMostrarCalendarioFinal(false);
    }

    if (event.type === "set" && dataSelecionada) {
      const currentDate = dataSelecionada;
      setDataFinal(currentDate);

      const dia = String(currentDate.getDate()).padStart(2, "0");
      const mes = String(currentDate.getMonth() + 1).padStart(2, "0");
      const ano = currentDate.getFullYear();

      setTextoCalendarioFinal(`${dia}/${mes}/${ano}`);
    } else if (event.type === "dismissed") {
      setMostrarCalendarioFinal(false);
    }
  };

  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);

  const Relogio = (event: DateTimePickerEvent, horaSelecionada?: Date) => {
    if (Platform.OS === "android") {
      setMostrarRelogio(false);
    }

    if (event.type === "set" && horaSelecionada) {
      const currentDate = horaSelecionada;
      setHorario(currentDate);

      const horas = String(horaSelecionada.getHours()).padStart(2, "0");
      const minutos = String(horaSelecionada.getMinutes()).padStart(2, "0");
      setTextoRelogio(`${horas}:${minutos}`);
    } else if (event.type === "dismissed") {
      setMostrarRelogio(false);
    }
  };

  // Função para buscar o endereço no ViaCEP
  const buscarCep = async (cepBuscado: string) => {
    const cepLimpo = cepBuscado.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    setLoadingCep(true);
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`,
      );
      const data = await response.json();

      if (data.erro) {
        Alert.alert("Atenção", "CEP não encontrado!");
        return;
      }

      setLogradouro(data.logradouro || "");
      setBairro(data.bairro || "");
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      Alert.alert("Erro", "Não foi possível conectar ao ViaCEP.");
    } finally {
      setLoadingCep(false);
    }
  };

  // Aplica a máscara XXXXX-XXX e dispara a requisição ao atingir 8 dígitos
  const handleCepChange = (texto: string) => {
    const apenasNumeros = texto.replace(/\D/g, "");
    const cepFormatado = apenasNumeros.replace(/^(\d{5})(\d)/, "$1-$2");

    setCep(cepFormatado);

    if (apenasNumeros.length === 8) {
      buscarCep(apenasNumeros);
    }
  };

  async function Salvar() {
    if (
      !nomeEvento.trim() ||
      !nomeEmpresa.trim() ||
      !nomeCliente.trim() ||
      !cep.trim() ||
      !logradouro.trim() ||
      !bairro.trim() ||
      !numero.trim() ||
      !descricao.trim()
    ) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios (*).");
      return;
    }

    const novaVisita: CriarVisita = {
      nomeEvento,
      nomeSede: nomeEmpresa,
      cliente: nomeCliente,
      dataInicial,
      dataFinal,
      horario,
      cep,
      logradouro,
      bairro,
      numero,
      tecnicos: [],
      descricao,
    };

    setSalvando(true);
    const sucesso = await agendarVisita(novaVisita);
    setSalvando(false);

    if (sucesso) {
      // Integração com a agenda nativa
      const enderecoCompleto = `${logradouro}, ${numero} - ${bairro}, CEP: ${cep}`;
      await salvarVisitaNoCalendarioNativo({
        titulo: `${nomeEvento} - ${nomeCliente}`,
        descricao: `Empresa: ${nomeEmpresa}\n\nDescrição: ${descricao}`,
        localizacao: enderecoCompleto,
        dataInicial,
        horario,
      });

      // Limpar formulário...
      setNomeEvento("");
      setNomeEmpresa("");
      setNomeCliente("");
      setCep("");
      setLogradouro("");
      setBairro("");
      setNumero("");
      setDescricao("");
      setTextoCalendarioInicial("Selecionar data...");
      setTextoCalendarioFinal("Selecionar data...");
      setTextoRelogio("Selecionar horário...");
    }
  }

  return (
    <SafeAreaView style={Container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={Scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
                Nome do Evento *
              </Text>
              <View style={CampoInput}>
                <PesquisaIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Nome do evento..."
                  onChangeText={setNomeEvento}
                  value={nomeEvento}
                />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Nome da Empresa *
              </Text>
              <View style={CampoInput}>
                <PesquisaIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Insira o nome da empresa..."
                  onChangeText={setNomeEmpresa}
                  value={nomeEmpresa}
                />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>Cliente *</Text>
              <View style={CampoInput}>
                <PesquisaIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Nome do cliente..."
                  onChangeText={setNomeCliente}
                  value={nomeCliente}
                />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Data Inicial da Visita *
              </Text>
              <Pressable
                style={CampoInput}
                onPress={() => setMostrarCalendarioInicial(true)}
              >
                <CalendarioIcon style={InputIcon} color={Colors.gray} />
                <Text
                  style={[
                    Input,
                    textoCalendarioInicial === "Selecionar data..."
                      ? { color: Colors.darkgray }
                      : { color: Colors.black },
                  ]}
                >
                  {textoCalendarioInicial}
                </Text>
              </Pressable>

              {mostrarCalendarioInicial && (
                <DateTimePicker
                  value={dataInicial}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={CalendarioInicial}
                  minimumDate={amanha}
                />
              )}
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Data Final da Visita *
              </Text>
              <Pressable
                style={CampoInput}
                onPress={() => setMostrarCalendarioFinal(true)}
              >
                <CalendarioIcon style={InputIcon} color={Colors.gray} />
                <Text
                  style={[
                    Input,
                    textoCalendarioFinal === "Selecionar data..."
                      ? { color: Colors.darkgray }
                      : { color: Colors.black },
                  ]}
                >
                  {textoCalendarioFinal}
                </Text>
              </Pressable>

              {mostrarCalendarioFinal && (
                <DateTimePicker
                  value={dataFinal}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={CalendarioFinal}
                  minimumDate={amanha}
                />
              )}
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Horário Previsto *
              </Text>
              <Pressable
                style={CampoInput}
                onPress={() => setMostrarRelogio(true)}
              >
                <RelogioIcon style={InputIcon} color={Colors.gray} />
                <Text
                  style={[
                    Input,
                    textoRelogio === "Selecionar horário..."
                      ? { color: Colors.darkgray }
                      : { color: Colors.black },
                  ]}
                >
                  {textoRelogio}
                </Text>
              </Pressable>

              {mostrarRelogio && (
                <DateTimePicker
                  value={horario}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={Relogio}
                />
              )}
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>Técnicos</Text>
              <View style={CampoInput}>
                <PerfilIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Selecione os técnicos que irão na visita"
                />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>CEP *</Text>
              <View style={CampoInput}>
                {loadingCep ? (
                  <ActivityIndicator
                    size="small"
                    color={Colors.darkblue}
                    style={InputIcon}
                  />
                ) : (
                  <LocalIcon style={InputIcon} color={Colors.gray} />
                )}
                <TextInput
                  style={Input}
                  placeholder="00000-000"
                  onChangeText={handleCepChange}
                  value={cep}
                  keyboardType="numeric"
                  maxLength={9}
                  onBlur={() => buscarCep(cep)}
                />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Logradouro / Endereço *
              </Text>
              <View style={CampoInput}>
                <RuaIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Rua Niterói"
                  onChangeText={setLogradouro}
                  value={logradouro}
                />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>Bairro *</Text>
              <View style={CampoInput}>
                <RuaIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="Bairro"
                  onChangeText={setBairro}
                  value={bairro}
                />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>Número *</Text>
              <View style={CampoInput}>
                <NumeroIcon style={InputIcon} color={Colors.gray} />
                <TextInput
                  style={Input}
                  placeholder="1234"
                  onChangeText={setNumero}
                  value={numero}
                />
              </View>
            </View>

            <View style={CampoForm}>
              <Text style={[Label, { color: Colors.darkblue }]}>
                Descrição do Serviço *
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

            <TouchableOpacity
              style={[Btn, salvando && { opacity: 0.7 }]}
              onPress={Salvar}
              disabled={salvando}
            >
              {salvando ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <>
                  <ConfirmarIcon color={Colors.white} />
                  <Text style={[BtnText, { color: Colors.white }]}>
                    Confirmar Agendamento
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
