import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

const OSMMapView = ({center, zoom, style}) => {
  const {width, height} = Dimensions.get('window');
  const webViewRef = useRef(null);

  // Generate the map URL with dynamic bounding box
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    center.longitude - 0.05
  }%2C${center.latitude - 0.05}%2C${center.longitude + 0.05}%2C${
    center.latitude + 0.05
  }&layer=mapnik&zoom=${zoom || 15}`;

  // Function to inject markers into the WebView

  return (
    <View style={[styles.container, style]}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{uri: mapUrl}}
        style={{width, height}}
        javaScriptEnabled={true} // Enable JavaScript for the WebView
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OSMMapView;
