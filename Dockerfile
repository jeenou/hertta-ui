FROM node:14 AS frontend-builder

# Set working directory
WORKDIR /frontend

# Copy frontend source code
COPY frontend/package.json frontend/yarn.lock ./
COPY frontend/public ./public
COPY frontend/src ./src

# Install dependencies and build the React app
RUN yarn install && yarn build

# Stage 2: Build the Rust backend
FROM rust:1.56 AS backend-builder

# Set working directory
WORKDIR /backend

# Copy backend source code
COPY backend/Cargo.toml ./
COPY backend/src ./src

# Build the Rust app
RUN cargo build --release

# Stage 3: Create the final image
FROM alpine:3.13

# Install dependencies
RUN apk add --no-cache bash nginx

# Copy built frontend
COPY --from=frontend-builder /frontend/build /usr/share/nginx/html

# Copy built backend
COPY --from=backend-builder /backend/target/release/backend /usr/local/bin/backend

# Copy run script
COPY run.sh /run.sh
RUN chmod +x /run.sh

# Expose port
EXPOSE 80

# Run the start script
CMD [ "/run.sh" ]
