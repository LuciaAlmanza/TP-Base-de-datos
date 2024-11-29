# TP-Base-de-datos 

## Integrantes  
- Cardoso Landaburu Juan Gabriel 110845
- Almanza Lucia 110598
- Ariel Folgueira 109473
- Nombre 4  

---

## Descripción del Proyecto  
Este proyecto es una aplicación web diseñada para gestionar entradas de cine y comentarios de usuarios, integrando bases de datos relacionales (MySQL) y NoSQL (Firebase Firestore). La aplicación incluye funcionalidades CRUD completas para ambas bases de datos y fue desarrollada como parte de un trabajo práctico para comprender las diferencias entre estos paradigmas de bases de datos.  

---

## **Requisitos Previos**  
Antes de comenzar, asegúrate de tener instalado:  
- npm instalado. Si no, instálalo con:
  ```
  sudo apt install nodejs npm
  ```
- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
  ```
  curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt install nodejs
  ```
- [MySQL](https://www.mysql.com/) (servidor local o remoto)
  ```
  sudo apt install mysql-server
  sudo systemctl start mysql
  sudo systemctl enable mysql
  ```
- Una cuenta de [Firebase](https://firebase.google.com/) con un proyecto configurado  
---

## Instalar dependencias
En la carpeta raíz del proyecto, se debe de ejecutar el siguiente comando para instalar todas las dependencias necesarias:
```
npm install
```

## Iniciar servidor
En la carpeta Backend ejecutar el siguiente comando:
```
npm run server
```

## Iniciar la aplicación en el navegador
Luego en la carpeta raiz ejecutar el siguiente comando:
```
npm start
```
