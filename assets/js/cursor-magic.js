/* Premium Canvas-Based Cursor Magic Trail Effect by Văn Tiến Khánh */
(function() {
    // Disable on mobile devices to save battery/performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) return;

    // Check if canvas already exists to avoid duplicates
    if (document.getElementById("cursor-canvas")) return;

    const canvas = document.createElement("canvas");
    canvas.id = "cursor-canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "999999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    
    let points = [];
    let sparkles = [];
    const maxPoints = 15; // Length of the trail

    // Handle resizing
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Mouse position
    const mouse = { x: 0, y: 0 };
    let lastMouse = { x: 0, y: 0 };

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        // Spawn sparkles on movement
        const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
        if (dist > 5) {
            points.push({ x: mouse.x, y: mouse.y });
            if (points.length > maxPoints) {
                points.shift();
            }
            
            if (Math.random() < 0.4) {
                spawnSparkle(mouse.x, mouse.y);
            }
            lastMouse = { x: mouse.x, y: mouse.y };
        }
    });

    window.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
            
            const dist = Math.hypot(mouse.x - lastMouse.x, mouse.y - lastMouse.y);
            if (dist > 5) {
                points.push({ x: mouse.x, y: mouse.y });
                if (points.length > maxPoints) {
                    points.shift();
                }
                
                if (Math.random() < 0.4) {
                    spawnSparkle(mouse.x, mouse.y);
                }
                lastMouse = { x: mouse.x, y: mouse.y };
            }
        }
    });

    // Sparkle colors (RGB prefix)
    const colors = [
        "rgba(139, 92, 246,",  // Violet
        "rgba(192, 38, 211,",  // Fuchsia
        "rgba(236, 72, 153,",  // Pink
        "rgba(6, 182, 212,"    // Cyan
    ];

    function hexToRgbaPrefix(hex) {
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x' + c.join('');
            return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',';
        }
        return "rgba(139, 92, 246,";
    }

    function getSparkleColors() {
        if (window.themeColors && window.themeColors.primary) {
            return [
                hexToRgbaPrefix(window.themeColors.primary),
                hexToRgbaPrefix(window.themeColors.secondary),
                hexToRgbaPrefix(window.themeColors.accent)
            ];
        }
        return colors;
    }

    function spawnSparkle(x, y) {
        const activeColors = getSparkleColors();
        sparkles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3 + 1, // Gravity fall
            size: Math.random() * 6 + 4,
            alpha: 1,
            decay: Math.random() * 0.03 + 0.02, // Decay speed
            color: activeColors[Math.floor(Math.random() * activeColors.length)],
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.1
        });
    }

    // Draw a star shape (sparkle)
    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha, rotation) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(0, 0 - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = Math.cos(rot) * outerRadius;
            y = Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = Math.cos(rot) * innerRadius;
            y = Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(0, 0 - outerRadius);
        ctx.closePath();
        
        ctx.fillStyle = color + alpha + ")";
        ctx.fill();
        ctx.restore();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Gradually decay trail points if mouse is stationary
        if (points.length > 0) {
            // Draw smooth glowing line trail
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                const xc = (points[i].x + points[i - 1].x) / 2;
                const yc = (points[i].y + points[i - 1].y) / 2;
                ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
            }
            
            // Render glow outer line
            ctx.lineWidth = 8;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
            ctx.stroke();

            // Render detailed gradient line segements
            for (let i = 1; i < points.length; i++) {
                ctx.beginPath();
                ctx.moveTo(points[i - 1].x, points[i - 1].y);
                ctx.lineTo(points[i].x, points[i].y);
                
                const ratio = i / points.length;
                ctx.lineWidth = ratio * 4; // Tapering
                ctx.lineCap = "round";
                
                // Color gradient cycling based on index and time
                const hue = (Date.now() / 15 + i * 8) % 360;
                ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${ratio * 0.8})`;
                ctx.stroke();
            }

            // Slowly decay the tail when mouse stops moving
            if (Math.random() < 0.2) {
                points.shift();
            }
        }

        // Draw and update sparkles
        for (let i = sparkles.length - 1; i >= 0; i--) {
            const s = sparkles[i];
            s.x += s.vx;
            s.y += s.vy;
            s.alpha -= s.decay;
            s.rotation += s.rotationSpeed;
            
            if (s.alpha <= 0) {
                sparkles.splice(i, 1);
                continue;
            }

            drawStar(ctx, s.x, s.y, 4, s.size, s.size / 2.5, s.color, s.alpha, s.rotation);
        }

        requestAnimationFrame(animate);
    }

    animate();
})();
