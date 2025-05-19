// 全局变量
const victimNameInput = document.getElementById('victim-name');
const generateBtn = document.getElementById('generate-btn');
const dollSection = document.getElementById('doll-section');
const doll = document.getElementById('doll');
const nameTag = document.getElementById('name-tag');
const speechBubble = document.getElementById('speech-bubble');

// 工具元素
const needleTool = document.getElementById('needle');
const shoeTool = document.getElementById('shoe');
const fireTool = document.getElementById('fire');
const waterTool = document.getElementById('water');
const curseTool = document.getElementById('curse');

// 求饶语句
const pleadings = [
    "呜呜~放过我吧...",
    "好痛痛哦！不要啦！",
    "人家再也不敢了...",
    "啊呜！！救命啦！",
    "我错啦，真的错啦！",
    "不要再欺负人家了...",
    "我愿意道歉啦！",
    "饶了小人这一次吧...",
    "我保证以后会乖乖的！",
    "痛死啦！住手啦！"
];

// 工具对应的求饶语句
const toolPleadings = {
    needle: [
        "啊呜！针针好痛！",
        "不要再扎人家啦！",
        "针扎的感觉好可怕哦！",
        "小人要被扎成刺猬啦！"
    ],
    shoe: [
        "别踩我啦！好痛痛！",
        "鞋子好重哦！要变扁扁了！",
        "不要再拍打小人啦！",
        "呜呜~要被踩成饼啦！"
    ],
    fire: [
        "好烫烫！小人要融化啦！",
        "救火！小人要变成烤肉啦！",
        "火火好可怕哦！",
        "呜呜~全身都在冒泡泡！"
    ],
    water: [
        "救命！小人要变成落汤鸡啦！",
        "人家不会游泳啦！",
        "水水好冷哦！受不了啦！",
        "呜呜~要被冲走啦！"
    ],
    curse: [
        "诅咒的力量在吞噬小人...",
        "感觉全身都麻麻的...",
        "这个诅咒好厉害哦！",
        "呜呜~小人要变成幽灵啦！"
    ]
};

// 小人的外观变化
const dollVariations = [
    {
        head: "#ffe0f0",
        body: "#ffb6e6",
        headShape: "50%",
        bodyShape: "normal",
        eyeColor: "#333",
        cheekColor: "#ff9999"
    },
    {
        head: "#e0f0ff",
        body: "#b6e6ff",
        headShape: "50%",
        bodyShape: "thin",
        eyeColor: "#333",
        cheekColor: "#ff9999"
    },
    {
        head: "#f0ffe0",
        body: "#e6ffb6",
        headShape: "50%",
        bodyShape: "wide",
        eyeColor: "#333",
        cheekColor: "#ff9999"
    },
    {
        head: "#f0e0ff",
        body: "#e6b6ff",
        headShape: "50%",
        bodyShape: "short",
        eyeColor: "#333",
        cheekColor: "#ff9999"
    },
    {
        head: "#ffe0e0",
        body: "#ffb6b6",
        headShape: "50%",
        bodyShape: "tall",
        eyeColor: "#333",
        cheekColor: "#ff9999"
    }
];

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 生成小人按钮点击事件
    generateBtn.addEventListener('click', generateDoll);
    
    // 工具点击事件
    needleTool.addEventListener('click', () => useTool('needle'));
    shoeTool.addEventListener('click', () => useTool('shoe'));
    fireTool.addEventListener('click', () => useTool('fire'));
    waterTool.addEventListener('click', () => useTool('water'));
    curseTool.addEventListener('click', () => useTool('curse'));
    
    // 添加诡异的背景音效
    addCreepyBackgroundEffects();
});

