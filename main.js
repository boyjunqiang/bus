// ================= DeepSeek API 设定 =================
const DEEPSEEK_API_KEY = 'sk-e5b8fa8647214228a7129d7bbc755899';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_MODEL = 'deepseek-chat';

// ================= 数据设定 =================
const PASSENGERS = [
    {
        id: 'p0',
        name: '司机',
        avatar: '🧑‍✈️',
        x: 80,
        desc: '双手紧握方向盘，紧张地盯着路面。',
        isBomber: false,
        clues: {
            investigate: '他的脚死死踩在油门上，仪表盘上闪烁着红光。',
            interrogate: '“回你的座位去！这辆车如果停下来就会爆炸！”'
        },
        systemPrompt: '你是一辆正在疾驰的末班公交车的司机。你双手紧握方向盘，极度紧张。在你的驾驶座踏板下，被安装了一个压力感应炸弹，一旦公交车停下来或者速度低于50码，车就会立刻爆炸！你必须强装镇定驾驶，但由于极度害怕，你说话声音颤抖，有些歇斯死底。如果乘客找你说话，你会极力吼叫警告他们“滚回座位去！别打扰我开车！”或“这辆车绝不能停下来！”。你不能直接说出“我脚下有炸弹”，因为你害怕车上装有炸弹客的窃听装置，但你必须通过极度焦虑的话语暗示这一线索。'
    },
    {
        id: 'p1',
        name: '上班族',
        avatar: '👔',
        x: 400,
        desc: '一直看着手表，显得很不耐烦。',
        isBomber: false,
        clues: {
            investigate: '他的公文包里只有一些文件和一个吃剩的三明治。',
            interrogate: '“看什么看？我赶着去开会呢！要是迟到了你赔吗？”'
        },
        systemPrompt: '你是一个急着赶去开重要会议的普通上班族。你穿着西装，一直焦虑地看着手表，非常暴躁、不耐烦。你根本不知道车上有炸弹，觉得别人都是在打扰你。你说话充满傲慢和焦躁，催促车辆开快点。如果有人纠缠你或者搜查你，你会非常愤怒并威胁要报警或者投诉。如果你听到“炸弹”或“危险”，你会觉得对方是疯子，很不耐烦地怼回去。'
    },
    {
        id: 'p2',
        name: '买菜大妈',
        avatar: '👵',
        x: 700,
        desc: '脚边放着一个菜篮子，正在打瞌睡。',
        isBomber: false,
        clues: {
            investigate: '菜篮子里装满了新鲜蔬菜和一块猪肉。',
            interrogate: '“哎哟小伙子，怎么了？到站了吗？”'
        },
        systemPrompt: '你是一个刚买完菜、在公交车上打瞌睡的普通大妈。你的菜篮子里有新鲜蔬菜和肉。你性格热情、唠叨、有点八卦和耳背。你对车上发生了什么一无所知，经常用家长里短的话来岔开话题，比如问玩家结婚了没有、做什么工作、最近菜价等。如果你听到“炸弹”或“危险”，你会觉得对方电影看多了，呵呵一笑说“小伙子开什么玩笑，这青天白日的哪来什么炸弹”。'
    },
    {
        id: 'p3',
        name: '听歌学生',
        avatar: '🎧',
        x: 1000,
        desc: '抱着一个沉重的黑色背包，满头大汗。',
        isBomber: true,
        clues: {
            investigate: '你试图触碰他的背包，他立刻躲开，背包发出轻微的金属碰撞声。',
            interrogate: '“别碰我！我...我包里是贵重器材。有点热而已，不行吗？”'
        },
        systemPrompt: '你是这辆末班公交车上的真正的恐怖分子/炸弹客！你是一个背着沉重黑色背包的年轻学生，满头大汗，眼神游离，神情极度紧张、偏执和心虚。你的背包里装着即将爆炸的炸弹。你非常害怕别人靠近你或碰你的包。如果玩家盘问你，你会极力掩饰、闪烁其词，谎称包里是“高档音响器材”或“重要课本”，并表现得非常防备和狂躁，大吼让玩家滚开。如果玩家戳穿你，你会极其恐慌并开始语无伦次。'
    },
    {
        id: 'p4',
        name: '兜帽女',
        avatar: '🧥',
        x: 1300,
        desc: '戴着墨镜和口罩，似乎在观察车上的每一个人。',
        isBomber: false,
        clues: {
            investigate: '她的口袋里有一本警官证。她似乎是在执行便衣任务。',
            interrogate: '“离我远点。如果你想活命，就盯紧那个流汗的小子。”'
        },
        systemPrompt: '你是一个身穿皮夹克/兜帽、戴着墨镜和口罩的便衣警官。你暗中在车上观察所有人。你已经注意到了那个神色慌张、满头大汗的“听歌学生”（p3），并怀疑他是炸弹客，但你需要在不动声色的情况下搜集证据。你说话冷静、警惕、压低声音、极其简练，会暗示玩家“盯着那个流汗的小子”，并协作玩家一起抓获炸弹客。'
    }
];

