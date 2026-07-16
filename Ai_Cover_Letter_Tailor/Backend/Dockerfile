# ==========================================
# STAGE 1: Build and compile the application
# ==========================================
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy only pom.xml first to cache dependencies (improves build speed)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the source code and compile the jar (skipping unit tests for deployment speed)
COPY src ./src
RUN mvn clean package -DskipTests

# ==========================================
# STAGE 2: Create the lightweight runtime image
# ==========================================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the compiled JAR from Stage 1
COPY --from=build /app/target/*.jar app.jar

# Expose the dynamic port (Render will bind to this)
EXPOSE 8080

# Run the application with optimized memory settings
ENTRYPOINT ["java", "-jar", "app.jar"]