// utilities
var sleepSetTimeout_ctrl;

function sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

var imgSource = {
    "cat": "cat.jpeg",
    "dog": "dog.jpg"
}

// controller for the character images

async function changeCharacter(name, animation){
    var currentImage = document.getElementById('characterShown');
    if(currentImage != null){
        currentImage.remove();
    }
    if(animation == "fade-in")  $("#gameImage").append("<img id='characterShown' src='" + name + "' class='inGameImage fadeInImage'/>");
    else if(animation == "shake")  $("#gameImage").append("<img id='characterShown' src='" + name + "' class='inGameImage shakeImage'/>");
    else if(animation == "nod")  $("#gameImage").append("<img id='characterShown' src='" + name + "' class='inGameImage nodImage'/>");
    else $("#gameImage").append("<img id='characterShown' src='" + name + "' class='inGameImage'/>");
}

// controller for the texts
var textIndex = 0;
var text;
var speed = 50;
var textDuration = 6000;
var waitingDuration = 3000;

function speedUp(){
    if(speed == 0) waitingDuration = 0;
    speed = 0;
}

function initiateText(newText){
    document.getElementById("gameText").innerHTML = "";
    textIndex = 0;
    text = newText;
    speed = (textDuration / newText.length);
    waitingDuration = newText.length * 40;
    changeText();
}

function changeText(){
    if (textIndex < text.length) {
        document.getElementById("gameText").innerHTML += text.charAt(textIndex);
        textIndex++;
        setTimeout(changeText, speed);
    }
}

// an attempt to create a sequence of actual game event

var startgameSequence = [
    ["img-fade-in", "dog"],
    ["text", "Stay away, cat! This is my territory now."],
    ["img-shake", "cat"],
    ["text", "You think you can take what's rightfully mine? Think again, dog."], 
    ["img-nod", "dog"],
    ["text", "I've had enough of your sneaky tricks, cat! It ends here."],
    ["img-none", "cat"],
    ["text", "Oh, you're in for a surprise, dog. I've got a few tricks up my sleeve too."],
    ["img-shake", "dog"],
    ["text", "This is your last chance, cat. Leave this place or face the consequences."],
    ["img-nod", "cat"],
    ["text", "I won't back down, dog. I'm not afraid of you or your empty threats."],
    ["button", "<button type=\"button\" onclick=\"gameSequence = gameSequence1_1; runGame();\">Path 1 - rock paper scissors</button><button type=\"button\" onclick=\"gameSequence = gameSequence1_2; runGame()\">What even is this path</button>"]
];

var gameSequence1_1 = [
    ["img-fade-in", "dog"],
    ["text", "Let's solve this with rock paper scissors..."],
    ["img-nod", "cat"],
    ["text", "Yea, I got the same thought as well"]
]

var gameSequence1_2 = [
    ["img-fade-in", "dog"],
    ["text", "Actually, I don't know why did I say that, as if I was controlled by some unknown beings"],
    ["img-nod", "cat"],
    ["text", "ME TOOOOOOOOOOOOOOOOOOOOOOOOOOOO! Actually let's just not fight and be friends"]
]

var options = [];

var SEG1_1 = [
	["text","Sitting in her office, Dr. Kris Wong is reviewing her patient appointments on her computer. This morning, she will be visited by Mr. Henry Chan who has been suspected of cancer. His X-ray and blood tests are sitting on her desk. "],
	["img-fade-in","Clinic"],
	["text","How will she break the bad news, explain the diagnosis, and discuss management options? You decide!"],
	["img-fade-in","Clinic + Dr. Kris Wong"],
	["text","Mr. Chan knocks on the door. He approaches slowly and sits down in front of Dr. Wong's desk. He seems to be frowning and looking unconfident. He says, meekly, \"Good morning doctor... I've sent you the tests you told me to get last time. Am I okay?\" "],
	["img-fade-in","Clinic + Mr. Chan"],
	["button", "<button type=\"button\" onclick=\"gameSequence = SEG1_2; runGame();\">\"You'll be fine.\"</button><button type=\"button\" onclick=\"gameSequence = SEG1_1_B; runGame()\">\"You seem a little anxious about the tests, aren't you? Let's talk about it today. If at some point you have a question, let me know. We'll first understand the situation then decide what we can do about it.\"</button>"]
]

var SEG1_1_B = [
	["text","\"Dr. Wong observed Mr. Chan's anxiety and fear, expressed empathy and reassured the patient's active participation in decision making. {Empathetic relationship +1}\" "],
	["run",()=>{gameSequence = SEG1_2; runGame();}]
]


