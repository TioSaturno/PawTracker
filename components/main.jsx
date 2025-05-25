import * as React from 'react';
import { StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export function Main() {
   const insets = useSafeAreaInsets(); 
   const [DogLocation, SetDogLocation] = React.useState({
    latitude: -33.512863,
    longitude: -70.597444   
   })
   /*const [isConected, SetIsConected] = React.useState(true);
   const navigation = useNavigation()
   useEffect(() => {
    const db= getFireStore();
    const locationRef = collection (db, "locations")
    const q = query(locationRef, orderby ("timestamp", "desc"), limit(1));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if(!querySnapshot.empty) {
        const locationData = querySnapshot.docs[0].data();
        SetDogLocation({
          latitude: locationData.latitude,
          longitude: locationData.longitude
        })
        SetIsConected(locationData.isConected)
      }
    })
    return () => unsubscribe();
  }, []);
  */
 //Todo esto sera cuando firestore este integrado
  return ( 
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom}}> 
      <MapView
      style ={styles.map}
        initialRegion={{
            latitude: DogLocation.latitude, 
            longitude: DogLocation.longitude,
            longitudeDelta: 0.01,
            latitudeDelta: 0.01
        }}  
      /> 
      <Marker
        coordinate={DogLocation}
        title={"Tu perro"}
        //description={isConected ? "Conectado a Wifi" : "Usando GPS"}
        pinColor={"blue"}></Marker>
    </View>
  );
}


const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  }
}); 