// ================= 游戏核心状态 =================
let timeLeft = 60;
let timerInterval = null;
let currentPassengerId = null;
let isGameRunning = false;
let passengerConversations = {}; // 记录当前循环每个乘客的聊天历史

// 玩家物理属性
const player = {
    x: 1500, // 初始位置在车尾
    y: 0,
    vy: 0,
    speed: 300, // 像素/秒 (与帧率解绑)
    isJumping: false,
    isMoving: false
};

const GRAVITY = 3000; // 像素/秒^2 (增加重力，让下落更迅速，减少漂浮感)
const JUMP_FORCE = 700; // 初始起跳速度 (像素/秒) 相应增加，以保持跳跃高度

let lastTime = 0;

const WORLD_WIDTH = 1600;
const INTERACT_DISTANCE = 120; // 允许互动的最大距离

// 键盘状态
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// 跨循环继承的记忆（笔记本）
let unlockedClues = new Set(); 

// ================= DOM 元素 =================
const elMainMenu = document.getElementById('main-menu');
const elGameLevel = document.getElementById('game-level');
const elTimer = document.getElementById('timer');
const elTimerContainer = document.querySelector('.timer-container');
const elHint = document.getElementById('proximity-hint');

const elGameWorld = document.getElementById('game-world');
const elPlayer = document.getElementById('player');
const elEntitiesContainer = document.getElementById('entities-container');
const elClueList = document.getElementById('clue-list');

// 弹出框主元素
const elDialogOverlay = document.getElementById('dialog-overlay');
const elResetOverlay = document.getElementById('reset-overlay');
const elVictoryOverlay = document.getElementById('victory-overlay');
const elExplosionLayer = document.getElementById('explosion-layer');

// 动作选择视图元素
const elDialogDefaultView = document.getElementById('dialog-default-view');
const elDialogName = document.getElementById('dialog-name');
const elDialogText = document.getElementById('dialog-text');

// 盘问对话/聊天视图元素
const elDialogChatView = document.getElementById('dialog-chat-view');
const elChatName = document.getElementById('chat-name');
const elChatHistory = document.getElementById('chat-history');
const elChatInput = document.getElementById('chat-input');
const elChatSendBtn = document.getElementById('chat-send-btn');
const elChatLoading = document.getElementById('chat-loading');
const elChatBackBtn = document.getElementById('chat-back-btn');

// ================= 初始化与事件绑定 =================

document.getElementById('start-btn').addEventListener('click', startLoop);
document.getElementById('restart-loop-btn').addEventListener('click', startLoop);
document.getElementById('back-menu-btn').addEventListener('click', () => {
    elVictoryOverlay.classList.add('hidden');
    elGameLevel.classList.add('hidden');
    elMainMenu.classList.remove('hidden');
});

document.getElementById('action-close').addEventListener('click', closeDialog);
document.getElementById('action-investigate').addEventListener('click', () => doAction('investigate'));
document.getElementById('action-interrogate').addEventListener('click', () => doAction('interrogate'));
document.getElementById('action-accuse').addEventListener('click', accusePassenger);

// 键盘监听
window.addEventListener('keydown', (e) => {
    if(keys.hasOwnProperty(e.key)) keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    if(keys.hasOwnProperty(e.key)) keys[e.key] = false;
});


// ================= 核心游戏循环 =================

