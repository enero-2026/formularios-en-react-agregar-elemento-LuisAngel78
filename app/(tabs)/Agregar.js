import { View } from "react-native";
import { useState, useEffect } from "react";
import { TextInput, Text, Button, Modal } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ModalAgregarAlumno({ visible, onDismiss, onGuardar, error, alumnoEditando }) {
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaMatricula, setNuevaMatricula] = useState('');

  useEffect(() => {
    if (alumnoEditando) {
      setNuevoNombre(alumnoEditando.nombre);
      setNuevaMatricula(alumnoEditando.matricula);
    } else {
      setNuevoNombre('');
      setNuevaMatricula('');
    }
  }, [alumnoEditando, visible]);

  const handleGuardar = () => {
    if (nuevoNombre.trim() && nuevaMatricula.trim()) {
      onGuardar({ nombre: nuevoNombre.toUpperCase(), matricula: nuevaMatricula });
      setNuevoNombre('');
      setNuevaMatricula('');
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      contentContainerStyle={{
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 12,
        padding: 24,
        gap: 12,
      }}
    >
      <Text variant="headlineSmall">
        {alumnoEditando ? 'Editar Alumno' : 'Agregar Alumno'}
      </Text>

      <TextInput
        label="Nombre completo"
        mode="outlined"
        value={nuevoNombre}
        onChangeText={setNuevoNombre}
        left={<TextInput.Icon icon={() => <MaterialIcons name="person" size={24} color="#000" />} />}
      />

      <TextInput
        label="Matrícula"
        mode="outlined"
        keyboardType="numeric"
        value={nuevaMatricula}
        onChangeText={setNuevaMatricula}
        error={!!error}
        left={<TextInput.Icon icon={() => <MaterialIcons name="badge" size={24} color="#000" />} />}
      />

      {error ? (
        <Text style={{ color: 'red', fontSize: 12 }}>{error}</Text>
      ) : null}

      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
        <Button mode="outlined" onPress={onDismiss}>Cancelar</Button>
        <Button mode="contained" onPress={handleGuardar}>Guardar</Button>
      </View>
    </Modal>
  );
}