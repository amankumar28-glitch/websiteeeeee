const canvas = document.getElementById('animation-canvas');
const context = canvas.getContext('2d');

const frameCount = 95;
const images = [];

// Helper to format the frame number like frame_00000.jpg
const currentFrame = index => `frames/frame_${index.toString().padStart(5, '0')}.jpg`;

// Preload all frames
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Initial draw when the first image loads
images[0].onload = () => {
    canvas.width = images[0].width;
    canvas.height = images[0].height;
    context.drawImage(images[0], 0, 0);
};

// Update the frame on scroll
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    
    // Calculate which frame we should be on
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );
    
    // Draw the new frame
    requestAnimationFrame(() => {
        if (images[frameIndex] && images[frameIndex].complete) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(images[frameIndex], 0, 0);
        }
    });
});
