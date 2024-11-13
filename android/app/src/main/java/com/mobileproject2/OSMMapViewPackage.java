package com.mobileproject2;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.NativeModule;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class OSMMapViewPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList(); // No native modules in this package
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new OSMMapViewManager()  // Register the native view manager here
        );
    }
}
