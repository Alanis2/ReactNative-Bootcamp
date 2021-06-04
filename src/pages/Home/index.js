import React, { useState } from 'react'; //import react 
import { TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, Modal,
            ActivityIndicator } from 'react-native'; //import de funções do react

import { LinearGradient } from 'expo-linear-gradient'

//Imports de componentes 
import StatusBarPage from '../../components/StatusBarPage'
import Menu from '../../components/Menu';
import ModalLink from '../../components/ModalLink'


import { Feather } from '@expo/vector-icons'; //Import de icones 
import {
    ContainerLogo, Logo, ContainerContent, Title, SubTitle, ContainerInput,
    BoxIcon, Input, ButtonLink, ButtonLinkText} from './styles'; // import de estilos

import api from '../../Services/api' // import de api

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState ('');
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState({});

     async function handleShortLink() {
        setLoading(true); //Iniciar O "Loading/icone"

         try{
            const response = await api.post('/shorten',
            {
                long_url: input //Função para a API funcionar (Lembrando que já é uma api pronta do site bitly)
            })

            setData(response.data) // Guardar a Api
            setModalVisible(true) // Mostrar a api pro usuário ver que foi encurtada


            //Deu tudo certo!! Preciso salvar esse link em uma lista nesse storage

            Keyboard.dismiss(); //Função para o teclado sair da tela
            setLoading(false); // Finalização do loading. O link está certo
            setInput(''); //Deixar o input limpo depois do processo concluído

         }catch{ //caso algo de errado
            alert('Ops parece que algo deu errado'); // criar um alerta pro usuário
            Keyboard.dismiss(); //Abaixar o teclado após aparecer o alerta
            setInput(''); // Limpar a caixa, para que possa ser selecionado outro link
            setLoading(false); // Finalizar o loading. Link Errado
         }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} > {/* Deixar a tela livre para o toque */}
            <LinearGradient //alinhar itens da tela 
                colors={['#1ddbb9', '#132742']}
                style={{ flex: 1, justifyContent: 'center' }}
            >

                <StatusBarPage
                    barStyle="light-content"
                    backgroundColor="#1ddbb9"
                />

                <Menu />

                <KeyboardAvoidingView //Para o teclado sair da tela quando o usuario clicar em qualquer parte
                    behavior={ Platform.OS === 'android' ? 'padding' : 'position' }
                    enabled
                >
                    
                    <ContainerLogo>  {/* Adicionar Logo */}
                        <Logo source={require('../../assets/logo.png')} resizeMode="contain" />
                    </ContainerLogo>

                    <ContainerContent> {/* Adicionar Titulos */}
                        <Title>SujeitoLink</Title>
                        <SubTitle>Cole seu link para encurtar</SubTitle>

                        <ContainerInput>
                            <BoxIcon>
                                <Feather name="link" size={22} color="#fff" /> {/*Para Poder Aceitar Somente Links*/}
                            </BoxIcon>
                            <Input //Estilos do Input
                                placeholder="Cole seu link aqui..."
                                placeholderTextColor="#fff"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="url"
                                value={input}
                                onChangeText={ (text) => setInput(text)}
                            />
                        </ContainerInput>

                        <ButtonLink onPress={ handleShortLink }>
                            { //Inteção de tempo de espera
                               loading ? (
                                    <ActivityIndicator color="#121212" size={15}/>
                               ) : (
                                <ButtonLinkText>Gerar Link</ButtonLinkText>
                               )
                            }
                        </ButtonLink>

                    </ContainerContent>
                </KeyboardAvoidingView>
                
                <Modal visible={modalVisible} transparent animationType='slide'> {/* Serve para subir os links encurtados  */}
                    <ModalLink onClose={ () => setModalVisible(false) }  data={data} />
                </Modal>

            </LinearGradient>
        </TouchableWithoutFeedback >
    )
}