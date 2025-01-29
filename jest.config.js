/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node", // Configura el entorno de pruebas como Node.js
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // Asegura la transformación de archivos TypeScript
  },
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)", // Busca en cualquier carpeta `__tests__`
    "**/?(*.)+(spec|test).[jt]s?(x)", // Archivos con `.spec` o `.test`
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Extensiones válidas
  testPathIgnorePatterns: [
    "/node_modules/", // Ignora `node_modules`
    "/dist/", // Ignora la carpeta `dist` (si la tienes)
  ],
};
