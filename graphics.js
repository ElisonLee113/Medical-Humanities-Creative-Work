// utilities
var sleepSetTimeout_ctrl;

function sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

var imgSource = {
    "Mr. Chan": "chan.jpg",
    "SD angry": "Endangry.png",
    "SD happy": "Endhappy.png",
    "Chan cure stand": "EndCure.png",
    "Chan happy pass": "EndHappyPass.png",
    "Chan sad pass": "EndSadDeath.png",
    "No consent": "EndNoConsent.png",
    "Chan cure bed": "EndHappySurvive.png",
}

// controller for the character images

async function changeCharacter(name, animation){
    name = "./img/" + name;
    var currentImage = document.getElementById('characterShown');
    if(currentImage != null){
        currentImage.remove();
    }
    if(animation == "fade-in")  $("#gameImage").append("<img id='characterShown' src='" + name + "' class='inGameImage fadeInImage'/>");
    else if(animation == "shake")  $("#gameImage").append("<img id='characterShown' src='" + name + "' class='inGameImage shakeImage'/>");
    else if(animation == "nod")  $("#gameImage").append("<img id='characterShown' src='" + name + "' class='inGameImage nodImage'/>");
    else if(animation == "sigh")  $("#gameImage").append("<img id='characterShown' src='" + name + "' class='inGameImage sighImage'/>");
    else $("#gameImage").append("<img id='characterShown' src='" + name + "' class='inGameImage'/>");
}

// controller for the texts
var textIndex = 0;
var text;
var speed = 50;
var textDuration = 6000;
var waitingDuration = 3000;
var spedUpAlr = 0;

function speedUp(){
    if(spedUpAlr == 0) speed = speed / 3;
    else if(spedUpAlr == 1) speed = 0, waitingDuration = text.length * 20;
    else waitingDuration = 0;
    spedUpAlr = spedUpAlr + 1;
}

function initiateText(newText){
    document.getElementById("gameText").innerHTML = "";
    textIndex = 0;
    spedUpAlr = false;
    text = newText;
    speed = (textDuration / newText.length);
    waitingDuration = newText.length * 40;
    changeText();
}

