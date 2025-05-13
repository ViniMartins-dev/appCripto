const API_URL = 'http://127.0.0.1:8001/api/cripto';
import { Alert } from "react-native";

export const fetchCripto = async (setRegistros) => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao buscar Criptos');
        }
        const data = await response.json();
        setRegistros(data);
    } catch (error) {
        console.error('Erro ao buscar Criptos: ', error);
        throw error;
    }
};

export const createCripto = async (CriptoData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(CriptoData),
        });

        if (response.status === 204) {
            Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
            return {};
        }

        const textResponse = await response.text();
        console.log('Resposta bruta da API: ', textResponse);

        let responseData;
        try {
            responseData = JSON.parse(textResponse);
        } catch (error) {
            console.warn('A resposta não é um JSON válido.');
            responseData = null;
        }

        if (!response.ok || !responseData) {
            throw new Error(responseData?.message || 'Erro desconhecido na API')
        }

        return responseData;
    } catch (error) {
        console.error('Erro ao cadastrar Cripto: ', error.message);
        Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
        return null;
    }
};

export const deleteCripto = async (CriptoId, setRegistros) => {
    try {
        const response = await fetch(`http://127.0.0.1:8001/api/cripto/${CriptoId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const responseData = await response.json();

            if (responseData.sucess) {
                Alert.alert('Sucesso!', responseData.message);

                setRegistros((prevRegistros) => {
                    const novaLista = prevRegistros.filter((Cripto) => Cripto.codigo != CriptoId);
                    console.log('Nova lista de Criptos: ', novaLista);
                    return novaLista;
                });
            } else {
                Alert.alert('Erro', response.message);
            }
        } else {
            const textResponse = await response.text();
            let responseData = null;

            try {
                responseData = JSON.parse(textResponse);
            } catch (error) {
                console.warn('A resposta não é um JSON válido.');
            }

            throw new Error(responseData?.message || 'Erro desconhecido ao excluir a Cripto');
        }
    } catch (error) {
        console.error('Erro ao excluir Cripto: ', error.message);
        Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
    }
};


