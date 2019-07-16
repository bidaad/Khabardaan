package com.khabardaan;

import android.app.Application;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import cl.json.RNSharePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import cl.json.ShareApplication;
import com.facebook.react.modules.i18nmanager.I18nUtil; //<== AmerllicA config
import com.oblador.vectoricons.VectorIconsPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      //@SuppressWarnings("UnnecessaryLocalVariable")
      //List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      //return packages;
      return new PackageList(this).getPackages();
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance(); //<== AmerllicA config
    sharedI18nUtilInstance.forceRTL(this, true); //<== AmerllicA config
    sharedI18nUtilInstance.allowRTL(this, true); //<== AmerllicA config

    SoLoader.init(this, /* native exopackage */ false);
  }
}
