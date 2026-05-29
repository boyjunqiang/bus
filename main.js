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
        systemPrompt: '你是一辆正在疾驰的末班公交车的司机。你双手紧握方向盘，极度紧张。在你的驾驶座踏板下，被安装了一个压力感应炸弹，一旦公交车停下来或者速度低于50码，车就会立刻爆炸！你必须强装镇定驾驶，但由于极度害怕，你说话声音颤抖，有些歇斯底里。如果乘客找你说话，你会极力吼叫警告他们“滚回座位去！别打扰我开车！”或“这辆车绝不能停下来！”。你不能直接说出“我脚下有炸弹”，因为你害怕车上装有炸弹客的窃听装置，但你必须通过极度焦虑的话语暗示这一线索。'
    },
    {
        id: 'p1',
        name: '上班族',
        avatar: '👔',
        x: 450,
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
        name: '老奶奶',
        avatar: '👵',
        x: 850,
        desc: '怀里紧紧抱着一个沉甸甸的红色高压锅，神色慈祥但双手在微微发抖。',
        isBomber: true, // 老奶奶是隐藏的炸弹客！
        clues: {
            investigate: '你试图查看她怀里的高压锅，老奶奶惊恐地往怀里紧了紧。你隐约听到高压锅里传出定时器“滴答滴答”的细微响声和冰冷的金属线圈碰撞声。',
            interrogate: '“小伙子，这高压锅里炖着给我家老头子的排骨汤呢，凉了就不好喝了，你可别想偷喝呀...”'
        },
        systemPrompt: '你表面上是一个看起来极为慈祥、和蔼可亲的买菜送汤老奶奶，但实际上你才是这辆公交车上真正的毁灭性炸弹客！你怀里紧紧抱着的红色高压锅里，塞满了你精心制作、带有电子倒计时的自制压力锅炸弹。你性格深处极其疯狂、偏执、反社会，说话时会利用温和的长辈语气作伪装（例如叫玩家“孩子”、“小家伙”，念叨着老伴生病要送排骨汤等），但如果玩家试图触碰或抢夺你的高压锅，或者发问极其尖锐戳穿了你的伪装，你的语气会瞬间变得诡异、阴冷、偏执，甚至发出让人毛骨悚然的尖笑声，威胁要按下手动引爆器。绝对不能让他们抢走你的高压锅！'
    },
    {
        id: 'p4',
        name: '兜帽女',
        avatar: '🧥',
        x: 1250,
        desc: '戴着兜帽、墨镜和口罩，正低头狂背课本，嘴里念念有词。',
        isBomber: false,
        clues: {
            investigate: '她的背包里塞满了画满红线的复习资料和准考证，上面写着“高数期末考试”。',
            interrogate: '“别跟我说话！我拉格朗日中值定理还没背熟呢，挂科了你赔我啊？”'
        },
        systemPrompt: '你是一个戴着大兜帽、墨镜和口罩的普通女大学生。你正坐在公交车上疯狂临阵磨枪，背诵高数期末考试公式。你因为昨晚熬夜刷题极度缺觉、焦虑和烦躁。你根本不知道车上有炸弹，更不知道谁是罪犯。你只希望别人不要打扰你学习。如果玩家找你说话，你会用非常疲惫、焦虑和抗拒的语气打发他们，嘴里嘟囔着各种数学公式（如微积分、求导公式等），抱怨考试要迟到了。如果玩家问你关于炸弹的事，你会觉得对方是在故意讲笑话或想打扰你复习，极度暴躁地怼回去。'
    }
];

// ================= 交互物品数据设定 =================
const INTERACTIVE_ITEMS = [
    {
        id: 'item_rack',
        name: '置物架皮箱',
        avatar: '🧳',
        x: 600,
        y: 200, // 行李架高度
        desc: '车厢上方金属置物架上，斜放着一只积满厚灰的旧皮箱。',
        clues: {
            investigate: '你踮起脚尖打开了旧皮箱，里面空空如也，只有几张十几年前的旧报纸和一把坏掉的烂雨伞。并没有找到任何与炸弹相关的线索。'
        }
    },
    {
        id: 'item_floorbag',
        name: '座位下的手提包',
        avatar: '👜',
        x: 1050,
        y: 0, // 地板上
        desc: '空荡荡的座位底下，静静躺着一只脏兮兮的深蓝色旅行包。',
        clues: {
            investigate: '你蹲下身拉开包的拉链，里面塞了一套散发微臭的脏运动服、一双磨损严重的球鞋和半瓶矿泉水。似乎只是某个马虎乘客落下的健身包。'
        }
    }
];

// ================= 游戏核心状态 =================
let timeLeft = 60;
let timerInterval = null;
let currentPassengerId = null;
let currentDialogIsItem = false; // 记录当前打开的是否是物品
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
document.getElementById('action-interrogate').addEventListener('click', showChatView);
document.getElementById('action-accuse').addEventListener('click', accusePassenger);

elChatBackBtn.addEventListener('click', showDefaultView);
elChatSendBtn.addEventListener('click', handleSendMessage);
elChatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !elChatSendBtn.disabled) {
        handleSendMessage();
    }
});

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
    const viewportWidth = document.querySelector('.viewport').clientWidth;
    let targetCameraX = player.x - viewportWidth / 2;
    
    elGameWorld.style.left = -targetCameraX + 'px';

    // 距离检测更新 UI 状态
    updateProximityStatus();

    requestAnimationFrame(gameLoop);
}