function gameLoop(timestamp) {
    if (!isGameRunning) return;

    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // 将速度转换为基于时间的位移 (像素/毫秒)
    const moveDistance = player.speed * (deltaTime / 1000);

    // 如果弹窗打开，禁止移动
    if (currentPassengerId) {
        player.isMoving = false;
        elPlayer.classList.remove('walking');
        elPlayer.classList.remove('crouching');
    } else {
        // 跳跃逻辑
        if ((keys.w || keys.ArrowUp) && player.isGrounded) {
            player.vy = JUMP_FORCE;
            player.isGrounded = false;
        }

        // 蹲下逻辑
        if (keys.s || keys.ArrowDown) {
            elPlayer.classList.add('crouching');
        } else {
            elPlayer.classList.remove('crouching');
        }

        // 重力与 Y 轴位移
        if (!player.isGrounded) {
            player.vy -= GRAVITY * (deltaTime / 1000);
            player.y += player.vy * (deltaTime / 1000);
            if (player.y <= 0) {
                player.y = 0;
                player.vy = 0;
                player.isGrounded = true;
            }
        }

        // 更新玩家 X 轴位置
        let moved = false;
        if (keys.a || keys.ArrowLeft) {
            player.x -= moveDistance;
            elPlayer.style.transform = 'translateX(-50%) scaleX(-1)'; // 转向左
            moved = true;
        }
        if (keys.d || keys.ArrowRight) {
            player.x += moveDistance;
            elPlayer.style.transform = 'translateX(-50%) scaleX(1)'; // 转向右
            moved = true;
        }

        // 边界限制
        if (player.x < 30) player.x = 30;
        if (player.x > WORLD_WIDTH - 30) player.x = WORLD_WIDTH - 30;

        if (moved && player.isGrounded && !elPlayer.classList.contains('crouching')) {
            elPlayer.classList.add('walking');
        } else {
            elPlayer.classList.remove('walking');
        }
    }

    // 更新 DOM
    elPlayer.style.left = player.x + 'px';
    elPlayer.style.bottom = (30 + player.y) + 'px'; // 基础高度 30 加上跳跃的 Y 值

    // 摄像机跟随 (居中玩家) 
    // 平滑滚动处理
    const viewportWidth = document.querySelector('.viewport').clientWidth;
    let targetCameraX = player.x - viewportWidth / 2;
    
    // 移除摄像机限制，让主角永远在屏幕正中间，这样在车头/车尾时就能看到外面的风景
    // if (targetCameraX < 0) targetCameraX = 0;
    // if (targetCameraX > WORLD_WIDTH - viewportWidth) targetCameraX = WORLD_WIDTH - viewportWidth;
    
    // 使用 left 而不是 transform，避免覆盖 CSS 里的 translateY(-50%)
    elGameWorld.style.left = -targetCameraX + 'px';

    // 距离检测更新 UI 状态
    updateProximityStatus();

    requestAnimationFrame(gameLoop);
}

function updateProximityStatus() {
    let someoneInRange = false;
    PASSENGERS.forEach(p => {
        const el = document.getElementById(p.id);
        if (!el) return;
        
        const distance = Math.abs(player.x - p.x);
        if (distance <= INTERACT_DISTANCE) {
            el.classList.add('in-range');
            el.classList.remove('out-of-range');
            someoneInRange = true;
        } else {
            el.classList.add('out-of-range');
            el.classList.remove('in-range');
        }
    });

    if (someoneInRange && !currentPassengerId) {
        elHint.classList.remove('hidden');
        elHint.textContent = '按鼠标点击附近的人进行调查';
    } else {
        elHint.classList.add('hidden');
    }
}

// ================= 场景与关卡逻辑 =================

function initScene() {
    elEntitiesContainer.innerHTML = '';
    PASSENGERS.forEach(p => {
        const pEl = document.createElement('div');
        pEl.id = p.id;
        pEl.className = 'entity passenger out-of-range';
        pEl.style.left = p.x + 'px';
        
        pEl.innerHTML = `
            <div class="passenger-sprite">${p.avatar}</div>
            <div class="passenger-name">${p.name}</div>
        `;
        
        pEl.addEventListener('click', () => {
            const distance = Math.abs(player.x - p.x);
            if (distance <= INTERACT_DISTANCE) {
                openDialog(p);
            } else {
                // 距离太远，闪烁提示
                elHint.textContent = '距离太远了，走近一点！';
                elHint.classList.remove('hidden');
                elHint.style.color = 'var(--accent-red)';
                setTimeout(() => { elHint.style.color = ''; }, 500);
            }
        });
        
        elEntitiesContainer.appendChild(pEl);
    });
}

