import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, Alert, TextInput} from 'react-native';
import axios from 'axios';
import style from '../styles/style';



const ListarNomesAxios = () => {
    const[dados, setDados]  = useState([]);
    const [texto, setTexto] = useState([]);
    const [clicou, setClicou] = useState(false);
    const [entrada, setEntrada] = useState('');


    const buscarDados = () => {
        axios.get('http://localhost:8085/nomes') //caso de erro de network, trocar o localhost para o ip.
        .then((response) => {
        //armazenar a resposta
            setDados(response.data)
        })
        .catch((error) => {
            Alert.alert(error.message())
        })
    }

    useEffect(() =>{
        if(clicou == true) {
            //Alert.alert('Botão foi acionado ' + (entrada) )
            //setTexto(entrada)
            buscarDados()
          }
          return ()=>{
            setClicou(false)
          }
        }, [clicou])

    return(
        <View>
        <Text style={style.title}> Listar Nomes Axios</Text>

        <Text style={style.texto}>{JSON.stringify(texto.Search)}</Text>
 
      <TextInput style={style.caixa}
        value={entrada}
        onChangeText={(e)=>setEntrada(e)} />
 
      <TouchableOpacity style={style.botao}
        onPress={()=>setClicou(true)}
      >
        <Text style={style.textoBotao}>BUSCAR DADOS</Text>
      </TouchableOpacity>



        <FlatList 
            data={dados}
            renderItem={({item})=><Text style ={style.lista}>{item.nome}</Text>}
 />
        </View>

    )
}

export default ListarNomesAxios;