function updateProximityStatus() {
    let someoneInRange = false;
    
    // 乘客距离检查
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

    // 物品距离检查
    INTERACTIVE_ITEMS.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el) return;
        
        const distance = Math.abs(player.x - item.x);
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
        elHint.textContent = '点击附近的人或物进行调查';
    } else {
        elHint.classList.add('hidden');
    }
}

// ================= 场景与关卡逻辑 =================

function initScene() {
    elEntitiesContainer.innerHTML = '';
    
    // 渲染乘客
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
                openDialog(p, false);
            } else {
                showProximityWarning();
            }
        });
        
        elEntitiesContainer.appendChild(pEl);
    });

    // 渲染交互物品
    INTERACTIVE_ITEMS.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.id = item.id;
        const isHigh = item.y > 100;
        itemEl.className = `entity interactive-item out-of-range ${isHigh ? 'high-item' : ''}`;
        itemEl.style.left = item.x + 'px';
        
        itemEl.innerHTML = `
            <div class="item-sprite">${item.avatar}</div>
            <div class="item-name">${item.name}</div>
        `;
        
        itemEl.addEventListener('click', () => {
            const distance = Math.abs(player.x - item.x);
            if (distance <= INTERACT_DISTANCE) {
                openDialog(item, true);
            } else {
                showProximityWarning();
            }
        });
        
        elEntitiesContainer.appendChild(itemEl);
    });
}

function showProximityWarning() {
    elHint.textContent = '距离太远了，走近一点！';
    elHint.classList.remove('hidden');
    elHint.style.color = 'var(--accent-red)';
    setTimeout(() => { elHint.style.color = ''; }, 500);
}

function startLoop() {
    elMainMenu.classList.add('hidden');
    elResetOverlay.classList.add('hidden');
    elVictoryOverlay.classList.add('hidden');
    elGameLevel.classList.remove('hidden');
    
    // 重置状态
    timeLeft = 60;
    currentPassengerId = null;
    currentDialogIsItem = false;
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

// ================= UI与数据逻辑 =================

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

// ================= 聊天与盘问逻辑 =================

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

// ================= 弹窗交互动作逻辑 =================

function openDialog(entity, isItem = false) {
    if (timeLeft <= 0) return;
    currentPassengerId = entity.id;
    currentDialogIsItem = isItem;
    
    elDialogName.textContent = entity.name;
    elDialogText.textContent = entity.desc + " 你想怎么做？";
    
    const btnInvestigate = document.getElementById('action-investigate');
    const btnInterrogate = document.getElementById('action-interrogate');
    const btnAccuse = document.getElementById('action-accuse');
    
    if (isItem) {
        btnInterrogate.style.display = 'none';
        btnAccuse.style.display = 'none';
        btnInvestigate.textContent = '打开/搜查 (-5秒)';
    } else {
        btnInterrogate.style.display = 'inline-block';
        btnAccuse.style.display = 'inline-block';
        btnInvestigate.textContent = '搜查 (-5秒)';
    }
    
    elDialogDefaultView.classList.remove('hidden');
    elDialogChatView.classList.add('hidden');
    
    elDialogOverlay.classList.remove('hidden');
}

function closeDialog() {
    elDialogOverlay.classList.add('hidden');
    currentPassengerId = null;
}

function doAction(actionType) {
    const entity = currentDialogIsItem
        ? INTERACTIVE_ITEMS.find(item => item.id === currentPassengerId)
        : PASSENGERS.find(p => p.id === currentPassengerId);
        
    if (!entity) return;
    subtractTime(5);
    const clueText = entity.clues[actionType];
    elDialogText.textContent = clueText;
    
    const logEntry = `【${entity.name}】 ${clueText}`;
    if (!unlockedClues.has(logEntry)) {
        unlockedClues.add(logEntry);
        renderNotebook();
    }
}

function accusePassenger() {
    const p = PASSENGERS.find(p => p.id === currentPassengerId);
    if (!p || currentDialogIsItem) return;
    
    if (p.isBomber) {
        // 胜利
        clearInterval(timerInterval);
        isGameRunning = false;
        elDialogOverlay.classList.add('hidden');
        elVictoryOverlay.classList.remove('hidden');
    } else {
        // 失败
        elDialogText.textContent = `“你疯了吗！我不是！” 你的举动引起了真正的炸弹客的恐慌，她提前按下了起爆钮...`;
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
    
    // 触发超大震撼抖动与全屏红黄色火光
    elGameLevel.classList.remove('shake');
    elGameLevel.classList.add('violent-shake');
    elExplosionLayer.classList.remove('hidden');
    elExplosionLayer.classList.add('active');
    
    setTimeout(() => {
        // 1.5秒后切入复活重置视窗
        elResetOverlay.classList.remove('hidden');
        
        setTimeout(() => {
            elExplosionLayer.classList.remove('active');
            elExplosionLayer.classList.add('hidden');
            elGameLevel.classList.remove('violent-shake');
        }, 1500);
    }, 1500);
}
