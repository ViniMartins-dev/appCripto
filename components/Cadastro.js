import React, {useState} from "react";
import { View, TextInput, Alert, Button } from 'react-native';
import { createCripto } from './Api';

export default function Cadastro({navigation}) {
    const [registro, setRegistros] = useState([]);
    const [nomeCripto, setNomeCripto] = useState('');
    const [siglaCripto, setSiglaCripto] = useState('');
    const [selectedCriptoId, setSelectedCriptoId] = useState(null);

    const handleSubmit = async () => {
        if(!nomeCripto || !siglaCripto) {
            Alert.alert('ATENÇÃO', 'Preencha todos os campos antes de cadastrar.');
            return;
        }

        const newCripto = {nomeCripto, siglaCripto};

        if(selectedCriptoId) {
            await updateCripto(selectedCriptoId, newCripto);
            setSelectedCriptoId(null);
        } else {
            const addedCripto = await createCripto(newCripto);
            if(addedCripto) {
                setNomeCripto('');
                setSiglaCripto('');

                Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
                    {text: 'OK', onPress: () => navigation.navigate('Home')},
                ]);
            }
        }
    }

    return (
        <View>
            <TextInput 
                placeholder="Nome da Cripto"
                value={nomeCripto}
                onChangeText={setNomeCripto}
            />
            <TextInput 
                placeholder="Sigla da Cripto"
                value={siglaCripto}
                onChangeText={setSiglaCripto}
            />
            <Button title="Cadastrar" onPress={handleSubmit} />
        </View>
    );
}