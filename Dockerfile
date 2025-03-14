# Usar una imagen base de Node.js
FROM node:18

# Crear y definir el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto al contenedor
COPY . .

# Exponer el puerto que usa Vite (por defecto es 5173)
EXPOSE 5173

# Comando por defecto para iniciar el servidor de Vite
CMD ["npm", "run", "dev"]
