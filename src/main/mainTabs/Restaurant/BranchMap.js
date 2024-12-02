import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import OSMMapView from './OSMMapView'; // Import your OSMMapView component
import {getBrands} from '../../../apiClient';
import colors from '../../../../assets/colors';
import {useNavigation} from '@react-navigation/native';

const BranchMap = () => {
  const [branchList, setBranchList] = useState([]); // Initialize branch list state
  const [loading, setLoading] = useState(true); // Loading state to check if data is still being fetched
  const userCoordinates = {longitude: 106.5897225, latitude: 10.6817772}; // Example user coordinates
  const [selectedBranchId, setSelectedBranchId] = useState(null); // Track selected branch
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch nearest branches
    const fetchNearestBranch = async () => {
      try {
        const data = await getBrands();
        console.log('GET From API:', data); // Check if data is correct
        setBranchList(data); // Update the branch list with data from the API
      } catch (error) {
        console.error('Failed to fetch nearest branch:', error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched or error occurs
      }
    };

    fetchNearestBranch();
  }, []); // Empty array to run once after initial render

  const handleItemPress = branchId => {
    console.log('Item Pressed:', branchId); // Debugging: check if the item is correctly pressed
    // Toggle the selection state
    setSelectedBranchId(prevId => (prevId === branchId ? null : branchId));
  };

  const renderBranchItem = ({item}) => {
    const isSelected = item._id === selectedBranchId; // Check if the item is selected

    return (
      <TouchableOpacity
        style={[
          styles.branchContainer,
          isSelected && styles.selectedBranch, // Apply selected style
        ]}
        onPress={() => {
          handleItemPress(item._id); // Mark the branch when pressed
        }}
        activeOpacity={0.7} // Optional: gives a slight opacity change on press
      >
        <View style={styles.imageView}>
          <Image source={{uri: item.image}} style={styles.branchImage} />
        </View>
        <View style={{flex: 1, marginLeft: 15}}>
          <Text style={styles.nameV}>{item.name}</Text>
          <Text style={styles.addressV}>{item.address}</Text>
          <Text style={styles.addressV}>{item.review} reviews</Text>
          {/* Display coordinates */}
        </View>
      </TouchableOpacity>
    );
  };

  console.log(branchList);
  const selectedBranch = branchList.find(
    branch => branch._id === selectedBranchId,
  ); // Find the selected branch

  return (
    <View style={styles.container}>
      <OSMMapView
        style={styles.map} // Take up 2/3 of the screen space
        center={
          userCoordinates // Fallback to user coordinates if no branch is selected
        }
        zoom={15} // Set initial zoom level
      ></OSMMapView>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" /> // Show a loading spinner while fetching
        ) : (
          <FlatList
            data={branchList}
            keyExtractor={item => item._id} // Use unique id for keyExtractor
            renderItem={renderBranchItem}
            ListEmptyComponent={<Text>No branches available</Text>} // Display a message if no branches
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeBtnContainer}>
        <Image
          style={styles.closeBtn}
          source={require('../../../../assets/images/icons/Xicon.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BranchMap;

const styles = StyleSheet.create({
  addressV: {
    fontSize: 13,
    color: 'black',
    fontWeight: '400',
  },
  nameV: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  closeBtn: {
    width: 13,
    height: 13,
    resizeMode: 'contain',
  },
  closeBtnContainer: {
    width: 30,
    height: 30,
    borderRadius: 5,
    position: 'absolute',
    right: 5,
    top: 5,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.orange1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {
    flex: 2,
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopEndRadius: 20, // Optional: make the list background white for clarity
  },
  branchContainer: {
    flexDirection: 'row',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  imageView: {
  
  },
  branchImage: {
    width: 50,
    height: 50,
    borderRadius: 15,

  },
  selectedBranch: {
    backgroundColor: '#d3f4d1', // Highlight selected branch with color
    borderWidth: 2, // Optional: add border to selected item
    borderColor: '#2c8c4f', // Optional: add border color
  },
});
