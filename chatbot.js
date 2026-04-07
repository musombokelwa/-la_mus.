
(function () {
    // 1. Création des styles CSS si non présents dans home.css (déjà fait dans home.css mais on assure)
    // 2. Création de la structure HTML
    const chatbotHTML = `
    <div class="chatbot-container">
        <div class="chat-window" id="chatWindow">
            <div class="chat-header">
                <h3><i class="fas fa-robot"></i> Assistant IA #la-mus</h3>
                <span id="closeChat">&times;</span>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="message bot">
                    Bonjour ! Je suis l'assistant de mus. Comment puis-je vous aider aujourd'hui ?
                </div>
            </div>
            <div class="chat-input">
                <input type="text" id="userInput" placeholder="Posez votre question...">
                <button id="sendBtn"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
        <div class="chat-bubble" id="chatBubble">
            <i class="fas fa-comment-dots"></i>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    // 3. Logique du Chatbot
    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    const botContext = {
        "qui": "Je suis mus, étudiant en Génie Informatique spécialisé en IA à l'Université de Lubumbashi. J'ai une expérience de terrain chez TEDO SARL et ACNDC.",
        "services": "Je propose : Intelligence Artificielle (Vision par ordinateur, CNN), Consulting Numérique, Analyse de Données et Développement Web Haute Performance.",
        "ia": "L'IA est au cœur de mon travail. Je développe des solutions de Vision Artificielle pour la détection d'objects et des modèles de Deep Learning prédictifs.",
        "contact": "Vous pouvez me contacter via le formulaire de contact, par email à musjosue809@gmail.com, ou par WhatsApp au +243846066283.",
        "cv": "Vous pouvez télécharger mon CV directement sur la page d'accueil.",
        "vision": "Ma vision est de transformer le potentiel technologique du Congo en réalités concrètes grâce à l'IA et l'innovation locale.",
        "projet": "Mes projets phares incluent la classification d'images via CNN et l'analyse prédictive sur de gros volumes de données.",
        "experience": "J'ai travaillé dans l'Est du Congo comme superviseur terrain et responsable communication, ce qui m'a donné une vision pragmatique de la technologie.",
        "dit nous vous fait quoi": "développe des models ai et des outis et des logiciel et des application je connais programmer des application "
    };

    const toggleChat = () => chatWindow.classList.toggle('active');

    chatBubble.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    const addMessage = (text, type) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', type);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    const getBotResponse = (input) => {
        input = input.toLowerCase();
        let response = "Désolé, je ne comprends pas tout à fait. Pouvez-vous reformuler ? Vous pouvez me poser des questions sur mes services, mon parcours, ou comment me contacter.";

        if (input.includes("salut") || input.includes("bonjour") || input.includes("hello") ||
            input.includes("jambo")) {
            response = "hey je désolé tu peux m'explique ton projet  ?";
        } else if (input.includes("qui") || input.includes("es-tu") || input.includes("mus")) {
            response = botContext.qui;
        } else if (input.includes("service") || input.includes("fait") || input.includes("offre")) {
            response = botContext.services;
        } else if (input.includes("ia") || input.includes("intelligence") || input.includes("deep") || input.includes("cnn")) {
            response = botContext.ia;
        } else if (input.includes("contact") || input.includes("mail") || input.includes("joindre") || input.includes("whatsapp")) {
            response = botContext.contact;
        } else if (input.includes("cv") || input.includes("resume")) {
            response = botContext.cv;
        } else if (input.includes("vision") || input.includes("futur") || input.includes("congo")) {
            response = botContext.vision;
        } else if (input.includes("projet") || input.includes("réalisation")) {
            response = botContext.projet;
        } else if (input.includes("experience") || input.includes("travail") || input.includes("codeur x ")) {
            response = botContext.experience;
        }
        else if (input.includes("cordoonee") || ("adresse ") || ("numero")) {
            response = botContext.cordoonee;

        }

        return response;
    };
    const handleSend = () => {
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';

        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, 600);
    };
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
})();
