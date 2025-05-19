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
    "求求你放过我吧...",
    "好痛啊！停下来！",
    "我再也不敢了...",
    "啊！！！救命！",
    "我错了，我真的错了！",
    "不要再折磨我了...",
    "我愿意道歉！",
    "饶了我这一次吧...",
    "我保证以后再也不会了！",
    "痛死了！住手！"
];

// 工具对应的求饶语句
const toolPleadings = {
    needle: [
        "啊！针刺好痛！",
        "不要再扎我了！",
        "针扎的感觉太可怕了！",
        "我的身体被针刺穿了！"
    ],
    shoe: [
        "别踩我！好痛！",
        "鞋子好重！要被踩扁了！",
        "不要再拍打我了！",
        "我快被踩死了！"
    ],
    fire: [
        "好烫！我在燃烧！",
        "救火！我要被烧死了！",
        "火焰太可怕了！",
        "我全身都在燃烧！"
    ],
    water: [
        "救命！我要淹死了！",
        "我不会游泳！",
        "水太冷了！我受不了！",
        "我快要窒息了！"
    ],
    curse: [
        "诅咒的力量在吞噬我...",
        "我感觉生命在流失...",
        "这个诅咒太强大了！",
        "黑暗力量在侵蚀我的灵魂！"
    ]
};

// 小人的外观变化
const dollVariations = [
    {
        head: "#ddd",
        body: "#ccc",
        headShape: "50%",
        bodyShape: "normal"
    },
    {
        head: "#d5d5d5",
        body: "#c5c5c5",
        headShape: "40%",
        bodyShape: "thin"
    },
    {
        head: "#e0e0e0",
        body: "#d0d0d0",
        headShape: "45%",
        bodyShape: "wide"
    },
    {
        head: "#ccc",
        body: "#bbb",
        headShape: "35%",
        bodyShape: "short"
    },
    {
        head: "#ddd",
        body: "#ccc",
        headShape: "55%",
        bodyShape: "tall"
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

// 播放诡异音效
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
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(880, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
            
        case 'shoe':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
            
        case 'fire':
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(350, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(100, audioContext.currentTime + 1);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 1);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1);
            break;
            
        case 'water':
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(50, audioContext.currentTime + 0.8);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.8);
            break;
            
        case 'curse':
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(120, audioContext.currentTime + 1.5);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1.5);
            break;
            
        case 'generate':
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.linearRampToValueAtTime(400, audioContext.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.2);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 1);
            break;
    }
}

// 添加诡异的背景效果
function addCreepyBackgroundEffects() {
    // 创建闪烁效果
    setInterval(() => {
        if (Math.random() < 0.05) { // 5%的概率闪烁
            document.body.style.backgroundColor = '#300';
            setTimeout(() => {
                document.body.style.backgroundColor = '#000';
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