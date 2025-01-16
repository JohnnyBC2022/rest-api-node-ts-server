Para la configuración inicial instalo:
npm i -D ts-node
npm i -D tsx
npm i -D typescript
npm i -D nodemon

Además, con este tsconfig.json me funciona todo correctamente al inicio:
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "lib": ["ESNext"],
    "sourceMap": true,
    "declaration": true
  },
  "include": ["src/**/*.ts"]
}
