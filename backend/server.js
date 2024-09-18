const express = require("express");
const cors = require('cors');
const { Server } = require("socket.io");  // Serveur WebSocket pour la communication en temps réel
const http = require("http");
const FastSpeedTest = require("fast-speedtest-api");
require("dotenv").config();

const PORT = 4000;

const app = express();

// Middleware CORS pour permettre les requêtes depuis le domaine concerné
app.use(cors({
    origin: 'http://localhost:3000',  // Autorise uniquement les requêtes venant de cette URL
    methods: ['GET', 'POST', 'DELETE'] // Méthodes HTTP autorisées
}));

// Création du serveur HTTP
const server = http.createServer(app);

// Initialisation du serveur WebSocket avec Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Permet la communication WebSocket avec ce domaine
        methods: ["GET", "POST", "DELETE"]
    }
});

// Configuration de fastSpeed
let speedtest = new FastSpeedTest({
    token: process.env.FAST_SPEED_TOKEN,
    verbose: false,
    timeout: 5000,
    https: true
});

function convertToMbps(data)
{
    return (data * 8) / 1e6;
}
// Génération de donnée fictive
async function getNetworkSpeed() {
    try {
        const downloadSpeed = await speedtest.getSpeed(); // récupère la vitesse de téléchargement en bytes depuis fast.com
        const uploadSpeed = downloadSpeed * (0.2 + Math.random() * 0.2); // Estimation fictive de l'upload basé sur la vitesse de téléchargement
        const connectionSpeed = downloadSpeed * (0.5 + Math.random() * 0.5); // Estimation de la vitesse de connexion totale

        return {
            connectionSpeed : convertToMbps(connectionSpeed),
            downloadSpeed : convertToMbps(downloadSpeed),
            uploadSpeed : convertToMbps(uploadSpeed),
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des données réseau : ", error);
        return null;
    }
}

// Gestion des événements de connexion et de déconnexion des clients WebSocket
io.on('connection', (socket) => {
    console.log('Nouveau client connecté');  // Log lorsque le client se connecte

    // Envoi de données fictives sur la vitesse de réseau toutes les 1 secondes
    const t = setInterval(async () => {
        const data = await getNetworkSpeed();
        if (data) {
            socket.emit('networkData', data);
        } 
    }, 5000);

    // Lorsque le client se déconnecte
    socket.on('disconnect', () => {
        clearInterval(t);  // Arrête l'envoi des données
        console.log('Client déconnecté'); // Log lorsque le client se déconnecte
    });
});

server.listen(PORT, () => {
    console.log(`En écoute sur http://localhost:${PORT}`);
});
