import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';

const OSMMapView = ({center, zoom, markers = [], style}) => {
  const {width, height} = Dimensions.get('window');
  const webViewRef = useRef(null);

  // Generate the map URL with dynamic bounding box
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    center.longitude - 0.05
  }%2C${center.latitude - 0.05}%2C${center.longitude + 0.05}%2C${
    center.latitude + 0.05
  }&layer=mapnik&zoom=${zoom || 15}`;

  // Function to inject markers into the WebView
  const injectMarkers = () => {
    // Generate marker script dynamically
    const markerScript = markers
      .map(
        marker => `
        L.marker([${marker.latitude}, ${marker.longitude}])
          .addTo(map)
          .bindPopup('<b>${marker.title}</b><br>${marker.description}');
      `,
      )
      .join('');

    // Inject the map initialization and markers
    const injectScript = `
      <script>
        var map = L.map('map').setView([${center.latitude}, ${
      center.longitude
    }], ${zoom || 15});
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        ${markerScript}
      </script>
    `;
    return injectScript;
  };

  useEffect(() => {
    // Inject markers once the map has loaded and markers change
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(injectMarkers());
    }
  }, [markers, center, zoom]); // Ensure markers, center, and zoom updates trigger JavaScript injection

  return (
    <View style={[styles.container, style]}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{uri: mapUrl}}
        style={{width, height}}
        javaScriptEnabled={true} // Enable JavaScript for the WebView
        injectedJavaScriptBeforeContentLoaded={injectMarkers()} // Inject script before content loads
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