var SEG1_2 = [
	["text","Dr. Wong takes out the imaging and blood test reports."],
	["button","<button type=\"button\" onclick=\"gameSequence = SEG1_3; runGame();\">\"You have cancer. If you want, we can schedule you for chemoradiation therapy.\"</button><button type=\"button\" onclick=\"gameSequence = SEG1_2_B; runGame();\">\"Your X-ray and blood report both confirm our previous suspicion that you have cancer. Our current way to control it is by using chemoradiation therapy. The radiotherapy will help kill the tumor  in bulk, then we will start 3-6 months of chemotherapy to kill the disseminated cancer cells.\" \"However, during the therapy you may feel pain, nausea, and you will have to come to the clinic on the weeks with chemotherapy cycles. Also, while it helps patients achieve several years of cancer-free survival, it does not guarantee that you will be cured permanently. Is that okay with you?\"</button>"]
]

var SEG1_2_B = [
	["text","\"Dr. Wong educates the patient on the diagnosis, explains treatment options and the potential benefits and risks before seeking consent. {Informed consent +1}\""],
	["run",()=>{gameSequence = SEG1_3; runGame();}]
]


var SEG1_3 = [
	["img-fade-in","Clinic + Mr. Chan"],
	["text","<Minigame: Patient's questions> Mr. Chan slouches and sighs. He asks,\"How does chemotherapy work?\" "],
	["buttonWait","<button type=\"button\" onclick=\"options.push(0);\">Directly killing cancer cells, controlling their growth and spread.</button><button type=\"button\" onclick=\"options.push(1);\">Feeds chemicals to strengthen your body and fight cancer cells.</button>"],
    ["text","\"What is the success rate of chemotherapy?\""],
	["buttonWait","<button type=\"button\" onclick=\"options.push(0);\">It depends on the type and stage of cancer.</button><button type=\"button\" onclick=\"options.push(1);\">100%</button>"],
	["text","\"Are there any alternative treatments?\""],
	["buttonWait","<button type=\"button\" onclick=\"options.push(0);\">\"There is also targeted therapy and immunotherapy that works for other cancer types. But in your case this treatment provides the best outcomes.\"</button><button type=\"button\" onclick=\"options.push(1);\">\"It is the only effective treatment option.\"</button>"],
	["text","Mr. Chan is making a decision based on Kris' explanation..."],
	["run",()=>{if(options[0] + options[1] + options[2] == 0){gameSequence = SEG1_3_A;}else{gameSequence = SEG2_1;} runGame();}]
]


var SEG1_3_A = [
	["text","\"Okay, I'll consent to getting the chemoradiation therapy.\""],
	["run",()=>{gameSequence = SEG2_1; runGame();}]
]

var SEG2_1 = []

var gameSequence = SEG1_1;

async function runGame(){
    await sleep(10);
    document.getElementById("gameButtonContainer").innerHTML = "";
    for (const gameEvent of gameSequence){
        if(gameEvent[0] == "text"){
            // handle text and click to speed up
            initiateText(gameEvent[1]);
            while(textIndex < text.length && speed != 0){ await sleep(speed); }
            await sleep(waitingDuration / 10);
            for(let i = 1; i < 10 && waitingDuration != 0; i++) { await sleep(waitingDuration / 10); }
        }
        else if(gameEvent[0].substring(0, 3) == "img"){
            // directly handle the image, no need await (hopefully)
            document.getElementById("characterName").innerHTML = gameEvent[1];
            changeCharacter(imgSource[gameEvent[1]], gameEvent[0].substring(4));
        }
        else if(gameEvent[0] == "button"){
            while (textIndex < text.length) { await sleep(100); }
            document.getElementById("gameText").innerHTML = "Choose your option: ";
            document.getElementById("gameButtonContainer").innerHTML = gameEvent[1];
        }
        else if(gameEvent[0] == "buttonWait"){
            var currOptionsLength = options.length;
            while (textIndex < text.length) { await sleep(100); }
            document.getElementById("gameText").innerHTML = "Choose your option: ";
            document.getElementById("gameButtonContainer").innerHTML = gameEvent[1];
            while(options.length == currOptionsLength) await sleep(10);
            document.getElementById("gameButtonContainer").innerHTML = "";
        }
        else if(gameEvent[0] == "run"){
            gameEvent[1]();
        }
    }
}