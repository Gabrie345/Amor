// Adiciona interatividade aos corações
document.addEventListener('DOMContentLoaded', function() {
    const hearts = document.querySelectorAll('.heart');
    
    hearts.forEach((heart, index) => {
        heart.addEventListener('click', function() {
            // Efeito de pulo ao clicar
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
        
        // Adiciona efeito de hover em dispositivos touch
        heart.addEventListener('touchstart', function() {
            this.style.transform = 'scale(1.2)';
        });
        
        heart.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Modal da Carta
    const letterIcon = document.getElementById('letterIcon');
    const letterModal = document.getElementById('letterModal');
    const closeModal = document.getElementById('closeModal');
    const modalHearts = document.getElementById('modalHearts');
    
    // Função para criar corações no fundo do modal
    function createModalHearts() {
        modalHearts.innerHTML = ''; // Limpa corações anteriores
        const heartCount = 20; // Número de corações
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'modal-heart';
            heart.innerHTML = '💗';
            
            // Posição aleatória
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 8; // Delay aleatório para animação
            
            heart.style.left = left + '%';
            heart.style.top = top + '%';
            heart.style.animationDelay = delay + 's';
            heart.style.fontSize = (1 + Math.random() * 0.8) + 'rem'; // Tamanho variado
            
            modalHearts.appendChild(heart);
        }
    }
    
    // Abrir modal ao clicar no ícone da carta
    letterIcon.addEventListener('click', function() {
        createModalHearts();
        letterModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Fechar modal ao clicar no X
    closeModal.addEventListener('click', function() {
        letterModal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Fechar modal ao clicar fora da carta
    letterModal.addEventListener('click', function(e) {
        if (e.target === letterModal) {
            letterModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && letterModal.classList.contains('show')) {
            letterModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Modal da Galeria de Fotos
    const photosIcon = document.getElementById('photosIcon');
    const photosModal = document.getElementById('photosModal');
    const closePhotosModal = document.getElementById('closePhotosModal');
    const photosModalHearts = document.getElementById('photosModalHearts');
    const photosGrid = document.getElementById('photosGrid');
    
    // Array de fotos do projeto
    const photos = [
        'IMG_2021.jpg',
        'IMG_8722.JPG',
        'IMG_0071.jpg',
        'IMG_9410.jpg',
        'IMG_9483.jpg',
        'IMG_9565.jpg'
    ];
    
    // Função para criar corações no modal de fotos
    function createPhotosModalHearts() {
        photosModalHearts.innerHTML = '';
        const heartCount = 20;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'modal-heart';
            heart.innerHTML = '💗';
            
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 8;
            
            heart.style.left = left + '%';
            heart.style.top = top + '%';
            heart.style.animationDelay = delay + 's';
            heart.style.fontSize = (1 + Math.random() * 0.8) + 'rem';
            
            photosModalHearts.appendChild(heart);
        }
    }
    
    // Função para criar a galeria de fotos
    function createPhotosGallery() {
        photosGrid.innerHTML = '';
        
        if (photos.length === 0) {
            // Se não houver fotos, mostra placeholders
            for (let i = 0; i < 6; i++) {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                photoItem.innerHTML = '<div class="photo-placeholder">📸</div>';
                photosGrid.appendChild(photoItem);
            }
        } else {
            // Cria itens de foto com as URLs fornecidas
            photos.forEach((photoUrl, index) => {
                const photoItem = document.createElement('div');
                photoItem.className = 'photo-item';
                
                const img = document.createElement('img');
                img.src = photoUrl;
                img.alt = `Foto ${index + 1}`;
                img.loading = 'lazy'; // Carregamento otimizado
                
                img.onerror = function() {
                    this.parentElement.innerHTML = '<div class="photo-placeholder">📸<br><small style="font-size: 0.6rem; margin-top: 5px; display: block;">Erro ao carregar</small></div>';
                };
                
                img.onload = function() {
                    photoItem.addEventListener('click', function() {
                        openPhotoModal(photoUrl);
                    });
                };
                
                photoItem.appendChild(img);
                photosGrid.appendChild(photoItem);
            });
        }
    }
    
    // Abrir modal de fotos
    photosIcon.addEventListener('click', function() {
        createPhotosModalHearts();
        createPhotosGallery();
        photosModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Fechar modal de fotos
    closePhotosModal.addEventListener('click', function() {
        photosModal.classList.remove('show');
        document.body.style.overflow = '';
    });
    
    // Fechar modal ao clicar fora
    photosModal.addEventListener('click', function(e) {
        if (e.target === photosModal) {
            photosModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Fechar modal de fotos com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && photosModal.classList.contains('show')) {
            photosModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Função para abrir foto ampliada
    function openPhotoModal(photoUrl) {
        // Remove modal anterior se existir
        const existingModal = document.getElementById('photoModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        const photoModal = document.createElement('div');
        photoModal.id = 'photoModal';
        photoModal.className = 'photo-modal show';
        
        const photoModalContent = document.createElement('div');
        photoModalContent.className = 'photo-modal-content';
        
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = 'Foto ampliada';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'photo-modal-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', function() {
            photoModal.classList.remove('show');
            setTimeout(() => photoModal.remove(), 300);
        });
        
        photoModalContent.appendChild(img);
        photoModalContent.appendChild(closeBtn);
        photoModal.appendChild(photoModalContent);
        
        photoModal.addEventListener('click', function(e) {
            if (e.target === photoModal) {
                photoModal.classList.remove('show');
                setTimeout(() => photoModal.remove(), 300);
            }
        });
        
        document.body.appendChild(photoModal);
    }
    
    // Efeito de partículas ao tocar na tela (opcional)
    let touchCount = 0;
    document.addEventListener('touchstart', function(e) {
        touchCount++;
        if (touchCount % 5 === 0) {
            createHeartParticle(e.touches[0].clientX, e.touches[0].clientY);
        }
    });
});

// Função para criar partículas de coração (opcional)
function createHeartParticle(x, y) {
    const particle = document.createElement('div');
    particle.innerHTML = '💗';
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = '20px';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1000';
    particle.style.animation = 'particleFloat 2s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Adiciona animação CSS para partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);
