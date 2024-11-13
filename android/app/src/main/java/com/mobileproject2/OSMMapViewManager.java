package com.mobileproject2;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import org.osmdroid.config.Configuration;
import org.osmdroid.util.GeoPoint;
import org.osmdroid.views.MapView;
import org.osmdroid.views.overlay.Marker;

public class OSMMapViewManager extends SimpleViewManager<MapView> {
    public static final String REACT_CLASS = "OSMMapView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected MapView createViewInstance(ThemedReactContext reactContext) {
        Context context = reactContext.getApplicationContext();
        Configuration.getInstance().setUserAgentValue(context.getPackageName());

        MapView mapView = new MapView(context);
        mapView.getController().setZoom(15.0); // Default zoom level
        return mapView;
    }

    @ReactProp(name = "center")
    public void setCenter(MapView view, ReadableMap center) {
        double latitude = center.getDouble("latitude");
        double longitude = center.getDouble("longitude");
        view.getController().setCenter(new GeoPoint(latitude, longitude));
    }

    @ReactProp(name = "zoom")
    public void setZoom(MapView view, double zoom) {
        view.getController().setZoom(zoom);
    }

    // Expose addMarker as a React Method
    @ReactMethod
    public void addMarker(MapView mapView, double latitude, double longitude, String title) {
        try {
            Marker marker = new Marker(mapView);
            marker.setPosition(new GeoPoint(latitude, longitude));
            marker.setTitle(title);
            mapView.getOverlays().add(marker);
        } catch (Exception e) {
            // Optionally log the error or return a callback with an error message
            e.printStackTrace();
        }
    }
}
