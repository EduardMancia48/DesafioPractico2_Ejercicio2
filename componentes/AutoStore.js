import React, { Component } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

class AutoStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientes: [],
      nombre: '',
      tipoVehiculo: '',
      placa: '',
      color: '',
      ano: '',
      marca: '',
      servicio: '',
      costoServicio: 0,
      propina: 0,
      impuesto: 0,
      totalPago: 0,
      modalVisible: false,
    };
  }

  calcularCostoTotal = () => {
    const { servicio, tipoVehiculo } = this.state;

    const precios = {
      'Lavado Básico': { 'Motocicleta': 2.00, 'Carro sedán': 3.00, 'Camioneta': 4.00, 'Microbús': 5.00, 'Bus': 6.00 },
      'Lavado Premium': { 'Motocicleta': 2.50, 'Carro sedán': 3.50, 'Camioneta': 4.50, 'Microbús': 5.50, 'Bus': 6.50 },
      'Lavado VIP': { 'Motocicleta': 3.00, 'Carro sedán': 4.00, 'Camioneta': 5.00, 'Microbús': 6.00, 'Bus': 7.00 },
      'Polarizado': { 'Carro sedán': 25.00, 'Camioneta': 35.00, 'Microbús': 45.00, 'Bus': 60.00 }
    };

    // Obtener el costo del servicio basado en el tipo de servicio y tipo de vehículo seleccionado
    const costo = precios[servicio] && precios[servicio][tipoVehiculo] ? precios[servicio][tipoVehiculo] : 0;

    const propina = costo * 0.05;
    const impuesto = costo * 0.13;
    const totalPago = costo + propina + impuesto;

    this.setState({
      costoServicio: costo.toFixed(2),
      propina: propina.toFixed(2),
      impuesto: impuesto.toFixed(2),
      totalPago: totalPago.toFixed(2),
    });
  };

  mostrarModal = () => {
    this.setState({ modalVisible: true });
  };

  ocultarModal = () => {
    this.setState({ modalVisible: false });
  };

  seleccionarServicio = (servicio) => {
    this.setState({ servicio });
    this.ocultarModal();
  };

  guardarCliente = () => {
    const { clientes, nombre, tipoVehiculo, placa, color, ano, marca, servicio, totalPago } = this.state;
    const nuevoCliente = {
      id: clientes.length + 1,
      nombre,
      tipoVehiculo,
      placa,
      color,
      ano,
      marca,
      servicio,
      totalPago,
    };

    this.setState({
      clientes: [...clientes, nuevoCliente],
      nombre: '',
      tipoVehiculo: '',
      placa: '',
      color: '',
      ano: '',
      marca: '',
      servicio: '',
      costoServicio: 0,
      propina: 0,
      impuesto: 0,
      totalPago: 0,
    });
  };

  render() {
    const { clientes, nombre, tipoVehiculo, placa, color, ano, marca, servicio, costoServicio, propina, impuesto, totalPago } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>AutoStore</Text>
        <TextInput style={styles.input} placeholder="Nombre del Cliente" value={nombre} onChangeText={(text) => this.setState({ nombre: text })} />
        <TextInput style={styles.input} placeholder="Tipo de Vehículo" value={tipoVehiculo} onChangeText={(text) => this.setState({ tipoVehiculo: text })} />
        <TextInput style={styles.input} placeholder="Placa" value={placa} onChangeText={(text) => this.setState({ placa: text })} />
        <TextInput style={styles.input} placeholder="Color" value={color} onChangeText={(text) => this.setState({ color: text })} />
        <TextInput style={styles.input} placeholder="Año" value={ano} onChangeText={(text) => this.setState({ ano: text })} />
        <TextInput style={styles.input} placeholder="Marca" value={marca} onChangeText={(text) => this.setState({ marca: text })} />
        <Button title="Seleccionar Servicio" onPress={this.mostrarModal} />
        <Button title="Calcular Costo" onPress={this.calcularCostoTotal} />
        <Button title="Guardar Cliente" onPress={this.guardarCliente} />

        <View style={styles.listaContainer}>
          <Text style={styles.subtitle}>Detalle de Clientes:</Text>
          <FlatList
            data={clientes}
            renderItem={({ item }) => (
              <View style={styles.clienteItem}>
                <Text style={styles.clienteInfo}>Nombre: {item.nombre}</Text>
                <Text style={styles.clienteInfo}>Tipo de Vehículo: {item.tipoVehiculo}</Text>
                <Text style={styles.clienteInfo}>Placa: {item.placa}</Text>
                <Text style={styles.clienteInfo}>Color: {item.color}</Text>
                <Text style={styles.clienteInfo}>Año: {item.ano}</Text>
                <Text style={styles.clienteInfo}>Marca: {item.marca}</Text>
                <Text style={styles.clienteInfo}>Servicio: {item.servicio}</Text>
                <Text style={styles.clienteInfo}>Total a Pagar: ${item.totalPago}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.resumenContainer}>
          <Text style={styles.subtitle}>Resumen del Pago:</Text>
          <Text>Costo del Servicio: ${costoServicio}</Text>
          <Text>Propina: ${propina}</Text>
          <Text>Impuesto: ${impuesto}</Text>
          <Text>Total a Pagar: ${totalPago}</Text>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.ocultarModal}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <TouchableOpacity onPress={() => this.seleccionarServicio('Lavado Básico')}>
                <Text>Lavado Básico</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.seleccionarServicio('Lavado Premium')}>
                <Text>Lavado Premium</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.seleccionarServicio('Lavado VIP')}>
                <Text>Lavado VIP</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.seleccionarServicio('Polarizado')}>
                <Text>Polarizado</Text>
              </TouchableOpacity>
              <Button title="Cerrar" onPress={this.ocultarModal} />
            </ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  listaContainer: {
    flex: 1,
    marginTop: 20,
  },
  clienteItem: {
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
  },
  clienteInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resumenContainer: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default AutoStore;
