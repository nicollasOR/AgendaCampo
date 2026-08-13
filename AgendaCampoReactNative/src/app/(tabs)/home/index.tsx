import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import VisitaIcon from "../../../../assets/svg/VisitaIcon.svg"
import VisitaCheckIcon from "../../../../assets/svg/VisitaCheckIcon.svg"
import ArrowMapIcon from "../../../../assets/svg/ArrowMapIcon.svg"
import CalendarIcon from "../../../../assets/svg/CalendarIcon.svg"
import WatchIcon from "../../../../assets/svg/WatchIcon.svg"
import MapIcon from "../../../../assets/svg/MapIcon.svg"
import { theme } from '../../../constants/theme'

const Home = () => {
  return (
    <View style={styles.main}>
        <View style={styles.content}>
            <View style={styles.welcomeUser}>
                <Text style={styles.ola}>Ola, Técnico João</Text>
                <Text style={styles.welcome}>Aqui estão suas visitas programadas</Text>
            </View>

            <View style={styles.containerVisitas}>
                <View style={styles.topOfContainer}>
                    <View style={styles.textBigger}>
                        <VisitaIcon />
                        <Text>Visitas Futuras</Text>
                    </View>

                    <View style={styles.visitasNumber}><Text style={styles.textoVisitasNumber}>2 Hoje</Text></View>
                </View>


                <View style={styles.cardVisita}>
                    <View style={styles.cabecalhoCard}>
                        <View style={styles.statusVisita}>
                            <Text style={styles.statusText}>Agendada</Text>
                        </View>
                        <VisitaCheckIcon />
                    </View>

                    <View style={styles.contentCard}>
                        <View>
                            <Text>Fazenda Boa Esperança</Text>
                            <Text>Ref: RN01</Text>
                        </View>

                        <View style={styles.infoVisita}>
                            <View style={styles.conjuntoIcon}>
                                <CalendarIcon />
                                <Text>24 Out 2023</Text>
                            </View>
                            <View style={styles.conjuntoIcon}>
                                <WatchIcon />
                                <Text>08:00 - 10:00</Text>
                            </View>
                            <View style={styles.conjuntoIcon}>
                                <MapIcon />
                                <Text>Rod. SP 340, Km 15, Mogi Mirim - SP</Text>
                            </View>
                        </View>
                        
                    </View>

                    <View style={styles.rodapeCard}>
                        <TouchableOpacity>
                            <Text>Detalhes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <ArrowMapIcon />
                            <Text>Iniciar Rota</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.cardVisita}>
                    <View style={styles.cabecalhoCard}>
                        <View style={styles.statusVisita}>
                            <Text style={styles.statusText}>Agendada</Text>
                        </View>
                        <VisitaCheckIcon />
                    </View>

                    <View style={styles.contentCard}>
                        <View>
                            <Text>Sítio das Águas</Text>
                            <Text>Ref: RN03</Text>
                        </View>

                        <View style={styles.infoVisita}>
                            <View style={styles.conjuntoIcon}>
                                <CalendarIcon />
                                <Text>24 Out 2023</Text>
                            </View>
                            <View style={styles.conjuntoIcon}>
                                <WatchIcon />
                                <Text>14:00 - 16:30</Text>
                            </View>
                            <View style={styles.conjuntoIcon}>
                                <MapIcon />
                                <Text>Estrada Municipal, Lote 4, Itapira - SP</Text>
                            </View>
                        </View>
                        
                    </View>

                    <View style={styles.rodapeCard}>
                        <TouchableOpacity>
                            <Text>Detalhes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <ArrowMapIcon />
                            <Text>Iniciar Rota</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    main:{
        width: '100%',
        height: '100%'
    }, 

    content:{
        width:'90%'
    },

    welcomeUser:{
        flexDirection: "column",
        gap: 5,
    },

    ola:{
        fontSize: 28,
        fontWeight: "bold"
    },

    welcome:{
        fontSize: 16,
        color: "#434654"
    },

    containerVisitas:{

    },

    topOfContainer:{

    },

    textBigger:{

    },

    visitasNumber:{

    },

    textoVisitasNumber:{

    },

    cardVisita:{

    },

    cabecalhoCard:{

    },

    statusVisita:{

    },

    statusText:{

    },

    contentCard:{

    },

    infoVisita:{

    },

    conjuntoIcon:{

    },

    rodapeCard:{

    },
    
})