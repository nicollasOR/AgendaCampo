import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

import { useVisita } from "@/src/hooks/useVisita";
import { useUsuario } from "@/src/hooks/useUsuario";
import { CriarVisita } from "@/src/@types/visita";
import { salvarVisitaNoCalendarioNativo } from "@/src/hooks/useCalendario";

import { Colors, theme } from "@/src/constants/theme";

import RuaIcon from "@/assets/svg/RuaIcon.svg";
import LocalIcon from "@/assets/svg/LocalIcon.svg";
import TargetIcon from "@/assets/svg/TargetIcon.svg";
import NumeroIcon from "@/assets/svg/NumeroIcon.svg";
import PerfilIcon from "@/assets/svg/PerfilIcon.svg";
import RelogioIcon from "@/assets/svg/RelogioIcon.svg";
import CancelarIcon from "@/assets/svg/CancelarIcon.svg";
import ConfirmarIcon from "@/assets/svg/ConfirmarIcon.svg";
import DescricaoIcon from "@/assets/svg/DescricaoIcon.svg";
import CalendarioIcon from "@/assets/svg/CalendarioIcon.svg";
import EnterpriseIcon from "@/assets/svg/EnterpriseIcon.svg";
import PerfilTechIcon from "@/assets/svg/PerfilTechIcon.svg";

