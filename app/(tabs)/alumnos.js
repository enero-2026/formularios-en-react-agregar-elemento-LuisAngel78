import { ScrollView, View } from "react-native";
import { useEffect, useState } from "react";
import { List, TextInput, Text, Button, Portal, PaperProvider, MD3LightTheme } from 'react-native-paper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ModalAgregarAlumno from './Agregar';

export default function Alumnos() {
  const [visible, setVisible] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setAlumnoEditando(null);
  };
  const [errorMatricula, setErrorMatricula] = useState('');
  const [alumnos, setAlumnos] = useState([]);
  const [buscaAlumno, setBuscaAlumno] = useState('');
  const [expandido, setExpandido] = useState(null);
  const [ordenar, setOrdenar] = useState('apellido');

  const alumnosOrdenados = alumnos
    .filter((a) =>
      a.nombre.toLowerCase().includes(buscaAlumno.toLowerCase()) ||
      a.matricula.includes(buscaAlumno)
    )
    .sort((a, b) => {
      if (ordenar === 'nombre') {
        return a.nombre.split(' ').at(2).localeCompare(b.nombre.split(' ').at(2));
      } else {
        return a.nombre.split(' ')[0].localeCompare(b.nombre.split(' ')[0]);
      }
    });

  useEffect(() => {
    setTimeout(() => {
      setAlumnos([
        { nombre: 'CANDELARIA MORA SAMANTHA', matricula: '2114354' },
        { nombre: 'CANTU SILVA JAVIER', matricula: '2111889' },
        { nombre: 'CARMONA LOZANO ANGEL EMILIANO', matricula: '2069119' },
        { nombre: 'CASTILLO ACOSTA JORGE', matricula: '2132842' },
        { nombre: 'DAVILA GONZALEZ ALDO ADRIAN', matricula: '1994122' },
        { nombre: 'DURAN BARRIENTOS FABRIZIO', matricula: '2018230' },
        { nombre: 'FLORES GONZALEZ SEBASTIAN', matricula: '2104564' },
        { nombre: 'FLORES LÓPEZ DIEGO', matricula: '2066033' },
        { nombre: 'FLORES MARTINEZ ERICK ADRIAN', matricula: '2132976' },
        { nombre: 'GARZA AVALOS DIEGO', matricula: '2066114' },
        { nombre: 'GONZALEZ OVALLE CHRISTIAN GABRIEL', matricula: '2031243' },
        { nombre: 'MARTINEZ ELIAS ANGEL SEBASTIAN', matricula: '2064733' },
        { nombre: 'MENDIETA GONZALEZ ESMERALDA GABRIELA', matricula: '2094647' },
        { nombre: 'MIRELES VELAZQUEZ ALEJANDRO', matricula: '2005102' },
        { nombre: 'MONSIVAIS SALAZAR ANDRES', matricula: '2064574' },
        { nombre: 'PARRAZALEZ VALDESPINO MARTHA JULIETA', matricula: '2024783' },
        { nombre: 'PEÑA MUNGARRO LUIS ANGEL', matricula: '2066077' },
        { nombre: 'PUENTE REYNOSO JULIO CESAR', matricula: '2092151' },
        { nombre: 'RAMIREZ LOPEZ BRYAN', matricula: '2103708' },
        { nombre: 'RAMOS AVILA LILIANA VALERIA', matricula: '2115192' },
        { nombre: 'RICO JAUREGUI MAURICIO', matricula: '2037503' },
        { nombre: 'RIVERA LUNA ADRIAN', matricula: '2131513' },
        { nombre: 'RODRIGUEZ OLVERA ROSA ISELA', matricula: '2004613' },
        { nombre: 'RODRIGUEZ RODRIGUEZ ANGEL AZAEL', matricula: '2133022' },
        { nombre: 'SANCHEZ GALARZA JUAN CARLOS', matricula: '2026061' },
        { nombre: 'SOLIS ORTIZ ALFREDO', matricula: '2095320' },
        { nombre: 'VELAZQUEZ ABREGO HERWIN DANIEL', matricula: '2025350' },
        { nombre: 'VILLAGRA RODRIGUEZ ANDRES NEHUEL', matricula: '2103895' },
        { nombre: 'ZACATENCO OLIVE RODRIGO', matricula: '1857791' },
        { nombre: 'ZAVALA CANTU TERESA MARGARITA', matricula: '2025218' },
      ]);
    }, 2000);
  }, []);

  if (!alumnos.length) {
    return <Text>Cargando alumnos...</Text>;
  }

  return (
    <PaperProvider theme={MD3LightTheme}>
      <TextInput
        label="Buscar alumno..."
        value={buscaAlumno}
        onChangeText={setBuscaAlumno}
        right={<TextInput.Icon icon={() => <MaterialIcons name="search" size={24} color="#000" />} />}
      />

      <List.Section>
        <List.Accordion
          title="Ordenar"
          left={() => <MaterialIcons name="sort" size={24} color="#000" style={{ marginLeft: 8 }} />}>
          <List.Item
            title="Por Nombre"
            left={() => <MaterialIcons name="sort-by-alpha" size={24} color="#000" style={{ marginLeft: 8 }} />}
            onPress={() => setOrdenar('nombre')} />
          <List.Item
            title="Por Apellido"
            left={() => <MaterialIcons name="sort-by-alpha" size={24} color="#000" style={{ marginLeft: 8 }} />}
            onPress={() => setOrdenar('apellido')} />
        </List.Accordion>

        <List.Accordion
          title="Manejo de Alumnos"
          left={() => <MaterialIcons name="manage-accounts" size={24} color="#000" style={{ marginLeft: 8 }} />}>
          <List.Item
            title="Agregar Alumno"
            left={() => <MaterialIcons name="person-add" size={24} color="#000" style={{ marginLeft: 8 }} />}
            onPress={showModal} />
        </List.Accordion>
      </List.Section>

      <Portal>
        <ModalAgregarAlumno
          visible={visible}
          alumnoEditando={alumnoEditando}
          onDismiss={() => {
            setErrorMatricula('');
            hideModal();
          }}
          error={errorMatricula}
          onGuardar={(nuevoAlumno) => {
            if (alumnoEditando) {
              setAlumnos(alumnos.map(a =>
                a.matricula === alumnoEditando.matricula ? nuevoAlumno : a
              ));
            } else {
              if (alumnos.some(a => a.matricula === nuevoAlumno.matricula)) {
                setErrorMatricula('Ya existe un alumno con esa matrícula.');
                return;
              }
              setAlumnos([...alumnos, nuevoAlumno]);
            }
            setErrorMatricula('');
            hideModal();
          }}
        />
      </Portal>

      <ScrollView>
        <List.Section title="Alumnos">
          {alumnosOrdenados.map((alumno) => (
            <List.Accordion
              key={alumno.matricula}
              title={alumno.nombre}
              left={() => <MaterialIcons name="account-circle" size={40} color="#000" style={{ marginLeft: 8 }} />}
              expanded={expandido === alumno.matricula}
              onPress={() => setExpandido(expandido === alumno.matricula ? null : alumno.matricula)}
            >
              <List.Item
                title="Matrícula"
                description={alumno.matricula}
                left={() => <MaterialIcons name="badge" size={24} color="#000" style={{ marginLeft: 8 }} />}
              />
              <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
                <Button
                  mode="contained"
                  icon={() => <MaterialIcons name="edit" size={18} color="#fff" />}
                  onPress={() => {
                    setAlumnoEditando(alumno);
                    setVisible(true);
                  }}
                >
                  Editar
                </Button>
              </View>
            </List.Accordion>
          ))}
        </List.Section>
      </ScrollView>
    </PaperProvider>
  );
}