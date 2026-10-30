
(function () {
    const chatbotHTML = `
        <div class="chatbot-container">
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <h3><i class="fas fa-robot"></i> Assistant IA #la-mus</h3>
                    <span id="closeChat" aria-label="Fermer le chatbot">&times;</span>
                </div>
                <div class="chat-messages" id="chatMessages">
                    <div class="message bot">
                        Bonjour ! Je suis l'assistant de #la-mus. Posez-moi une question sur ses compétences, ses services, ses projets ou comment le contacter.
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" id="userInput" placeholder="Posez votre question..." aria-label="Message">
                    <button id="sendBtn" aria-label="Envoyer le message"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
            <div class="chat-bubble" id="chatBubble" aria-label="Ouvrir le chatbot">
                <i class="fas fa-comment-dots"></i>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);

    const chatBubble = document.getElementById('chatBubble');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const userInput = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');

    const botContext = {
        qui: "Je suis #la-mus (Josué Musombokelwa), étudiant en Bac 3 en Génie Informatique à l'Université de Lubumbashi, spécialisé en IA, bases de données et innovation technologique depuis 2026.",
        services: "Je propose : Intelligence Artificielle & Deep Learning, Bases de données vectorielles & RAG, Conseil numérique, Analyse de données et Développement web haut de gamme.",
        ia: "L'IA est au cœur de mon travail. Je conçois des systèmes de vision par ordinateur, de Deep Learning, des pipelines RAG et des solutions d'automatisation intelligente.",
        bdd: "J'ai développé une expertise complète en bases de données : vectorielles (Pinecone, Qdrant, ChromaDB), relationnelles (PostgreSQL, MySQL, SQL) et non-relationnelles (MongoDB, Redis). Je maîtrise aussi les embeddings sémantiques et les systèmes RAG.",
        vectoriel: "Les bases de données vectorielles permettent la recherche sémantique et la mémoire des LLM. Je travaille avec Pinecone, Qdrant et ChromaDB pour construire des pipelines RAG efficaces.",
        rag: "Le RAG (Retrieval-Augmented Generation) permet d'augmenter les LLM avec des données contextuelles précises. Je conçois des pipelines complets : indexation vectorielle → retrieval → génération augmentée.",
        contact: "Vous pouvez me contacter par email à musjosue809@gmail.com, par WhatsApp au +243 846 066 283 ou via le formulaire de contact du site.",
        cv: "Le CV est disponible directement depuis la page d'accueil du site en cliquant sur « Télécharger le CV ».",
        vision: "Ma vision : faire de la technologie un levier d'innovation locale et de transformation positive pour la RDC et l'Afrique. L'IA et la data sont des outils de souveraineté numérique.",
        projet: "Mes projets : vision par ordinateur (CNN), modèles prédictifs (Deep Learning) et systèmes de bases de données vectorielles avec RAG pour des assistants IA contextuels.",
        experience: "J'ai une expérience terrain au sein de TEDO SARL et ACNDC (superviseur, photographe, communication). Ces expériences me donnent une compréhension réelle des besoins utilisateurs.",
        adresse: "Je suis basé à Lubumbashi, en République Démocratique du Congo.",
        numero: "Mon numéro WhatsApp est le +243 846 066 283.",
        competences: "Mes compétences : Python, JavaScript, HTML/CSS, Machine Learning, Deep Learning, Bases de données vectorielles (Pinecone, Qdrant, ChromaDB), SQL/PostgreSQL/MySQL, MongoDB, LangChain, RAG, Git/GitHub.",
        default: "Je ne comprends pas exactement. Posez-moi des questions sur mes services, mes compétences (IA, bases de données vectorielles, RAG), mon parcours, mon CV ou comment me contacter."
    };

    const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const addMessage = (text, type) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', type);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const getBotResponse = (input) => {
        const text = normalize(input);

        if (/(bonjour|salut|hello|bonsoir|hi|hey)/.test(text)) {
            return "Bonjour ! Je suis prêt à vous aider. Dites-moi quel projet ou besoin vous avez en tête.";
        }

        if (/(vectoriel|vector|pinecone|qdrant|chroma|embedding|semantique)/.test(text)) {
            return botContext.vectoriel;
        }

        if (/(rag|retrieval|augmented|generation|pipeline)/.test(text)) {
            return botContext.rag;
        }

        if (/(base de donn|bdd|sql|mysql|postgresql|mongodb|nosql|relationnel|non.relation|redis)/.test(text)) {
            return botContext.bdd;
        }

        if (/(competence|skill|maitrise|technologie|stack|langchain)/.test(text)) {
            return botContext.competences;
        }

        if (/(qui|es-tu|mus|presentation|presenter)/.test(text)) {
            return botContext.qui;
        }

        if (/(service|services|offre|proposer|fait|travail)/.test(text)) {
            return botContext.services;
        }

        if (/(ia|intelligence artificielle|deep learning|cnn|vision|ordinateur|machine learning)/.test(text)) {
            return botContext.ia;
        }

        if (/(contact|email|mail|joindre|whatsapp|telephone|numero|appel)/.test(text)) {
            return botContext.contact;
        }

        if (/(cv|resume|curriculum)/.test(text)) {
            return botContext.cv;
        }

        if (/(vision|congo|avenir|futur|afrique)/.test(text)) {
            return botContext.vision;
        }

        if (/(projet|realisation|realisations|exemple)/.test(text)) {
            return botContext.projet;
        }

        if (/(experience|parcours|travail|terrain|tedo|acndc)/.test(text)) {
            return botContext.experience;
        }

        if (/(adresse|localisation|lieu|lubumbashi)/.test(text)) {
            return botContext.adresse;
        }

        if (/(numero|portable|phone|tel)/.test(text)) {
            return botContext.numero;
        }

        return botContext.default;
    };

    const toggleChat = () => {
        if (!chatWindow || !chatBubble) return;
        const isOpen = chatWindow.classList.toggle('active');
        chatBubble.setAttribute('aria-expanded', String(isOpen));
    };

    if (chatBubble) chatBubble.addEventListener('click', toggleChat);
    if (closeChat) closeChat.addEventListener('click', toggleChat);

    const handleSend = () => {
        const text = userInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        userInput.value = '';

        setTimeout(() => {
            const response = getBotResponse(text);
            addMessage(response, 'bot');
        }, 450);
    };

    if (sendBtn) sendBtn.addEventListener('click', handleSend);
    if (userInput) {
        userInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSend();
            }
        });
    }
})();