export default function Agendamento() {
  const { agendarVisita } = useVisita();
  const usuarios = useUsuario();

  const [nomeEvento, setNomeEvento] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tecnicosSelecionados, setTecnicosSelecionados] = useState<string[]>(
    [],
  );

  const [modalTecnicosVisible, setModalTecnicosVisible] = useState(false);

  // Estados de controle da interface
  const [loadingCep, setLoadingCep] = useState(false);
  const [salvando, setSalvando] = useState(false);

  // Data mínima para o agendamento (Amanhã)
  const getAmanha = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  };

  // Controlar a formatação da data inicial
  const [dataInicial, setDataInicial] = useState<Date>(getAmanha());
  const [mostrarCalendarioInicial, setMostrarCalendarioInicial] =
    useState<boolean>(false);
  const [textoCalendarioInicial, setTextoCalendarioInicial] =
    useState<string>("Selecionar data...");

  // Controlar a formatação da data final
  const [dataFinal, setDataFinal] = useState<Date>(getAmanha());
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

  const selecionarTecnicos = (nome: string) => {
    setTecnicosSelecionados((valorAnterior) =>
      valorAnterior.includes(nome)
        ? valorAnterior.filter((item) => item !== nome)
        : [...valorAnterior, nome],
    );
  };

  const CalendarioInicial = (
    event: DateTimePickerEvent,
    dataSelecionada?: Date,
  ) => {
    if (Platform.OS === "android") {
      setMostrarCalendarioInicial(false);
    }

    if (event.type === "set" && dataSelecionada) {
      setDataInicial(dataSelecionada);

      const dia = String(dataSelecionada.getDate()).padStart(2, "0");
      const mes = String(dataSelecionada.getMonth() + 1).padStart(2, "0");
      const ano = dataSelecionada.getFullYear();

      setTextoCalendarioInicial(`${dia}/${mes}/${ano}`);

      // Se a data final for menor que a nova data inicial selecionada, reseta a data final
      if (dataFinal < dataSelecionada) {
        setDataFinal(dataSelecionada);
        setTextoCalendarioFinal("Selecionar data...");
      }
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
      // Normaliza as datas zerando as horas para comparação correta apenas do dia
      const dInicial = new Date(
        dataInicial.getFullYear(),
        dataInicial.getMonth(),
        dataInicial.getDate(),
      );
      const dSelecionada = new Date(
        dataSelecionada.getFullYear(),
        dataSelecionada.getMonth(),
        dataSelecionada.getDate(),
      );

      if (dSelecionada < dInicial) {
        Alert.alert(
          "Data inválida",
          "A data final não pode ser anterior à data inicial.",
        );
        return;
      }

      setDataFinal(dataSelecionada);

      const dia = String(dataSelecionada.getDate()).padStart(2, "0");
      const mes = String(dataSelecionada.getMonth() + 1).padStart(2, "0");
      const ano = dataSelecionada.getFullYear();

      setTextoCalendarioFinal(`${dia}/${mes}/${ano}`);
    } else if (event.type === "dismissed") {
      setMostrarCalendarioFinal(false);
    }
  };

  const Relogio = (event: DateTimePickerEvent, horaSelecionada?: Date) => {
    if (Platform.OS === "android") {
      setMostrarRelogio(false);
    }

    if (event.type === "set" && horaSelecionada) {
      setHorario(horaSelecionada);

      const horas = String(horaSelecionada.getHours()).padStart(2, "0");
      const minutos = String(horaSelecionada.getMinutes()).padStart(2, "0");
      setTextoRelogio(`${horas}:${minutos}`);
    } else if (event.type === "dismissed") {
      setMostrarRelogio(false);
    }
  };

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

  const handleCepChange = (texto: string) => {
    const apenasNumeros = texto.replace(/\D/g, "");
    const cepFormatado = apenasNumeros.replace(/^(\d{5})(\d)/, "$1-$2");

    setCep(cepFormatado);

    if (apenasNumeros.length === 8) {
      buscarCep(apenasNumeros);
    }
  };

  const limparFormulario = () => {
    setNomeEvento("");
    setNomeEmpresa("");
    setNomeCliente("");
    setCep("");
    setLogradouro("");
    setBairro("");
    setNumero("");
    setDescricao("");
    setTecnicosSelecionados([]);
    setTextoCalendarioInicial("Selecionar data...");
    setTextoCalendarioFinal("Selecionar data...");
    setTextoRelogio("Selecionar horário...");
  };

  async function Salvar() {
    // Validação de todos os campos obrigatórios
    if (
      !nomeEvento.trim() ||
      !nomeEmpresa.trim() ||
      !nomeCliente.trim() ||
      !cep.trim() ||
      !logradouro.trim() ||
      !bairro.trim() ||
      !descricao.trim() ||
      textoCalendarioInicial === "Selecionar data..." ||
      textoCalendarioFinal === "Selecionar data..." ||
      textoRelogio === "Selecionar horário..." ||
      tecnicosSelecionados.length === 0
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
      tecnicos: tecnicosSelecionados,
      descricao,
    };

    setSalvando(true);
    const sucesso = await agendarVisita(novaVisita);
    setSalvando(false);

    if (sucesso) {
      const enderecoCompleto = `${logradouro}, ${numero || "S/N"}, ${bairro} - CEP: ${cep}`;
      await salvarVisitaNoCalendarioNativo({
        titulo: `${nomeEvento} - ${nomeCliente}`,
        descricao: `Empresa: ${nomeEmpresa}\n\nDescrição: ${descricao}`,
        localizacao: enderecoCompleto,
        dataInicial,
        dataFinal,
        horario,
      });

      limparFormulario();
      Alert.alert("Sucesso", "Visita agendada com sucesso!");
    }
  }

  return (
    <SafeAreaView style={theme.container} edges={["left", "right"]}>
      <ScrollView
        contentContainerStyle={theme.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text style={theme.h1}>Nova Visita</Text>
          <Text style={[theme.h4, { color: Colors.darkgray }]}>
            Preencha os detalhes para agendar uma nova visita técnica.
          </Text>
          <Text style={[theme.p, { color: Colors.lightgray }]}>
            Campo com (*) são obrigatórios
          </Text>
        </View>

        <View style={theme.form}>
          <View style={theme.column}>
            {/* Nome da Empresa */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Nome da Empresa *
              </Text>
              <View style={theme.campoInput}>
                <EnterpriseIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput
                  style={theme.input}
                  placeholder="Insira o nome da empresa..."
                  onChangeText={setNomeEmpresa}
                  value={nomeEmpresa}
                />
              </View>
            </View>

            {/* Objetivo da Visita */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Objetivo da Visita *
              </Text>
              <View style={theme.campoInput}>
                <TargetIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput
                  style={theme.input}
                  placeholder="Insira o objetivo da visita..."
                  onChangeText={setNomeEvento}
                  value={nomeEvento}
                />
              </View>
            </View>

            {/* Cliente */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Cliente *
              </Text>
              <View style={theme.campoInput}>
                <PerfilIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput
                  style={theme.input}
                  placeholder="Nome do cliente..."
                  onChangeText={setNomeCliente}
                  value={nomeCliente}
                />
              </View>
            </View>

            {/* Data Inicial */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Data Inicial da Visita *
              </Text>
              <Pressable
                style={theme.campoInput}
                onPress={() => setMostrarCalendarioInicial(true)}
              >
                <CalendarioIcon style={theme.inputIcon} color={Colors.gray} />
                <Text
                  style={[
                    theme.input,
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
                  minimumDate={getAmanha()}
                />
              )}
            </View>

            {/* Data Final */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Data Final da Visita *
              </Text>
              <Pressable
                style={theme.campoInput}
                onPress={() => {
                  if (textoCalendarioInicial === "Selecionar data...") {
                    Alert.alert(
                      "Data inicial",
                      "Selecione a data inicial primeiro.",
                    );
                    return;
                  }
                  setMostrarCalendarioFinal(true);
                }}
              >
                <CalendarioIcon style={theme.inputIcon} color={Colors.gray} />
                <Text
                  style={[
                    theme.input,
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
                  minimumDate={dataInicial}
                />
              )}
            </View>

            {/* Horário Inicial Previsto */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Horário Inicial Previsto *
              </Text>
              <Pressable
                style={theme.campoInput}
                onPress={() => setMostrarRelogio(true)}
              >
                <RelogioIcon style={theme.inputIcon} color={Colors.gray} />
                <Text
                  style={[
                    theme.input,
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

            {/* Técnicos */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Técnicos *
              </Text>
              <Pressable
                style={theme.campoInput}
                onPress={() => setModalTecnicosVisible(true)}
              >
                <PerfilTechIcon style={theme.inputIcon} color={Colors.gray} />
                <Text
                  style={[
                    theme.input,
                    tecnicosSelecionados.length === 0
                      ? { color: Colors.darkgray }
                      : { color: Colors.black },
                  ]}
                  numberOfLines={1}
                >
                  {tecnicosSelecionados.length === 0
                    ? "Selecione os técnicos"
                    : tecnicosSelecionados.join(", ")}
                </Text>
              </Pressable>

              <Modal
                visible={modalTecnicosVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalTecnicosVisible(false)}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "flex-end",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: Colors.white,
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      padding: 16,
                      maxHeight: "70%",
                    }}
                  >
                    <Text
                      style={[
                        theme.h4,
                        { color: Colors.darkblue, marginBottom: 12 },
                      ]}
                    >
                      Selecione os técnicos
                    </Text>

                    <FlatList
                      data={usuarios}
                      keyExtractor={(item, index) =>
                        item.usuarioID?.toString() ||
                        item.nome ||
                        index.toString()
                      }
                      renderItem={({ item }) => {
                        const selecionado = tecnicosSelecionados.includes(
                          item.nome,
                        );
                        return (
                          <TouchableOpacity
                            onPress={() => selecionarTecnicos(item.nome)}
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              paddingVertical: 12,
                              borderBottomWidth: 1,
                              borderBottomColor: "#f0f0f0",
                            }}
                          >
                            <Text
                              style={{ paddingRight: 10, color: Colors.black }}
                            >
                              {item.nome}
                            </Text>
                            {selecionado && (
                              <Text
                                style={{
                                  color: Colors.darkblue,
                                  fontWeight: "bold",
                                }}
                              >
                                ✓
                              </Text>
                            )}
                          </TouchableOpacity>
                        );
                      }}
                    />

                    <TouchableOpacity
                      style={[theme.btn, { marginTop: 12 }]}
                      onPress={() => setModalTecnicosVisible(false)}
                    >
                      <Text style={[theme.btnText, { color: Colors.white }]}>
                        Confirmar ({tecnicosSelecionados.length})
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>

            {/* CEP */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>CEP</Text>
              <View style={theme.campoInput}>
                {loadingCep ? (
                  <ActivityIndicator
                    size="small"
                    color={Colors.darkblue}
                    style={theme.inputIcon}
                  />
                ) : (
                  <LocalIcon style={theme.inputIcon} color={Colors.gray} />
                )}
                <TextInput
                  style={theme.input}
                  placeholder="00000-000"
                  onChangeText={handleCepChange}
                  value={cep}
                  keyboardType="numeric"
                  maxLength={9}
                  onBlur={() => buscarCep(cep)}
                />
              </View>
            </View>

            {/* Logradouro */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Logradouro / Endereço *
              </Text>
              <View style={theme.campoInput}>
                <RuaIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput
                  style={theme.input}
                  placeholder="Rua Niterói"
                  onChangeText={setLogradouro}
                  value={logradouro}
                />
              </View>
            </View>

            {/* Bairro */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Bairro *
              </Text>
              <View style={theme.campoInput}>
                <RuaIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput
                  style={theme.input}
                  placeholder="Bairro"
                  onChangeText={setBairro}
                  value={bairro}
                />
              </View>
            </View>

            {/* Número */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Número
              </Text>
              <View style={theme.campoInput}>
                <NumeroIcon style={theme.inputIcon} color={Colors.gray} />
                <TextInput
                  style={theme.input}
                  placeholder="1234"
                  onChangeText={(texto) =>
                    setNumero(texto.replace(/[^0-9]/g, ""))
                  }
                  keyboardType="numeric"
                  value={numero}
                />
              </View>
            </View>

            {/* Descrição */}
            <View style={theme.campoForm}>
              <Text style={[theme.label, { color: Colors.darkblue }]}>
                Descrição do Serviço *
              </Text>
              <View style={theme.campoInput}>
                <DescricaoIcon
                  style={[theme.inputIcon, { top: 15 }]}
                  color={Colors.gray}
                />
                <TextInput
                  style={theme.textArea}
                  placeholder="Instruções específicas para o técnico..."
                  multiline={true}
                  onChangeText={setDescricao}
                  value={descricao}
                />
              </View>
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={[theme.column, theme.center]}>
            <TouchableOpacity
              style={[
                theme.btn2,
                {
                  backgroundColor: Colors.lightred,
                  borderWidth: 2,
                  borderColor: Colors.red,
                },
              ]}
              onPress={limparFormulario}
            >
              <CancelarIcon color={Colors.darkred} />
              <Text style={[theme.btnText, { color: Colors.darkred }]}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                theme.btn2,
                { backgroundColor: Colors.btn },
                salvando && { opacity: 0.7 },
              ]}
              onPress={Salvar}
              disabled={salvando}
            >
              {salvando ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <>
                  <ConfirmarIcon color={Colors.white} />
                  <Text style={[theme.btnText, { color: Colors.white }]}>
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
