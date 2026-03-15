import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Heatmap, Marker } from "react-native-maps";

import { colors, radius, shadow } from "../utils/theme";

export const defaultRegion = {
  latitude: 28.6139,
  longitude: 77.209,
  latitudeDelta: 0.0522,
  longitudeDelta: 0.0421,
};

export default function MapComponent({
  region = defaultRegion,
  markers = [],
  heatmapPoints = [],
  onMarkerPress,
}) {
  return (
    <View style={styles.wrapper}>
      <MapView style={styles.map} initialRegion={region} region={region}>
        {heatmapPoints.length > 0 ? (
          <Heatmap
            points={heatmapPoints}
            opacity={0.7}
            radius={45}
            gradient={{
              colors: ["#16a34a", "#facc15", "#dc2626"],
              startPoints: [0.2, 0.55, 1],
              colorMapSize: 256,
            }}
          />
        ) : null}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            pinColor={marker.color}
            onPress={() => onMarkerPress?.(marker)}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 280,
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow,
  },
  map: {
    flex: 1,
  },
});
