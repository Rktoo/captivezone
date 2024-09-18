
export type dataType = {
    title : string,
    description : string
}
export const data : dataType[]= [
    {
        title : "Vitesse de connexion",
        description : "Il s'agit de la vitesse maximale théorique à laquelle votre appareil peut se connecter à Internet. Elle est mesurée en mégabits par seconde (Mbps). Cette valeur représente la bande passante totale disponible pour toutes les activités en ligne, que ce soit pour le téléchargement ou le téléversement."
    },
    {
        title : "Taux de téléchargement (Download Speed)",
        description : "Le taux de téléchargement correspond à la vitesse à laquelle des données sont transférées d'Internet vers votre appareil. Elle est mesurée en mégabits par seconde (Mbps) et affecte des activités comme le streaming de vidéos, la navigation sur le web, ou le téléchargement de fichiers. Plus cette valeur est élevée, plus le chargement des données est rapide."
    },
    {
        title : "Taux de téléversement (Upload Speed) ",
        description : "Le taux de téléversement est la vitesse à laquelle des données sont envoyées depuis votre appareil vers Internet. Elle est aussi mesurée en mégabits par seconde (Mbps) et est importante pour des actions comme l'envoi de fichiers, la participation à des vidéoconférences, ou l'envoi d'emails avec des pièces jointes. Un taux de téléversement élevé permet des transferts de données plus rapides vers le web."
    },
]