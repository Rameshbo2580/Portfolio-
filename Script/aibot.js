
document.addEventListener('DOMContentLoaded', function () {
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const typingIndicator = document.getElementById('typing-indicator');

    // Portfolio Q&A Knowledge Base
    const portfolioKnowledge = {
        // Skills
        "skills": "My technical skills include JavaScript, HTML5, CSS3, React, Node.js, Python, and UI/UX design. I'm also proficient in Git, responsive design, and RESTful APIs.",
        "what are your skills": "My technical skills include JavaScript, HTML5, CSS3, React, Node.js, Python, and UI/UX design. I'm also proficient in Git, responsive design, and RESTful APIs.",
        "programming languages": "I'm proficient in JavaScript, Python, HTML/CSS, and have experience with Java and C++.",
        "technologies": "I work with React, Node.js, Express, MongoDB, Firebase, Git, and various CSS frameworks like Bootstrap and Tailwind.",

        // Experience
        "experience": "I have 3 years of experience in web development, including front-end and back-end projects. I've worked on e-commerce platforms, SaaS applications, and responsive web designs.",
        "work experience": "I have 3 years of experience in web development, including front-end and back-end projects. I've worked on e-commerce platforms, SaaS applications, and responsive web designs.",
        "background": "I have a background in Computer Science with a focus on web technologies. I've worked both as a freelancer and as part of development teams.",

        // Projects
        "projects": "I've worked on several projects including an e-commerce platform, a task management app, a weather dashboard, and a portfolio website. Would you like details on any specific project?",
        "what projects have you worked on": "I've worked on several projects including an e-commerce platform, a task management app, a weather dashboard, and a portfolio website. Would you like details on any specific project?",
        "portfolio projects": "My portfolio includes: 1) E-commerce site with React & Node.js, 2) Task management app with drag-and-drop functionality, 3) Weather dashboard with API integration, and 4) This portfolio website!",

        // Education
        "education": "I have a Bachelor's degree in Computer Science from University of Technology. I also regularly complete online courses to stay updated with the latest technologies.",
        "degree": "I have a Bachelor's degree in Computer Science from University of Technology.",
        "certifications": "I'm certified in React Development, Node.js, UI/UX Design, and Cloud Technologies.",

        // Contact
        "contact": "You can reach me via email at contact@myportfolio.com or connect with me on LinkedIn and GitHub. My social links are available on my portfolio website.",
        "how to contact you": "You can reach me via email at contact@myportfolio.com or connect with me on LinkedIn and GitHub. My social links are available on my portfolio website.",
        "email": "My email is contact@myportfolio.com. I typically respond within 24 hours.",

        // Interests
        "interests": "Outside of coding, I enjoy photography, hiking, reading tech blogs, and contributing to open source projects. I'm also passionate about UX design and accessibility.",
        "hobbies": "I enjoy photography, hiking, reading tech blogs, and contributing to open source projects in my free time.",

        // Default response
        "default": "I'm not sure I understand. Could you please rephrase your question? You can ask me about my skills, experience, projects, education, or how to contact me."
    };

    // Function to get current time for timestamp
    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }

    // Function to add a message to the chat
    function addMessage(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');

        messageDiv.textContent = message;

        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = getCurrentTime();

        messageDiv.appendChild(timestamp);

        // Add suggestion chips for bot messages
        if (!isUser) {
            const suggestions = document.createElement('div');
            suggestions.classList.add('suggestion-chips');

            // Add relevant suggestion chips based on message content
            if (message.includes("skills")) {
                suggestions.innerHTML = `
                            <div class="suggestion-chip" data-question="What technologies do you use?">Technologies</div>
                            <div class="suggestion-chip" data-question="What programming languages do you know?">Programming Languages</div>
                        `;
            } else if (message.includes("experience")) {
                suggestions.innerHTML = `
                            <div class="suggestion-chip" data-question="Tell me about your background">Background</div>
                            <div class="suggestion-chip" data-question="What companies have you worked for?">Companies</div>
                        `;
            } else if (message.includes("projects")) {
                suggestions.innerHTML = `
                            <div class="suggestion-chip" data-question="Tell me about your e-commerce project">E-commerce Project</div>
                            <div class="suggestion-chip" data-question="What about your task management app?">Task App</div>
                        `;
            } else {
                suggestions.innerHTML = `
                            <div class="suggestion-chip" data-question="What are your skills?">Skills</div>
                            <div class="suggestion-chip" data-question="Tell me about your experience">Experience</div>
                            <div class="suggestion-chip" data-question="What projects have you worked on?">Projects</div>
                        `;
            }

            messageDiv.appendChild(suggestions);

            // Add event listeners to the new suggestion chips
            setTimeout(() => {
                document.querySelectorAll('.suggestion-chip').forEach(chip => {
                    chip.addEventListener('click', function () {
                        userInput.value = this.getAttribute('data-question');
                        handleUserMessage();
                    });
                });
            }, 100);
        }

        chatMessages.appendChild(messageDiv);

        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to simulate typing
    function simulateTyping() {
        typingIndicator.style.display = 'block';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return new Promise(resolve => {
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                resolve();
            }, 1000);
        });
    }

    // Function to get response from knowledge base
    function getResponse(question) {
        const lowerQuestion = question.toLowerCase();

        // Check for exact matches first
        for (const key in portfolioKnowledge) {
            if (lowerQuestion.includes(key)) {
                return portfolioKnowledge[key];
            }
        }

        // Check for similar questions
        if (lowerQuestion.includes("skill") || lowerQuestion.includes("technology") || lowerQuestion.includes("language")) {
            return portfolioKnowledge["skills"];
        } else if (lowerQuestion.includes("experience") || lowerQuestion.includes("work") || lowerQuestion.includes("job")) {
            return portfolioKnowledge["experience"];
        } else if (lowerQuestion.includes("project") || lowerQuestion.includes("portfolio") || lowerQuestion.includes("app")) {
            return portfolioKnowledge["projects"];
        } else if (lowerQuestion.includes("education") || lowerQuestion.includes("degree") || lowerQuestion.includes("certificate")) {
            return portfolioKnowledge["education"];
        } else if (lowerQuestion.includes("contact") || lowerQuestion.includes("email") || lowerQuestion.includes("reach")) {
            return portfolioKnowledge["contact"];
        } else if (lowerQuestion.includes("interest") || lowerQuestion.includes("hobby")) {
            return portfolioKnowledge["interests"];
        }

        // Default response
        return portfolioKnowledge["default"];
    }

    // Function to handle user message
    async function handleUserMessage() {
        const message = userInput.value.trim();

        if (message) {
            // Add user message
            addMessage(message, true);
            userInput.value = '';

            // Show typing indicator and get response after delay
            await simulateTyping();

            // Add bot response
            addMessage(getResponse(message), false);
        }
    }

    // Event listeners
    sendButton.addEventListener('click', handleUserMessage);

    userInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Add event listeners to suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', function () {
            userInput.value = this.getAttribute('data-question');
            handleUserMessage();
        });
    });

    // Focus input field on load
    userInput.focus();
});