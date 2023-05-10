plugins {
    id("java")
    kotlin("jvm") version "1.8.0"
    id("org.jetbrains.kotlin.plugin.jpa") version "1.8.0"

    id("io.spring.dependency-management") version "1.1.0"
    id("org.springframework.boot") version "2.7.10" apply false
}

repositories {
    mavenCentral()
}

dependencies {
    // spring
    implementation("org.springframework.boot:spring-boot-starter-web")
    // kotlin
    implementation("org.jetbrains.kotlin:kotlin-stdlib:1.8.20")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.8.20")
    implementation("org.jetbrains.kotlin:kotlin-noarg:1.8.20")
    // jpa
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc")
    // lombok
    implementation("org.projectlombok:lombok:1.18.20")
    // gson
    implementation("com.google.code.gson:gson:2.8.9")
    // JDBC Driver
    implementation("com.microsoft.sqlserver:mssql-jdbc:11.2.0.jre17")
    // Flyway DB Migration
    implementation("org.flywaydb:flyway-core:7.15.0")
    // slf4j
    implementation("ch.qos.logback:logback-core:1.4.0")
    implementation("org.slf4j:slf4j-api:2.0.3")
    implementation("org.slf4j:slf4j-simple:2.0.3")
    //swagger
    implementation("io.springfox:springfox-swagger-ui:2.9.2")
    implementation("io.springfox:springfox-swagger2:2.9.2")
}

allprojects {
    group = "org.meeting.reservation"
    // Kotlin jvm
    apply(plugin = "kotlin")
    // Spring Boot dependency management
    apply(plugin = "io.spring.dependency-management")
    // Spring Boot
    apply(plugin = "org.springframework.boot")

    // Exclude the following dependencies from whole project
    configurations {
        all {
            exclude(group = "org.springframework.boot", module = "spring-boot-starter-logging")
            exclude(group = "org.springframework.boot", module = "spring-boot-starter-tomcat")
            exclude(group = "org.springframework.boot", module = "spring-boot-starter-json")
        }
    }

    tasks.withType(org.jetbrains.kotlin.gradle.tasks.KotlinCompile::class) {
        kotlinOptions {
            jvmTarget = project.properties["project.version.jvm"] as String
        }
    }
}

kotlin {
    jvmToolchain {
        languageVersion.set(JavaLanguageVersion.of(project.properties["project.version.jvm"] as String))
    }
}

