// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }
    
    // Function to toggle theme
    function toggleTheme() {
        body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }
    
    // Add event listeners to theme toggle buttons
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Mobile menu functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // In a real application, you would send this data to your backend
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Message sent successfully!');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Earnings calculator functionality
    const earningsCalculator = document.getElementById('earnings-calculator');
    
    if (earningsCalculator) {
        const studentsInput = document.getElementById('students');
        const priceInput = document.getElementById('price');
        const earningsResult = document.getElementById('earnings-result');
        const monthlyEarnings = document.getElementById('monthly-earnings');
        const yearlyEarnings = document.getElementById('yearly-earnings');
        
        function calculateEarnings() {
            const students = parseInt(studentsInput.value) || 0;
            const price = parseFloat(priceInput.value) || 0;
            
            // Calculate earnings (90% revenue share)
            const monthly = students * price * 0.9;
            const yearly = monthly * 12;
            
            // Display results
            monthlyEarnings.textContent = monthly.toFixed(2);
            yearlyEarnings.textContent = yearly.toFixed(2);
            
            // Show result section
            earningsResult.classList.add('active');
        }
        
        // Calculate on input change
        studentsInput.addEventListener('input', calculateEarnings);
        priceInput.addEventListener('input', calculateEarnings);
    }
    
    // Scroll animation (simple implementation)
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Initial check on page load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Sticky header
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide navbar on scroll direction change
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.classList.add('nav-hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('nav-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Live Chat (simulated)
    const chatIcon = document.getElementById('chat-icon');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    
    if (chatIcon) {
        chatIcon.addEventListener('click', function() {
            chatWindow.classList.add('active');
        });
        
        closeChat.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });
        
        function sendMessage() {
            const message = chatInput.value.trim();
            
            if (message) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message user-message';
                userMessage.textContent = message;
                chatMessages.appendChild(userMessage);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate bot response after a delay
                setTimeout(function() {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message bot-message';
                    botMessage.textContent = 'Thanks for reaching out! Our team will get back to you shortly.';
                    chatMessages.appendChild(botMessage);
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        
        sendButton.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Testimonials slider (if exists)
    const testimonialsContainer = document.querySelector('.testimonials-container');
    
    if (testimonialsContainer) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        const prevButton = document.querySelector('.testimonial-prev');
        const nextButton = document.querySelector('.testimonial-next');
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
            });
        }
        
        // Initialize
        showTestimonial(currentIndex);
        
        // Next button
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Previous button
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
        
        // Auto slide
        setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // Add earnings calculator to educator section
    const educatorsSection = document.getElementById('educators');
    
    if (educatorsSection && !document.getElementById('earnings-calculator')) {
        const calculatorHTML = `
            <div id="earnings-calculator" class="earnings-calculator">
                <h3>Calculate Your Potential Earnings</h3>
                <div class="calculator-inputs">
                    <div class="calculator-input">
                        <label for="students">Number of Students</label>
                        <input type="number" id="students" min="1" value="50">
                    </div>
                    <div class="calculator-input">
                        <label for="price">Course Price (USD)</label>
                        <input type="number" id="price" min="1" value="49">
                    </div>
                </div>
                <div id="earnings-result" class="earnings-result">
                    <div class="earnings-data">
                        <div class="earnings-amount">
                            <span>Monthly Earnings</span>
                            <h4>$<span id="monthly-earnings">2,205.00</span></h4>
                        </div>
                        <div class="earnings-amount">
                            <span>Yearly Earnings</span>
                            <h4>$<span id="yearly-earnings">26,460.00</span></h4>
                        </div>
                    </div>
                    <p class="earnings-note">Based on 90% revenue share</p>
                </div>
            </div>
        `;
        
        // Find the educators-text div and append the calculator
        const educatorsText = educatorsSection.querySelector('.educators-text');
        if (educatorsText) {
            // Insert calculator before the CTA button
            const ctaButton = educatorsText.querySelector('.btn');
            if (ctaButton) {
                const div = document.createElement('div');
                div.innerHTML = calculatorHTML;
                educatorsText.insertBefore(div, ctaButton);
                
                // Initialize the calculator
                const studentsInput = document.getElementById('students');
                const priceInput = document.getElementById('price');
                const earningsResult = document.getElementById('earnings-result');
                const monthlyEarnings = document.getElementById('monthly-earnings');
                const yearlyEarnings = document.getElementById('yearly-earnings');
                
                function calculateEarnings() {
                    const students = parseInt(studentsInput.value) || 0;
                    const price = parseFloat(priceInput.value) || 0;
                    
                    // Calculate earnings (90% revenue share)
                    const monthly = students * price * 0.9;
                    const yearly = monthly * 12;
                    
                    // Display results
                    monthlyEarnings.textContent = monthly.toFixed(2);
                    yearlyEarnings.textContent = yearly.toFixed(2);
                }
                
                // Calculate on input change
                studentsInput.addEventListener('input', calculateEarnings);
                priceInput.addEventListener('input', calculateEarnings);
                
                // Initial calculation
                calculateEarnings();
            }
        }
    }
    
    // Add live chat widget (if not already present)
    if (!document.getElementById('chat-widget')) {
        const chatWidgetHTML = `
            <div id="chat-widget" class="chat-widget">
                <button id="chat-icon" class="chat-icon">
                    <i class="fas fa-comments"></i>
                </button>
                <div id="chat-window" class="chat-window">
                    <div class="chat-header">
                        <span>Pocket Scholar Support</span>
                        <button id="close-chat" class="close-chat">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div id="chat-messages" class="chat-messages">
                        <div class="message bot-message">
                            Hi there! 👋 How can we help you today?
                        </div>
                    </div>
                    <div class="chat-input-container">
                        <input type="text" id="chat-input" placeholder="Type your message...">
                        <button id="send-message">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Append chat widget to body
        const div = document.createElement('div');
        div.innerHTML = chatWidgetHTML;
        document.body.appendChild(div);
        
        // Initialize chat widget
        const chatIcon = document.getElementById('chat-icon');
        const chatWindow = document.getElementById('chat-window');
        const closeChat = document.getElementById('close-chat');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-message');
        
        chatIcon.addEventListener('click', function() {
            chatWindow.classList.add('active');
        });
        
        closeChat.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });
        
        function sendMessage() {
            const message = chatInput.value.trim();
            
            if (message) {
                // Add user message
                const userMessage = document.createElement('div');
                userMessage.className = 'message user-message';
                userMessage.textContent = message;
                chatMessages.appendChild(userMessage);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Simulate bot response after a delay
                setTimeout(function() {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message bot-message';
                    botMessage.textContent = 'Thanks for reaching out! Our team will get back to you shortly.';
                    chatMessages.appendChild(botMessage);
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        
        sendButton.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Add chat widget styles
        const style = document.createElement('style');
        style.textContent = `
            .chat-widget {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 1000;
            }
            
            .chat-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: var(--primary);
                color: white;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                transition: transform 0.3s ease;
            }
            
            .chat-icon:hover {
                transform: scale(1.1);
            }
            
            .chat-window {
                position: absolute;
                bottom: 80px;
                right: 0;
                width: 350px;
                height: 450px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
            }
            
            .chat-window.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .chat-header {
                padding: 15px;
                background-color: var(--primary);
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .close-chat {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
            }
            
            .chat-messages {
                flex: 1;
                padding: 15px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }
            
            .message {
                padding: 10px 15px;
                border-radius: 20px;
                margin-bottom: 10px;
                max-width: 70%;
                word-break: break-word;
            }
            
            .bot-message {
                align-self: flex-start;
                background-color: var(--gray-200);
                color: var(--text-dark);
            }
            
            .user-message {
                align-self: flex-end;
                background-color: var(--primary);
                color: white;
            }
            
            .chat-input-container {
                display: flex;
                padding: 10px 15px;
                border-top: 1px solid var(--gray-300);
            }
            
            #chat-input {
                flex: 1;
                padding: 10px;
                border: 1px solid var(--gray-300);
                border-radius: 20px;
                outline: none;
            }
            
            #send-message {
                background-color: var(--primary);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                margin-left: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @media (max-width: 576px) {
                .chat-window {
                    width: 300px;
                    height: 400px;
                    bottom: 70px;
                    right: 0;
                }
                
                .chat-icon {
                    width: 50px;
                    height: 50px;
                    font-size: 20px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Add additional CSS for earnings calculator
    const calculatorStyles = document.createElement('style');
    calculatorStyles.textContent = `
        .earnings-calculator {
            background-color: var(--gray-100);
            border-radius: var(--border-radius);
            padding: 20px;
            margin: 30px 0;
            box-shadow: var(--shadow-md);
        }
        
        .earnings-calculator h3 {
            margin-bottom: 20px;
        }
        
        .calculator-inputs {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .calculator-input label {
            display: block;
            margin-bottom: 10px;
            font-weight: 500;
        }
        
        .calculator-input input {
            width: 100%;
            padding: 10px;
            border-radius: var(--border-radius);
            border: 1px solid var(--gray-300);
            font-size: 1rem;
        }
        
        .earnings-result {
            background-color: var(--background-light);
            border-radius: var(--border-radius);
            padding: 20px;
            box-shadow: var(--shadow-sm);
        }
        
        .earnings-data {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-bottom: 15px;
        }
        
        .earnings-amount span {
            display: block;
            color: var(--gray-600);
            font-size: 0.9rem;
            margin-bottom: 5px;
        }
        
        .earnings-amount h4 {
            font-size: 1.8rem;
            color: var(--primary);
            margin-bottom: 0;
        }
        
        .earnings-note {
            color: var(--gray-500);
            font-size: 0.9rem;
            margin-bottom: 0;
        }
        
        .dark-mode .earnings-calculator,
        .dark-mode .earnings-result {
            background-color: var(--gray-800);
        }
    `;
    
    document.head.appendChild(calculatorStyles);
    
    // Add animation styles
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        [data-aos] {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        [data-aos].aos-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        [data-aos-delay="100"] {
            transition-delay: 0.1s;
        }
        
        [data-aos-delay="200"] {
            transition-delay: 0.2s;
        }
        
        [data-aos-delay="300"] {
            transition-delay: 0.3s;
        }
        
        [data-aos-delay="400"] {
            transition-delay: 0.4s;
        }
        
        [data-aos-delay="500"] {
            transition-delay: 0.5s;
        }
        
        /* Sticky header styles */
        #navbar.scrolled {
            box-shadow: var(--shadow-md);
            background-color: var(--background-light);
            height: 70px;
        }
        
        #navbar.nav-hidden {
            transform: translateY(-100%);
        }
        
        #navbar {
            transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, height 0.3s ease;
        }
    `;
    
    document.head.appendChild(animationStyles);
});