function changeText(){
    if (textIndex < text.length) {
        document.getElementById("gameText").innerHTML += text.charAt(textIndex);
        textIndex++;
        if(speed > 0){ setTimeout(changeText, speed); }
        else { changeText(); }
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
var askD = 0;
var askS = 0;

var SEG1_1 = [
    ["run", ()=>{options = []; askD = 0; askS = 0;}],
	["text","Sitting in her office, Dr. Kris Wong is reviewing her patient appointments on her computer. This morning, she will be visited by Mr. Henry Chan who has been suspected of cancer. His X-ray and blood tests are sitting on her desk. "],
	["img-fade-in","Clinic"],
	["text","How will she break the bad news, explain the diagnosis, and discuss management options? You decide!"],
	["img-fade-in","Dr. Kris Wong"],
	["text","Mr. Chan knocks on the door. He approaches slowly and sits down in front of Dr. Wong's desk. He seems to be frowning and looking unconfident. He says, meekly, \"Good morning doctor... I've sent you the tests you told me to get last time. Am I okay?\" "],
	["img-sigh","Mr. Chan"],
	["button", "<button type=\"button\" onclick=\"gameSequence = SEG1_2; runGame();\">\"You'll be fine.\"</button><button type=\"button\" onclick=\"gameSequence = SEG1_1_B; runGame()\">\"You seem a little anxious about the tests, aren't you? Let's talk about it today. If at some point you have a question, let me know. We'll first understand the situation then decide what we can do about it.\"</button>"]
]

var SEG1_1_B = [
	["text","\"Dr. Wong observed Mr. Chan's anxiety and fear, expressed empathy and reassured the patient's active participation in decision making. {Empathetic relationship +1}\" "],
	["run",()=>{gameSequence = SEG1_2; runGame();}]
]


var SEG1_2 = [
	["text","Dr. Wong takes out the imaging and blood test reports."],
	["button","<button type=\"button\" onclick=\"gameSequence = SEG1_3; runGame();\">\"You have cancer. If you want, we can schedule you for chemoradiation therapy.\"</button><button type=\"button\" onclick=\"gameSequence = SEG1_2_B; runGame();\">(Carefully explain the report and seek consent)</button>"]
]

var SEG1_2_B = [
    ["text","\"Your X-ray and blood report both confirm our previous suspicion that you have cancer. Our current way to control it is by using chemoradiation therapy. The radiotherapy will help kill the tumor  in bulk, then we will start 3-6 months of chemotherapy to kill the disseminated cancer cells.\""],
	["text","\"However, during the therapy you may feel pain, nausea, and you will have to come to the clinic on the weeks with chemotherapy cycles. Also, while it helps patients achieve several years of cancer-free survival, it does not guarantee that you will be cured permanently. Is that okay with you?\""],
	["text","\"Dr. Wong educates the patient on the diagnosis, explains treatment options and the potential benefits and risks before seeking consent. {Informed consent +1}\""],
	["run",()=>{gameSequence = SEG1_3; runGame();}]
]


var SEG1_3 = [
	["img-fade-in","Mr. Chan"],
	["text","<Minigame: Patient's questions> Mr. Chan slouches and sighs. He asks,\"How does chemotherapy work?\" "],
	["buttonWait","<button type=\"button\" onclick=\"options.push(0);\">Directly killing cancer cells, controlling their growth and spread.</button><button type=\"button\" onclick=\"options.push(1);\">Feeds chemicals to strengthen your body and fight cancer cells.</button>"],
    ["text","\"What is the success rate of chemotherapy?\""],
	["buttonWait","<button type=\"button\" onclick=\"options.push(0);\">It depends on the type and stage of cancer.</button><button type=\"button\" onclick=\"options.push(1);\">100%</button>"],
	["text","\"Are there any alternative treatments?\""],
	["buttonWait","<button type=\"button\" onclick=\"options.push(0);\">\"There is also targeted therapy and immunotherapy that works for other cancer types. But in your case this treatment provides the best outcomes.\"</button><button type=\"button\" onclick=\"options.push(1);\">\"It is the only effective treatment option.\"</button>"],
	["text","Mr. Chan is making a decision based on Kris' explanation..."],
	["run",()=>{if(options[0] + options[1] + options[2] == 0){gameSequence = SEG1_3_A;}else{gameSequence = SEG1_3_B} runGame();}]
]


var SEG1_3_A = [
	["text","\"Okay, I'll consent to getting the chemoradiation therapy.\""],
	["run",()=>{gameSequence = SEG2_1; runGame();}]
]

var SEG1_3_B = [
	["text","\"Um... Chemoradiation sounds too shady for me. I don’t want to get it. I will get symptomatic relief instead. \""],
	["run",()=>{gameSequence = SEG2_1; runGame();}]
]

var SEG2_1 = [
	["img-fade-in","Dr. Kris Wong "],
	["run",()=>{if(options[0] + options[1] + options[2] == 0){gameSequence = SEG2_C_1;}else{gameSequence = SEG2_N_1;} runGame();}]
]

var SEG2_N_1 = [
	["text","2 weeks later..."],
	["text","You hesitate. Although the success rate of chemoradiation is uncertain, Mr. Chan will definitely die from cancer if he decides to receive only palliative care. You try to persuade him."],
	["button","<button type=\"button\" onclick=\"gameSequence = SEG2_N_2; runGame();\">Exaggerate the benefits of chemotherapy without mentioning its risks in order to obtain Mr. Chan's consent</button><button type=\"button\" onclick=\"gameSequence = SEG2_N_3; runGame();\">Alleviate Mr. Chan's worries about risks of chemoradiation</button>"]
]

var SEG2_N_2 = [
	["text","\"Mr. Chan, chemotherapy can certainly rehabilitate you. Imagine that you recovered. You would have a new life, with a healthy body. Isn't it better than giving up and waiting to die?\""],
	["text","Mr. Chan makes his decision..."],
	["run",()=>{if(Math.random() > 0.5){gameSequence = SEG2_N_4;}else{gameSequence = END1;} runGame();}]
]

var SEG2_N_3 = [
	["text","\"Mr. Chan, I understand your concerns. Many of my patients told me that they are afraid of suffering from severe side effects while they still have a higher chance to die after torturous therapy. But the severity of these effects varies from person to person. We can have some discussions during treatment so the therapy can be adjusted to alleviate your agony. Also, despite temporary discomfort, chemoradiation may lengthen your life in the long run. Would you like to have a second thought?\""],
	["text","Mr. Chan makes his decision..."],
	["run",()=>{if(Math.random() > 0.5){gameSequence = SEG2_C_1;}else{gameSequence = SEG2_N_4;} runGame();}]
]

var SEG2_N_4 = [
	["text","Mr. Chan still refuses any treatment. You find his decision very unwise. "],
	["button","<button type=\"button\" onclick=\"gameSequence = SEG2_N_5; runGame();\">You respect Mr. Chan's autonomy and record that he prefers palliative care.</button><button type=\"button\" onclick=\"gameSequence = END2; runGame();\">You find Mr. Chan wrong. You believe that as a doctor, you are responsible to sustain patients' lives under any circumstances. Therefore, you marked down that Mr. Chan would like to receive chemoradiation.</button>"]
]

var SEG2_N_5 = [
	["img-fade-in","Hospital bed + Mr. Chan"],
	["text","2 months later ... Mr. Chan revisits the hospital and receives medications for symptom control. Yet, as symptoms worsens, increased dosage of medications seems futile in relieving Mr. Chan's torment."],
	["text","When you make a ward round, Mr. Chan grasps your hand. With tears falling down his sweaty face, he croaks, \"Dr. Wong, this cancer is so unbearable. I'm ... I'm always tired. But my joints are too painful that I cannot sleep ... I always vomit blood ... I can't eat sometimes. Doctor, please ... please kill me. I cannot live in this way for a day more.\" You reply, with sympathy, \"I will prescribe more medicine to you so ...\" \"No. That no longer works,\" interrupts Mr. Chan, \"kill me please! please! I will not blame you for that! I agreed for euthanasia!\" Mr. Chan coughs terribly after the sentence."],
	["text","You reply, with sympathy, \"I will prescribe more medicine to you so ...\""],
	["text"," \"No. That no longer works,\" interrupts Mr. Chan, \"kill me please! please! I will not blame you for that! I agreed for euthanasia!\" Mr. Chan coughs terribly after the sentence."],
	["button", "<button type=\"button\" onclick=\"gameSequence = END6; runGame();\">End the old man's pain</button><button type=\"button\" onclick=\"gameSequence = SEG3_1; runGame();\">Do nothing</button>"]
]

var SEG2_C_1 = [
	["text","2 months later ... Mr. Chan starts his chemoradiation therapy. Is the therapy successful?"],
	["run",()=>{if(Math.random() > 0.5){gameSequence = SEG3_1;}else{gameSequence = END3;} runGame();}]
]


var SEG3_1 = [
	["text","You are swiftly called to Mr. Chan' s medical ward. His consciousness is lost but there is still the faint sound of breathing and the weak beating of the heart. Yet, you cannot sway the feeling that a cardiac arrest is imminent."],
	["img-fade-in"," Mr. Chan in com "],
	["text","Your duties as a doctor mandate that you should do your best to heal your patient, yet you recall Mr. Chan's suffering and is unsure whether he will desire to be resuscitated. With the severity of his condition, resuscitation may be futile or even more hazardous.  As Mr. Chan's son and daughter are rushing towards the hospital, you contemplate your future decision."],
	["button","<button type=\"button\" onclick=\"gameSequence = SEG3_1_A; runGame();\">Wait for Mr. Chan's son and daughter</button><button type=\"button\" onclick=\"gameSequence = SEG3_1_B; runGame();\">Search for an Advanced Directive</button><button type=\"button\" onclick=\"gameSequence = SEG3_1_C; runGame();\">Make the decision on your own</button>"]
]

var SEG3_1_Buttons = [
	["button","<button type=\"button\" onclick=\"gameSequence = SEG3_1_A; runGame();\">Wait for Mr. Chan's son and daughter</button><button type=\"button\" onclick=\"gameSequence = SEG3_1_B; runGame();\">Search for an Advanced Directive</button><button type=\"button\" onclick=\"gameSequence = SEG3_1_C; runGame();\">Make the decision on your own</button>"]
]

var SEG3_1_B = [
	["img-fade-in"," Empty drawer, clinic b"],
	["text","An advanced directive has not been made."],
	["run",()=>{gameSequence = SEG3_1_Buttons; runGame();}]
]

var SEG3_1_C = [
	["text","You decided that your own experience in the clinical healthcare setting is adequate for you to make the most judicious decision. As Mr. Chan's offspring arrive, you inform them of the risk of imminent cardiac arrest, yet do not inquire about Mr. Chan's desire. "],
	["img-fade-in"," Mr. Chan in coma, Mr. Chan's son frowning, Mr. Chan's daughter frownin"],
	["run",()=>{gameSequence = SEG3_2; runGame();}]
]

var SEG3_1_A = [
	["text","Mr. Chan's offspring, Mary and John, rush into the ward, both carrying a worried look. You decide to inquire about Mr. Chan's wish on whether to be resuscitated."],
	["button", "<button type=\"button\" onclick=\"gameSequence = SEG3_1_A_A; runGame();\">Ask Mary</button><button type=\"button\" onclick=\"gameSequence = SEG3_1_A_B; runGame();\">Ask John</button><button type=\"button\" onclick=\"gameSequence = SEG3_2; runGame();\">Explain your decision</button>"],
	["img-fade-in"," Mr. Chan in coma, Mr. Chan's son neutral, Mr. Chan's daughter neutra"],
]


var SEG3_1_A_A = [
	["textC","Every time I visit our father, he says that he is just waiting to die...", ()=>{if(askD == 0){return true;} return false;}],
	["textC","Our father had always said that he already lived a long and fulfillinglife... ", ()=>{if(askD == 1){return true;} return false;}],
	["textC","Our father once told me that he is in so much pain that if his heartstopped, don't even try to save him...", ()=>{if(askD == 2){return true;} return false;}],
	["run",()=>{askD = askD + 1; gameSequence = SEG3_1_A; if(askS + askD >= 3){gameSequence = SEG3_2;} runGame();}]
]


var SEG3_1_A_B = [
	["textC","Our father constantly preached the gift of longevity to us, he wouldlike to live as long as possible.", ()=>{if(askS == 0){return true;} return false;}],
	["textC","Our father had always loved his friends and family, he would cherish his time alive.", ()=>{if(askS == 1){return true;} return false;}],
	["textC","Our father once told me that he would hang on with his greateststrength to spend time with us...", ()=>{if(askS == 2){return true;} return false;}],
	["run",()=>{askS = askS + 1; gameSequence = SEG3_1_A; if(askS + askD >= 3){gameSequence = SEG3_2;} runGame();}]
]


var SEG3_2 = [
	["text","You are about to explain your further action, but...Mr. Chan's cardiac monitor begins blaring. His heart rate is zero. It is time to make your decision."],
	["img-fade-in"," Alternate between 'Mr. Chan coma' and 'Mr. Chan coma (Red filter)"],
	["button", "<button type=\"button\" onclick=\"gameSequence = SEG3_2_A; runGame();\">Resuscitate Mr. Chan</button><button type=\"button\" onclick=\"gameSequence = SEG3_3; runGame();\">Do not resuscitate Mr. Chan</button>"]
]


var SEG3_2_A = [
	["text","You immediately instruct healthcare professionals to attempt CPR. As time goes on, Mr. Chan still does not resume breathing.Hope for Mr. Chan's survival goes dimmer."],
	["run",()=>{gameSequence = SEG3_3; runGame();}]
]


var SEG3_3 = [
	["text","You ultimately decide to cease the CPR and declare Mr. Chan's death. "],
	["run",()=>{if(askS > 0 && askD > 0){gameSequence = END4;}else{gameSequence = END5;} runGame();}]
]

function activateEnding(){
    var currentImage = document.getElementById('characterShown');
    if(currentImage != null){
        currentImage.remove();
    }
    $("#characterName").css('color', 'white');
    $("#gameText").css('color', 'white');
    document.getElementById("backgroundImage").style.removeProperty('background-image');
    $("#backgroundImage").css('background-color', 'black');
    $("#gameImage").css('background-color', 'black');
    $("#gameTextBox").css('background-color', 'black');
}

var END1 = [
    ["run",activateEnding],
	["text","END 1 - Decieving patient"],
    ["img-fade-in","No consent"],
    ["text","Informed consent and respecting patients' autonomy are always required."],
	["text","Consent given without sufficient information provided (e.g. missing risks of treatment) are not informed, therefore not considered valid."],
	["text","You are complainted for grave dereliction of duty. You will face disciplinary and/or legal punishment. Penalty is determined by the effects on the patient (e.g. does the patient suffer from any physical/mental harm? is the therapy successful?) and the effects on public interest (e.g. does this accident undermine public confidence in the hospital? how severe should the penalty be in order to warn other healthcare professionals?)"],
	["text","You are required to attend disciplinary inquiry by the Hospital Authority and may be prohibited to practise medicine temporarily or permantly. You have offended Offence against the Person Ordinance (Cap. 212), Section 7 \"Manslaughter\"-	In severe case (e.g. the patient died, this case lower credibility of  HK's healthcare system), you will be prosecuted for \"gross negligence manslaughter\" (\"medical negligence\") and may face maximum sentence of life prisonment."]
]

var END2 = [
    ["run",activateEnding],
	["text","END 2 - Fabricating consent"],
    ["img-fade-in","No consent"],
    ["text","Informed consent and respecting patients' autonomy are always required."],
	["text","Consent given without sufficient information provided (e.g. missing risks of treatment) are not informed, therefore not considered valid."],
	["text","You are complainted for grave dereliction of duty. You will face disciplinary and/or legal punishment. Penalty is determined by the effects on the patient (e.g. does the patient suffer from any physical/mental harm? is the therapy successful?) and the effects on public interest (e.g. does this accident undermine public confidence in the hospital? how severe should the penalty be in order to warn other healthcare professionals?)"],
	["text","You are required to attend disciplinary inquiry by the Hospital Authority and may be prohibited to practise medicine temporarily or permantly. You have offended Offence against the Person Ordinance (Cap. 212), Section 7 \"Manslaughter\"-	In severe case (e.g. the patient died, this case lower credibility of  HK's healthcare system), you will be prosecuted for \"gross negligence manslaughter\" (\"medical negligence\") and may face maximum sentence of life prisonment."]
]

var END3 = [
    ["run",activateEnding],
    ["img-fade-in","Chan cure bed"],
	["textC","END 3 - Success!", ()=>{if(options[0] + options[1] + options[2] == 0){return true;} return false;}],
	["textC","END 3 - Success...?", ()=>{if(options[0] + options[1] + options[2] == 0){return false;} return true;}],
    ["textC","Thanks to your acquaintance with medical knowledge and massive experience, the therapy is well planned and monitored. The spread of cancer cells is effectively controlled and these cells are eventually killed.", ()=>{if(options[0] + options[1] + options[2] == 0){return true;} return false;}],
	["textC","Congratulations! Mr. Chan is cured.", ()=>{if(options[0] + options[1] + options[2] == 0){return true;} return false;}],
	["textC","Congratulations! Mr. Chan is cured. You succeed ...?", ()=>{if(options[0] + options[1] + options[2] == 0){return false;} return true;}],
    ["img-fade-in","Chan cure stand"],
    ["textC","At the day before leaving the hospital, Mr. Chan told you gratefully, \"Thank you so much, Dr. Wong. I was desparate when I was diagnosed with cancer. Thank you for supporting and healing me! The peer support group you suggested was very useful in maintaining optimism during chemoradiation. You are the nicest doctor I have met! Thanks a lot!\"", ()=>{if(options[0] + options[1] + options[2] == 0){return true;} return false;}],
    ["textC","You are touched by Mr. Chan's sincere gratitude and are more motivated to save more patients' lives.", ()=>{if(options[0] + options[1] + options[2] == 0){return true;} return false;}],
    ["textC","On the day leaving the hospital, Mr. Chan wants to give thanks for the successful chemoradiation. Nevertheless, glancing at your emotionless expression, Mr. Chan just leaves quietly, without saying a word.", ()=>{if(options[0] + options[1] + options[2] == 0){return false;} return true;}],
    ["textC","After the daily ward round is completed, you return to yur office wearily. As the door is knocked, you robotically answer, with a tired voice saying \"Again...\" in your mind. ", ()=>{if(options[0] + options[1] + options[2] == 0){return false;} return true;}]
]

var END4 = [
    ["run",activateEnding],
    ["img-fade-in","Chan happy pass"],
	["text","END 4 - Fulfilling Passing"],
	["text","Despite your best effort and long-term care, you ultimately could not save Mr. Chan from his demise. Yet, you know that death is inevitable in your profession."],
    ["text","You observed that although Mary and John are miserable, they also seem to be glad that their father passed on peacefully. "],
    ["img-fade-in","SD happy"],
    ["text","Mary: Thank you for caring for our father for such a long period of time. I'm happy that he could spend his last few months in such good care."],
	["text","John: Our father had a battle well-fought. Thank you, doctor, for prolonging his lifeand giving him a few more months to spend with us."],
	["text","Albeit Mr. Chan's regrettable passing, you are content that you did your best and can satisfy his family. You are touched by this experience and are motivated to save more patients' lives. "]
]

var END5 = [
    ["run",activateEnding],
    ["img-fade-in","Chan sad pass"],
	["text","END 5 - Remorseful passing"],
    ["text","Despite your best effort and long-term care, you ultimately could not save Mr. Chan from his demise. Yet, you know that death is inevitable in your profession."]
    ["img-fade-in","SD angry"],
    ["text","You observed that Mary and John were both miserable about the outcome, and you could not help but think that it may turn out better if you were able to build consensus with the family when inquiring more about the patient's prior values and preferences."],
	["text","As you pull your weary bag of bones back to your office, the door is knocked on impatiently again. You attempt to gather your strength once more, but you are no longer sure how many more deaths you can take..."]
]

var END6 = [
    ["run",activateEnding],
	["text","END 6 - Euthanasia???"],
    ["text","Euthanasia is illegal in Hong Kong, be it voluntary or not. You are required to attend disciplinary inquiry by the Hospital Authority and may face permanent license suspension.-	You have offended Offence against the Person Ordinance (Cap. 212) , Section 33B(1). You will be prosecuted for \"aiding the suicide of others\" and may face maximum sentence of 14 years."]
]

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
        else if(gameEvent[0] == "textC"){
            // conditional texts
            if(gameEvent[2]() == true){
                initiateText(gameEvent[1]);
                while(textIndex < text.length && speed != 0){ await sleep(speed); }
                await sleep(waitingDuration / 10);
                for(let i = 1; i < 10 && waitingDuration != 0; i++) { await sleep(waitingDuration / 10); }
            }   
        }
        else if(gameEvent[0].substring(0, 3) == "img"){
            // directly handle the image, no need await (hopefully)
            changeCharacter(imgSource[gameEvent[1]], gameEvent[0].substring(4));
        }
        else if(gameEvent[0] == "bg-img"){
            // directly change the image source
           
            $("#backgroundImage").css("background-image",'url("./img/' + gameEvent[1] + '")');
        }
        else if(gameEvent[0] == "name"){
            document.getElementById("characterName").innerHTML = gameEvent[1];
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
            document.getElementById("gameText").innerHTML = "";
            gameEvent[1]();
        }
    }
}