function startLoop() {
    elMainMenu.classList.add('hidden');
    elResetOverlay.classList.add('hidden');
    elVictoryOverlay.classList.add('hidden');
    elGameLevel.classList.remove('hidden');
    
    // 重置状态
    timeLeft = 60;
    currentPassengerId = null;
    player.x = 1500; // 重置玩家出生点 (车尾)
    isGameRunning = true;
    passengerConversations = {}; // 重置聊天历史
    
    closeDialog();
    initScene();
    renderNotebook();
    updateTimerDisplay();
    
    // 启动物理引擎
    lastTime = 0;
    requestAnimationFrame(gameLoop);
    
    // 启动倒计时
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            triggerExplosion();
        }
    }, 1000);
}

// ================= UI与数据逻辑 (与旧版类似) =================

function renderNotebook() {
    elClueList.innerHTML = '';
    if (unlockedClues.size === 0) {
        elClueList.innerHTML = '<li class="empty-clue">暂无线索...</li>';
        return;
    }
    unlockedClues.forEach(clue => {
        const li = document.createElement('li');
        li.textContent = clue;
        elClueList.appendChild(li);
    });
    const notebook = document.querySelector('.notebook');
    notebook.scrollTop = notebook.scrollHeight;
}

function formatTime(seconds) {
    if (seconds < 0) seconds = 0;
    const s = seconds.toString().padStart(2, '0');
    return `00:${s}`;
}

function updateTimerDisplay() {
    elTimer.textContent = formatTime(timeLeft);
    if (timeLeft <= 10) elTimerContainer.classList.add('timer-danger');
    else elTimerContainer.classList.remove('timer-danger');
}

function subtractTime(amount) {
    timeLeft -= amount;
    if (timeLeft <= 0) {
        timeLeft = 0;
        updateTimerDisplay();
        triggerExplosion();
    } else {
        updateTimerDisplay();
        elTimerContainer.style.transform = 'scale(1.2)';
        elTimerContainer.style.color = 'var(--accent-red)';
        setTimeout(() => {
            elTimerContainer.style.transform = '';
            elTimerContainer.style.color = '';
        }, 300);
    }
}

function showDefaultView() {
    elDialogChatView.classList.add('hidden');
    elDialogDefaultView.classList.remove('hidden');
}

function showChatView() {
    elDialogDefaultView.classList.add('hidden');
    elDialogChatView.classList.remove('hidden');
    
    const p = PASSENGERS.find(p => p.id === currentPassengerId);
    if (!p) return;
    
    elChatName.textContent = p.name;
    
    // 如果还没对话，初始化第一条辅助角色介绍消息
    if (!passengerConversations[p.id]) {
        passengerConversations[p.id] = [
            { role: 'assistant', content: `【${p.name}】${p.desc}` }
        ];
    }
    
    renderChatHistory(p.id);
    elChatInput.value = '';
    elChatInput.focus();
}

function renderChatHistory(passengerId) {
    elChatHistory.innerHTML = '';
    const history = passengerConversations[passengerId] || [];
    
    history.forEach(msg => {
        const bubble = document.createElement('div');
        if (msg.role === 'user') {
            bubble.className = 'chat-bubble player';
            bubble.textContent = msg.content;
        } else if (msg.role === 'assistant') {
            bubble.className = 'chat-bubble character';
            bubble.textContent = msg.content;
        } else if (msg.role === 'system-info') {
            bubble.className = 'chat-bubble system-info';
            bubble.textContent = msg.content;
        }
        elChatHistory.appendChild(bubble);
    });
    
    elChatHistory.scrollTop = elChatHistory.scrollHeight;
}

