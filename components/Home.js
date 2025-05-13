import React, { useState, useEffect } from "react";
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import FloatingActionButton from 'react-native-floating-action-button';
import { fetchCripto, deleteCripto } from './Api';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({ navigation }) {
    const [registro, setRegistros] = useState([]); //pode dar erro por conta do plural

    useEffect(() => {
        fetchCripto(setRegistros);
    }, []);

    const handleDelete = (id) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja deletar esta Cripto?',
            [
                {text: 'Cancelar', style: 'cancel'},
                {
                    text: 'Deletar', 
                    onPress: () => deleteCripto(id, setRegistros),
                },
            ]
        );
    };

    return (
       <View style={styles.container}>
            <FlatList   
                data={registro}
                keyExtractor={(item) => item.codigo.toString()}
                renderItem={({item}) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemText}>
                            Cripto: {item.sigla} - Sigla: {item.nome}
                        </Text>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.deleteButton]}
                                onPress={() => handleDelete(item.codigo)}
                            >
                                <Icon name="trash" size={20} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.editButton]}
                                onPress={() => navigation.navigate('Alterar', {cripto:item})}
                            >
                                <Icon name="edit" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <FloatingActionButton
                onPress={() => navigation.navigate('Cadastro')}
                Icon="plus"
            />
       </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 6,
    },
    itemText: {
        marginBottom: 8,
        fontSize: 14,
        color: '#333',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 4,
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
    },
    editButton: {
        backgroundColor: '#3498db',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});