// 生成小人函数
function generateDoll() {
    const victimName = victimNameInput.value.trim();
    
    if (!victimName) {
        alert('请输入对方的名字');
        return;
    }
    
    // 显示小人区域
    dollSection.classList.remove('hidden');
    
    // 设置名字标签
    nameTag.textContent = victimName;
    
    // 随机选择小人外观
    const variation = dollVariations[Math.floor(Math.random() * dollVariations.length)];
    
    // 应用外观
    const dollHead = doll.querySelector('.doll-head');
    const dollBody = doll.querySelector('.doll-body');
    const dollArms = doll.querySelector('.doll-arms');
    const dollLegs = doll.querySelector('.doll-legs');
    
    dollHead.style.backgroundColor = variation.head;
    dollBody.style.backgroundColor = variation.body;
    dollArms.style.backgroundColor = variation.body;
    dollLegs.style.backgroundColor = variation.body;
    
    dollHead.style.borderRadius = variation.headShape;
    
    // 添加Q版眼睛和脸颊
    dollHead.innerHTML = '';
    const eyes = document.createElement('div');
    eyes.style.position = 'absolute';
    eyes.style.width = '10px';
    eyes.style.height = '10px';
    eyes.style.backgroundColor = variation.eyeColor;
    eyes.style.borderRadius = '50%';
    eyes.style.top = '20px';
    eyes.style.left = '15px';
    eyes.style.boxShadow = '25px 0 0 ' + variation.eyeColor;
    
    const cheeks = document.createElement('div');
    cheeks.style.position = 'absolute';
    cheeks.style.width = '15px';
    cheeks.style.height = '8px';
    cheeks.style.backgroundColor = variation.cheekColor;
    cheeks.style.borderRadius = '50%';
    cheeks.style.bottom = '15px';
    cheeks.style.left = '22px';
    
    dollHead.appendChild(eyes);
    dollHead.appendChild(cheeks);
    
    // 根据体型变化
    if (variation.bodyShape === 'thin') {
        dollBody.style.width = '30px';
        dollBody.style.left = '35px';
        dollLegs.style.width = '30px';
        dollLegs.style.left = '35px';
    } else if (variation.bodyShape === 'wide') {
        dollBody.style.width = '50px';
        dollBody.style.left = '25px';
        dollLegs.style.width = '50px';
        dollLegs.style.left = '25px';
    } else if (variation.bodyShape === 'short') {
        dollBody.style.height = '60px';
        dollLegs.style.top = '110px';
    } else if (variation.bodyShape === 'tall') {
        dollBody.style.height = '100px';
        dollLegs.style.top = '150px';
    }
    
    // 添加生成动画
    doll.style.animation = 'fadeIn 1s';
    
    // 滚动到小人区域
    dollSection.scrollIntoView({ behavior: 'smooth' });
    
    // 显示初始对话
    showSpeech(`${victimName}的小人已生成，你可以开始折磨了...`);
    
    // 添加诡异的生成音效
    playCreepySound('generate');
}

// 使用工具函数
function useTool(toolType) {
    // 检查是否已生成小人
    if (dollSection.classList.contains('hidden')) {
        alert('请先生成小人');
        return;
    }
    
    // 移除之前的效果类
    doll.className = 'doll';
    
    // 添加新的效果类
    doll.classList.add(`${toolType}-effect`);
    doll.classList.add('pain');
    
    // 获取对应工具的求饶语句
    const toolSpecificPleadings = toolPleadings[toolType];
    const randomPleading = toolSpecificPleadings[Math.floor(Math.random() * toolSpecificPleadings.length)];
    
    // 显示求饶语句
    showSpeech(randomPleading);
    
    // 播放对应的音效
    playCreepySound(toolType);
    
    // 添加屏幕抖动效果
    document.body.classList.add('screen-shake');
    setTimeout(() => {
        document.body.classList.remove('screen-shake');
    }, 500);
}

// 显示对话气泡
function showSpeech(text) {
    speechBubble.textContent = text;
    speechBubble.classList.remove('hidden');
    
    // 清除之前的定时器
    if (speechBubble.timeoutId) {
        clearTimeout(speechBubble.timeoutId);
    }
    
    // 设置新的定时器，5秒后隐藏对话
    speechBubble.timeoutId = setTimeout(() => {
        speechBubble.classList.add('hidden');
    }, 5000);
}

// 播放Q版音效
function playCreepySound(type) {
    // 在实际应用中，这里可以添加音效播放逻辑
    // 由于这是一个纯前端演示，我们使用AudioContext API模拟一些简单的音效
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // 根据工具类型创建不同的音效
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'needle':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
            
        case 'shoe':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
            
        case 'fire':
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(550, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(300, audioContext.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
            
        case 'water':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(200, audioContext.currentTime + 0.4);
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
            
        case 'curse':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(400, audioContext.currentTime + 0.7);
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.7);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.7);
            break;
            
        case 'generate':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
    }
}

// 添加可爱的背景效果
function addCreepyBackgroundEffects() {
    // 创建闪烁效果
    setInterval(() => {
        if (Math.random() < 0.05) { // 5%的概率闪烁
            document.body.style.backgroundColor = '#ffcef9';
            setTimeout(() => {
                document.body.style.backgroundColor = '#fce4ff';
            }, 100);
        }
    }, 2000);
    
    // 随机添加背景音效
    setInterval(() => {
        if (Math.random() < 0.1) { // 10%的概率播放背景音效
            const audioTypes = ['needle', 'shoe', 'fire', 'water', 'curse'];
            const randomType = audioTypes[Math.floor(Math.random() * audioTypes.length)];
            playCreepySound(randomType);
        }
    }, 10000);
}