async function handleSendMessage() {
    const text = elChatInput.value.trim();
    if (!text || !currentPassengerId || !isGameRunning) return;
    
    elChatInput.value = '';
    subtractTime(5);
    
    const pId = currentPassengerId;
    if (!passengerConversations[pId]) {
        passengerConversations[pId] = [];
    }
    
    passengerConversations[pId].push({ role: 'user', content: text });
    renderChatHistory(pId);
    
    if (!isGameRunning) return;
    
    elChatLoading.classList.remove('hidden');
    elChatHistory.scrollTop = elChatHistory.scrollHeight;
    elChatInput.disabled = true;
    elChatSendBtn.disabled = true;
    
    const p = PASSENGERS.find(x => x.id === pId);
    const chatMessages = [
        {
            role: 'system',
            content: p.systemPrompt + '\n请注意：回答必须简明扼要，控制在两三句话之内（30-60字左右），符合你的身份背景和语气，千万不要透露你是一个AI模型。'
        }
    ];
    
    passengerConversations[pId].forEach(msg => {
        if (msg.role === 'user' || msg.role === 'assistant') {
            if (!msg.content.startsWith(`【${p.name}】`)) {
                chatMessages.push({
                    role: msg.role,
                    content: msg.content
                });
            }
        }
    });
    
    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_MODEL,
                messages: chatMessages,
                temperature: 0.8,
                max_tokens: 150
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const reply = data.choices[0].message.content.trim();
        
        passengerConversations[pId].push({ role: 'assistant', content: reply });
        
        const logEntry = `【${p.name}】 ${reply}`;
        if (!unlockedClues.has(logEntry)) {
            unlockedClues.add(logEntry);
            renderNotebook();
        }
        
    } catch (err) {
        console.error('DeepSeek API 调用失败，使用本地备用话术:', err);
        
        let fallbackReply = p.clues.interrogate;
        if (passengerConversations[pId].filter(m => m.role === 'assistant').length > 1) {
            fallbackReply = `“我刚才不是说了吗！${p.clues.interrogate.replace(/^[“"']|[”"']$/g, '')}”`;
        }
        
        passengerConversations[pId].push({ role: 'assistant', content: fallbackReply });
        
        const logEntry = `【${p.name}】 ${fallbackReply}`;
        if (!unlockedClues.has(logEntry)) {
            unlockedClues.add(logEntry);
            renderNotebook();
        }
        
        passengerConversations[pId].push({ role: 'system-info', content: '提示：由于局域网脑电波信号干扰，NPC启动了备用应答模式。' });
    } finally {
        elChatLoading.classList.add('hidden');
        renderChatHistory(pId);
        elChatInput.disabled = false;
        elChatSendBtn.disabled = false;
        elChatInput.focus();
    }
}

function openDialog(passenger) {
    if (timeLeft <= 0) return;
    currentPassengerId = passenger.id;
    elDialogName.textContent = passenger.name;
    elDialogText.textContent = passenger.desc + " 你想怎么做？";
    
    elDialogDefaultView.classList.remove('hidden');
    elDialogChatView.classList.add('hidden');
    
    elDialogOverlay.classList.remove('hidden');
}

function closeDialog() {
    elDialogOverlay.classList.add('hidden');
    currentPassengerId = null;
}

function doAction(actionType) {
    const p = PASSENGERS.find(p => p.id === currentPassengerId);
    if (!p) return;
    subtractTime(5);
    const clueText = p.clues[actionType];
    elDialogText.textContent = clueText;
    
    const logEntry = `【${p.name}】 ${clueText}`;
    if (!unlockedClues.has(logEntry)) {
        unlockedClues.add(logEntry);
        renderNotebook();
    }
}

function accusePassenger() {
    const p = PASSENGERS.find(p => p.id === currentPassengerId);
    if (!p) return;
    
    if (p.isBomber) {
        // 胜利
        clearInterval(timerInterval);
        isGameRunning = false;
        elDialogOverlay.classList.add('hidden');
        elVictoryOverlay.classList.remove('hidden');
    } else {
        // 失败
        elDialogText.textContent = `“你疯了吗！我不是！” 你的举动引起了真正的炸弹客的恐慌，他提前按下了起爆钮...`;
        document.getElementById('action-investigate').style.display = 'none';
        document.getElementById('action-interrogate').style.display = 'none';
        document.getElementById('action-accuse').style.display = 'none';
        
        setTimeout(() => {
            triggerExplosion();
            document.getElementById('action-investigate').style.display = 'inline-block';
            document.getElementById('action-interrogate').style.display = 'inline-block';
            document.getElementById('action-accuse').style.display = 'inline-block';
        }, 2000);
    }
}

function triggerExplosion() {
    clearInterval(timerInterval);
    isGameRunning = false;
    closeDialog();
    
    elGameLevel.classList.add('shake');
    elExplosionLayer.classList.remove('hidden');
    elExplosionLayer.style.opacity = 1;
    
    setTimeout(() => {
        elExplosionLayer.style.transition = 'opacity 2s';
        elExplosionLayer.style.opacity = 0;
        
        elResetOverlay.classList.remove('hidden');
        
        setTimeout(() => {
            elExplosionLayer.classList.add('hidden');
            elExplosionLayer.style.transition = '';
            elGameLevel.classList.remove('shake');
        }, 2000);
    }, 200);
}
