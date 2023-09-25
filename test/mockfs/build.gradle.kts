plugins {
  id("com.android.application")
  id("kotlin-android")
}

android {
  namespace = "io.ionic.starter"
  compileSdk = 34

  defaultConfig {
    applicationId = "io.ionic.starter"
    minSdk = 23
    targetSdk = 34
    versionCode = 1
    versionName = "0.0.1"
    multiDexEnabled = true
    testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    androidResources {
      ignoreAssetsPattern =
        "!.idea:!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~"
    }
  }

  buildTypes {
    named("release") {
      isMinifyEnabled = false
      proguardFiles(getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro")
    }
  }

  compileOptions {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
  }

  kotlinOptions {
    jvmTarget = "17"
  }

  buildFeatures {
    viewBinding = true
  }
  buildToolsVersion = "34.0.0"
}

repositories {
  flatDir {
    dirs("../capacitor-cordova-android-plugins/src/main/libs", "libs")
  }
}

dependencies {
  //  Android
  implementation("androidx.annotation:annotation:1.7.0")
  implementation("androidx.appcompat:appcompat:1.6.1")
  implementation("androidx.coordinatorlayout:coordinatorlayout:1.2.0")
  implementation("androidx.core:core-ktx:1.12.0")
  implementation("androidx.core:core-splashscreen:1.0.1")
  implementation("androidx.work:work-runtime:2.8.1")

  //  Capacitor
  implementation(project(":capacitor-android"))
  implementation(project(":capacitor-cordova-android-plugins"))

  // Testing dependencies
  testImplementation("junit:junit:4.13.2")
  androidTestImplementation("androidx.test.ext:junit:1.1.5")
  androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
}

apply(from = "capacitor.build.gradle")
apply(plugin = "org.jetbrains.kotlin.android")

try {
  val servicesJSON = File("google-services.json")
  if (servicesJSON.isFile) {
    apply(plugin = "com.google.gms.google-services")
  }
} catch (e: Exception) {
  logger.info("google-services.json not found, google-services plugin not applied. Push Notifications won't work")
}
