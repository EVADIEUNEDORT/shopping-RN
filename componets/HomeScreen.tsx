import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, Modal, Pressable, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Obtenir les dimensions de l'écran
const { width, height } = Dimensions.get('window');

// Définir une interface pour les catégories
interface Category {
  id: string;
  title: string;
  image: any; // Type 'any' pour le require d'une image locale
}

const categories: Category[] = [
  { id: '1', title: 'Vêtements', image: require('../assets/clothes.jpg') },
  { id: '2', title: 'Électronique', image: require('../assets/electronics.jpg') },
  { id: '3', title: 'Accessoires', image: require('../assets/accessories.jpg') },
];

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false); // Pour gérer la visibilité du modal
  const [selectedImage, setSelectedImage] = useState<any>(null); // Pour stocker l'image sélectionnée
  const [searchText, setSearchText] = useState(''); // Gérer le texte de recherche

  // Fonction pour gérer le texte de recherche
  const handleSearch = (text: string) => {
    setSearchText(text);
    // Vous pouvez ajouter la logique de filtrage ou de recherche ici
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        setSelectedImage(item.image); // Définir l'image sélectionnée
        setModalVisible(true); // Afficher le modal
      }}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />

        {/* Barre de recherche avec une icône */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Rechercher des produits..."
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Bienvenue dans notre Boutique !</Text>

      {/* Section des catégories */}
      <Text style={styles.sectionTitle}>Catégories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />

      {/* Modal pour afficher l'image en plein écran */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // Fermer le modal en appuyant sur retour
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </Pressable>
          {selectedImage && (
            <Image source={selectedImage} style={styles.fullScreenImage} />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e1', // Fond rose clair
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Ajustement du padding-top selon la plateforme
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    paddingVertical: 15,
    width: width,
    height: height * 0.1, // 10% de la hauteur de l'écran
    paddingTop:25,
  },
  logo: {
    width: width * 0.25, // 25% de la largeur de l'écran
    height: height * 0.05, // 5% de la hauteur de l'écran
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 10,
    height: height * 0.05, // Même hauteur que les icônes
    marginBottom: height * 0.01,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  title: {
    fontSize: width * 0.06, // Police en fonction de la largeur de l'écran
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.02, // Marge en fonction de la hauteur de l'écran
  },
  sectionTitle: {
    fontSize: width * 0.05, // Ajustement de la taille du texte selon l'écran
    fontWeight: 'bold',
    marginVertical: height * 0.02, // Marge verticale relative à la hauteur de l'écran
    textAlign: 'left',
    paddingLeft: 20,
  },
  categoriesList: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: width * 0.3, // Largeur relative à la taille de l'écran
    height: height * 0.18, // Hauteur relative à la taille de l'écran
  },
  categoryImage: {
    width: '100%',
    height: '75%',
    borderRadius: 10,
  },
  categoryTitle: {
    marginTop: 5,
    fontSize: width * 0.035, // Police ajustée en fonction de la taille de l'écran
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)', // Fond semi-transparent
  },
  fullScreenImage: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default HomeScreen;
