(function() {
    // Cookie helpers
    function setCookie(name, value, days) {
        let expires = new Date(Date.now() + 864e5 * days).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/`;
    }

    function getCookie(name) {
        let cookies = document.cookie.split("; ").reduce((acc, current) => {
            let [key, val] = current.split("=");
            return acc[key] = val, acc;
        }, {});
        return cookies[name];
    }

    // Theme switcher
    function setTheme(theme) {
        let sunIcon = $(".ri-sun-line");
        let moonIcon = $(".ri-moon-clear-line");
        if (theme === "light") {
            $("html").removeClass("dark").addClass("light");
            moonIcon.slideUp(300, function() {
                sunIcon.slideDown(300);
            });
            setCookie("theme", "light", 365);
        } else {
            $("html").removeClass("light").addClass("dark");
            sunIcon.slideUp(300, function() {
                moonIcon.slideDown(300);
            });
            setCookie("theme", "dark", 365);
        }
    }

    let savedTheme = getCookie("theme");
    if (savedTheme === "light") {
        setTheme("light");
    } else {
        setTheme("dark");
    }

    $("body").on("click", ".change-theme", function() {
        let isDark = $("html").hasClass("dark");
        setTheme(isDark ? "light" : "dark");
    });

    // Code versioning / random string helper for video asset cache busting
    function getCacheBuster() {
        let num1 = Math.floor(100 * Math.random());
        let num2 = Math.floor(100 * Math.random());
        let ops = ["+", "-", "*", "/"];
        let op = ops[Math.floor(Math.random() * ops.length)];
        let result;
        switch (op) {
            case "+": result = num1 + num2; break;
            case "-": result = num1 - num2; break;
            case "*": result = num1 * num2; break;
            case "/": result = num2 !== 0 ? (num1 / num2).toFixed(2) : num1; break;
        }
        let resultStr = result < 10 ? "0" + result : result;
        return `${num1 < 10 ? "0" + num1 : num1}.${num2 < 10 ? "0" + num2 : num2}.${resultStr}`;
    }

    // Appending lock screen
    const defaultLoaderTitle = $("html").attr("data-title-loader") || "Màn Hình Khoá";
    $("body").append(`
        <div id="fui-toast"></div>
        <div class="td-lock-screen">
            <section class="td-welcome">
                <div class="medias">
                    <video class="pc item_video" autoplay loop muted playsinline>
                        <source src="./assets/video/pc.mp4?v=${getCacheBuster()}" type="video/mp4">
                    </video>
                    <video class="mobile item_video" autoplay loop muted playsinline>
                        <source src="./assets/video/mb.mp4?v=${getCacheBuster()}" type="video/mp4">
                    </video>
                    <div class="date"></div>
                </div>
                <div class="infos">
                    <div class="logo-web-title">
                        <img class="logo-ws" src="./assets/img/avatar.jpg" alt="Văn Tiến Khánh">
                        <span class="web-title">${defaultLoaderTitle}</span>
                    </div>
                    <span class="web_desc"></span>
                    <div>
                        <i class="ri-arrow-down-line close-lockscreen"></i>
                    </div>
                </div>
            </section>
        </div>
    `);

    // Magic stars animation
    let randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    let animateStar = star => {
        star.style.setProperty("--star-left", `${randomRange(-10, 100)}%`);
        star.style.setProperty("--star-top", `${randomRange(-40, 80)}%`);
        star.style.animation = "none";
        star.offsetHeight; // Trigger reflow
        star.style.animation = "";
    };

    let starIdx = 0;
    for (let star of document.getElementsByClassName("magic-star")) {
        setTimeout(() => {
            animateStar(star);
            setInterval(() => animateStar(star), 1000);
        }, starIdx++ * (1000 / 3));
    }

    // Scroll to top button
    let scrollBtn = document.getElementById("croll-to-top");
    let scrollText = scrollBtn.querySelector(".text");
    let scrollIcon = scrollBtn.querySelector("i");
    
    if (window.scrollY === 0) {
        scrollBtn.style.display = "none";
    }

    let headerEl = document.querySelector("main > header");
    if (headerEl && window.scrollY > 0) {
        headerEl.classList.add("not-top");
    }

    window.addEventListener("scroll", function() {
        let scrollPos = window.scrollY;
        let docHeight = document.documentElement.scrollHeight;
        let winHeight = window.innerHeight;
        let progress = 0;
        if (docHeight > winHeight) {
            progress = (scrollPos / (docHeight - winHeight)) * 100;
        }
        scrollText.textContent = Math.round(progress);
        if (scrollPos > 0) {
            scrollBtn.style.display = "block";
            if (headerEl) headerEl.classList.add("not-top");
        } else {
            scrollBtn.style.display = "none";
            if (headerEl) headerEl.classList.remove("not-top");
        }
    });

    scrollBtn.addEventListener("mouseenter", function() {
        scrollText.style.display = "none";
        scrollIcon.style.display = "inline-block";
    });

    scrollBtn.addEventListener("mouseleave", function() {
        scrollText.style.display = "inline-block";
        scrollIcon.style.display = "none";
    });

    scrollBtn.addEventListener("click", function() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    });

    // Disable context menu
    $(document).on({
        contextmenu: function(e) {
            e.preventDefault();
        }
    });

    // Click effect (spawning random text on page clicks)
    let clickIdx = 0;
    const colors = ["#ff6651", "#42a5f5", "#66bb6a", "#ab47bc", "#ffa726", "#ec407a", "#26c6da", "#78909c", "#ffca28", "#5c6bc0", "#8d6e63", "#26a69a"];
    jQuery(document).ready(function($) {
        $("body").click(function(e) {
            // Check if we clicked on an interactive button or copy to avoid spamming text over interactive controls if annoying
            if ($(e.target).closest("button, a, input, select, textarea, [data-ws-copy]").length) {
                return;
            }
            const wishes = [
                "♥️ Vạn sự như ý", "❤️ An khang thịnh vượng", "💛 Tấn tài tấn lộc", 
                "💚 Sức khỏe dồi dào", "💙 Công danh rạng rỡ", "💜 Hạnh phúc viên mãn", 
                "🖤 Niềm vui ngập tràn", "💖 Tình yêu thăng hoa", "💝 Thành công rực rỡ", 
                "🧡 Phát tài phát lộc", "❤️ May mắn ngập tràn", "💛 Hạnh phúc đong đầy"
            ];
            let span = $("<span style='font-family:sans-serif;'>").text(wishes[clickIdx]);
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            clickIdx = (clickIdx + 1) % wishes.length;

            let x = e.pageX;
            let y = e.pageY;

            span.css({
                "z-index": Math.floor(9990001 * Math.random()) + 9999,
                top: y - 20,
                left: x,
                position: "absolute",
                "font-weight": "bold",
                color: randomColor,
                "pointer-events": "none",
                "user-select": "none"
            });

            $("body").append(span);
            span.animate({
                top: y - 180,
                opacity: 0
            }, 1500, function() {
                span.remove();
            });
        });
    });

    // Clock component
    class Clock {
        constructor(selector) {
            this.element = $(selector);
            this.updateTime();
            setInterval(() => this.updateTime(), 1000);
        }
        updateTime() {
            let now = new Date();
            let hours = now.getHours().toString().padStart(2, "0");
            let minutes = now.getMinutes().toString().padStart(2, "0");
            let seconds = now.getSeconds().toString().padStart(2, "0");
            this.element.text(`${hours}:${minutes}:${seconds}`);
        }
    }

    // Local quote database instead of thanh dieu API
    const QUOTES = [
        "Hành trình vạn dặm bắt đầu từ một bước chân.",
        "Hãy sống như thể ngày mai bạn sẽ chết. Hãy học như thể bạn sẽ sống mãi mãi.",
        "Khó khăn không gục ngã chúng ta, chúng làm ta mạnh mẽ hơn.",
        "Đừng đợi cơ hội tự tìm đến, hãy tự tạo ra cơ hội.",
        "Sự chuẩn bị tốt nhất cho ngày mai là làm tốt hôm nay.",
        "Không bao giờ là quá muộn để bắt đầu lại một khởi đầu mới.",
        "Hãy luôn tin tưởng vào chính bản thân mình và kiên định mục tiêu.",
        "Sự kiên trì là chìa khóa mở ra mọi cánh cửa thành công.",
        "Mỗi ngày mới là một chương mới viết nên cuộc đời bạn.",
        "Thành công là việc đi từ thất bại này đến thất bại khác mà không mất đi nhiệt huyết."
    ];
    let lastQuoteIdx = -1;

    function updateQuote() {
        let idx;
        do {
            idx = Math.floor(Math.random() * QUOTES.length);
        } while (idx === lastQuoteIdx && QUOTES.length > 1);
        lastQuoteIdx = idx;

        const quoteEl = $("#cham-ngon");
        if (quoteEl.length) {
            quoteEl.fadeOut(300, function() {
                $(this).text(QUOTES[idx]).fadeIn(300);
            });
        }
    }

    new Clock("#real-time");
    if ($("[data-fancybox]").length) {
        Fancybox.bind("[data-fancybox]", {});
    }
    updateQuote();
    setInterval(updateQuote, 6500);

    // Welcome screen message reminder
    let greetingMessage = new class Greeting {
        MessageRmd() {
            let hour = new Date().getHours();
            let messages;
            if (hour >= 3 && hour <= 10) {
                messages = [
                    "Chúc bạn có một buổi sáng vui vẻ và gặt hái nhiều thành công! ☀️",
                    "Sáng nay thật đẹp, hãy bắt đầu một ngày mới tràn đầy năng lượng nhé!",
                    "Chào buổi sáng! Hãy khởi đầu ngày mới thật hứng khởi.",
                    "Chúc bạn ngày mới làm việc và học tập hiệu quả!"
                ];
            } else if (hour >= 11 && hour <= 15) {
                messages = [
                    "Buổi trưa vui vẻ! Nhớ nghỉ ngơi đầy đủ để có sức làm việc buổi chiều nhé 🌤️",
                    "Trưa nay hơi nóng, hãy thư giãn một chút nhé!",
                    "Chúc bạn có một buổi nghỉ trưa yên bình và thoải mái."
                ];
            } else if (hour >= 16 && hour <= 18) {
                messages = [
                    "Buổi chiều thư giãn sau những giờ làm việc căng thẳng 🌅",
                    "Chúc bạn một buổi chiều mát mẻ và nhiều năng lượng tích cực!",
                    "Hoàn thành nốt công việc để chuẩn bị đón một buổi tối tuyệt vời thôi nào!"
                ];
            } else if (hour >= 19 && hour <= 21) {
                messages = [
                    "Chúc bạn có một buổi tối ấm áp bên gia đình và người thân ❤️",
                    "Buổi tối vui vẻ và thư thái nhé!",
                    "Chào buổi tối! Dành thời gian nghỉ ngơi và tái tạo năng lượng thôi."
                ];
            } else {
                messages = [
                    "Sao giờ này bạn vẫn chưa ngủ nữa nè? Đi ngủ thôi nào 💤",
                    "Khuya rồi, chúc bạn có những giấc mơ thật đẹp nhé 🌌",
                    "Đêm đã muộn, hãy tắt máy tính nghỉ ngơi để bảo vệ sức khỏe nha 🌙"
                ];
            }
            return messages[Math.floor(Math.random() * messages.length)];
        }
    }();
    
    setTimeout(() => {
        $("#waiting-loader").text(greetingMessage.MessageRmd());
    }, 150);

    // Lock screen sliding descriptions
    let descriptionScroller = new class Desc {
        constructor() {
            this.descriptions = [
                "Học hỏi không ngừng, nỗ lực mỗi ngày để hoàn thiện bản thân.",
                "Chào mừng bạn đến với trang web chính thức của Văn Tiến Khánh.",
                "Đam mê lập trình và luôn hướng tới những sản phẩm chất lượng cao.",
                "Sáng tạo là chìa khóa giúp chúng ta bứt phá mọi giới hạn.",
                "Vector chỉ có một chiều, tôi chỉ kiên trì theo đuổi một mục tiêu duy nhất.",
                "Bận rộn với các dự án nhưng luôn sẵn sàng hỗ trợ các bạn.",
                "Mọi giấc mơ lớn đều bắt đầu từ những hành động nhỏ nhặt nhất.",
                "Không sợ thất bại, chỉ sợ bản thân không dám bắt đầu thử sức.",
                "Sự hài lòng của khách hàng là động lực lớn nhất của tôi.",
                "Chào ngày mới! Chúc bạn tìm thấy những điều thú vị tại portfolio của tôi."
            ];
            this.element = $(".web_desc");
            this.rotateDesc();
        }
        rotateDesc() {
            let randomDesc = this.descriptions[Math.floor(Math.random() * this.descriptions.length)];
            this.element.fadeOut(500, () => {
                this.element.html(randomDesc).fadeIn(500);
            });
        }
    }();
    setInterval(() => descriptionScroller.rotateDesc(), 7000);

    // Lock screen unlock gestures/clicks
    $(".td-lock-screen").click(function() {
        $(".td-welcome").slideUp("slow");
        $(".td-lock-screen").animate({ opacity: 0 }, "slow").css("pointer-events", "none");
    });
    
    $(document).on("swiperight", function() {
        $(".td-welcome").slideDown("slow");
        $(".td-lock-screen").animate({ opacity: 1 }, "fast").css("pointer-events", "auto");
    });

    $(document).on("swipeleft", function() {
        $(".td-welcome").slideUp("slow");
        $(".td-lock-screen").animate({ opacity: 0 }, "slow").css("pointer-events", "none");
    });

    $(document).on("visibilitychange", function() {
        if (!document.hidden) {
            setTimeout(function() {
                var scrollPos = $(window).scrollTop();
                var winHeight = $(window).height();
                var docHeight = $(document).height();
                if (scrollPos === 0) {
                    $(".td-welcome").slideDown("slow");
                    $(".td-lock-screen").animate({ opacity: 1 }, "fast").css("pointer-events", "auto");
                }
                if (scrollPos / (docHeight - winHeight) * 100 >= 99) {
                    $(".td-welcome").slideUp("slow");
                    $(".td-lock-screen").animate({ opacity: 0 }, "slow").css("pointer-events", "none");
                }
            }, 200);
        }
    });

    new Clock(".date");

    // Pace loading progress monitoring
    let progressPercentage = $("#loading-percentage");
    let progressCheckInterval = setInterval(function() {
        var progressEl = $(".pace-progress");
        if (progressEl.length) {
            var progressText = progressEl.attr("data-progress-text");
            if (progressText !== progressPercentage.text()) {
                progressPercentage.text(progressText);
                var val = parseInt(progressText);
                progressEl.css("transform", `translate3d(${val}%, 0px, 0px)`);
                if (progressText === "100%") {
                    $(".pace-active").animate({ top: "-100px" }, "slow", function() {
                        $(this).hide();
                    });
                    if ($("#loading-box").is(":visible")) {
                        endLoading();
                        window.WsLoaded = true;
                        $(".td-loading-v2").fadeOut("slow");
                        $("#loading-box").fadeOut("slow");
                    } else {
                        $(".td-loading-v2").fadeOut("slow");
                    }
                    clearInterval(progressCheckInterval);
                }
            }
        }
    }, 100);

    function endLoading() {
        $("body").removeClass("loading");
    }

    $(window).on("load", () => {
        endLoading();
        $(".td-loading-v2").fadeOut("slow");
        $("#loading-box").fadeOut("slow");
        window.WsLoaded = true;
    });

    console.log("%c Văn Tiến Khánh %c Portfolio Web Profile v5.0", 
        "color:#fff;background:linear-gradient(90deg,#448bff,#44e9ff);padding:5px 0;", 
        "color:#000;background:linear-gradient(90deg,#44e9ff,#ffffff);padding:5px 10px 5px 0px;"
    );

    // Vector Sakura Petals Falling Canvas Effect
    let reqFrameId, canvasActive = !1;

    function Petal(x, y, scale, rotation, motionFuncs) {
        this.x = x;
        this.y = y;
        this.s = scale;
        this.r = rotation;
        this.fn = motionFuncs;
    }

    Petal.prototype.draw = function(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.r);
        
        ctx.beginPath();
        // Delicate sakura blossom translucent pink shade
        ctx.fillStyle = "rgba(255, 183, 197, 0.75)";
        
        // Draw cherry blossom petal shape using bezier curves
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-10 * this.s, -15 * this.s, -15 * this.s, -5 * this.s, 0, 15 * this.s);
        ctx.bezierCurveTo(15 * this.s, -5 * this.s, 10 * this.s, -15 * this.s, 0, 0);
        ctx.fill();
        
        // Draw subtle central line detail
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 150, 170, 0.9)";
        ctx.lineWidth = 1 * this.s;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 8 * this.s);
        ctx.stroke();
        
        ctx.restore();
    };

    Petal.prototype.update = function() {
        this.x = this.fn.x(this.x, this.y);
        this.y = this.fn.y(this.y, this.y);
        this.r = this.fn.r(this.r);
        
        // Wrap coordinates if out of screen bounds
        if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
            this.r = getMotionVal("fnr");
            if (Math.random() > 0.4) {
                this.x = getMotionVal("x");
                this.y = 0;
                this.s = getMotionVal("s");
                this.r = getMotionVal("r");
            } else {
                this.x = window.innerWidth;
                this.y = getMotionVal("y");
                this.s = getMotionVal("s");
                this.r = getMotionVal("r");
            }
        }
    };

    function getMotionVal(type) {
        let val, factor;
        switch (type) {
            case "x": val = Math.random() * window.innerWidth; break;
            case "y": val = Math.random() * window.innerHeight; break;
            case "s": val = 0.4 + Math.random() * 0.8; break;
            case "r": val = 6 * Math.random(); break;
            case "fnx": 
                factor = -0.5 + 1 * Math.random();
                val = function(x, y) { return x + 0.5 * factor - 1.2; };
                break;
            case "fny": 
                factor = 1.0 + 0.8 * Math.random();
                val = function(x, y) { return y + factor; };
                break;
            case "fnr": 
                factor = 0.02 * Math.random();
                val = function(r) { return r + factor; };
                break;
        }
        return val;
    }

    class SakuraList {
        constructor() { this.list = []; }
        push(p) { this.list.push(p); }
        update() { this.list.forEach(p => p.update()); }
        draw(ctx) { this.list.forEach(p => p.draw(ctx)); }
    }

    function initSakuraFalling() {
        let requestAnimationFrame = window.requestAnimationFrame || 
                                    window.mozRequestAnimationFrame || 
                                    window.webkitRequestAnimationFrame || 
                                    window.msRequestAnimationFrame || 
                                    window.oRequestAnimationFrame;
        
        let canvas = document.createElement("canvas");
        canvasActive = true;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
        canvas.setAttribute("style", "position: fixed; left: 0; top: 0; pointer-events: none; z-index: 8888;");
        canvas.setAttribute("id", "canvas_sakura");
        document.getElementsByTagName("body")[0].appendChild(canvas);
        
        let ctx = canvas.getContext("2d");
        let list = new SakuraList();
        
        // Spawn initial petals
        for (let i = 0; i < 18; i++) {
            let x = getMotionVal("x");
            let y = getMotionVal("y");
            let r = getMotionVal("r");
            let s = getMotionVal("s");
            let fnx = getMotionVal("fnx");
            let fny = getMotionVal("fny");
            let fnr = getMotionVal("fnr");
            
            let petal = new Petal(x, y, s, r, { x: fnx, y: fny, r: fnr });
            petal.draw(ctx);
            list.push(petal);
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            list.update();
            list.draw(ctx);
            reqFrameId = requestAnimationFrame(animate);
        }
        
        reqFrameId = requestAnimationFrame(animate);
    }

    initSakuraFalling();

    window.onresize = function() {
        let canvas = document.getElementById("canvas_sakura");
        if (canvas) {
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
        }
    };

    // Clipboard copy helper using data-ws-copy
    $("body").on("click", "[data-ws-copy]", function(e) {
        e.preventDefault();
        var copyText = $(this).data("ws-copy");
        if (navigator.clipboard) {
            navigator.clipboard.writeText(copyText).then(function() {
                FuiToast.success("Đã sao chép vào bộ nhớ tạm!");
            }, function(err) {
                FuiToast.error("Sao chép thất bại: " + err);
            });
        } else {
            var tempTextarea = $("<textarea>").val(copyText).appendTo("body").select();
            try {
                document.execCommand("copy");
                FuiToast.success("Đã sao chép vào bộ nhớ tạm!");
            } catch (err) {
                FuiToast.error("Sao chép thất bại: " + err);
            }
            tempTextarea.remove();
        }
    });

})();