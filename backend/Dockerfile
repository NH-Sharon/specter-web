# ---- Build stage ----
FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline -q

COPY src ./src
RUN mvn package -DskipTests -q

# ---- Runtime stage ----
FROM eclipse-temurin:21-jre-alpine

RUN addgroup -S specter && adduser -S specter -G specter
WORKDIR /app

COPY --from=builder /build/target/specter-api-*.jar app.jar

RUN chown specter:specter app.jar
USER specter

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
