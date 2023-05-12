const PLAYER_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 15;
const PLAYER_HEAL_VALUE = 20;

const MODE_ATTACK = "Attack";
const MODE_STRONG_ATTACK = "Strong Attack";
const LOG_EVENT_PLAYER_ATTACK = "Player Attack";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "Player Strong Attack";
const LOG_EVENT_MONSTER_ATTACK = "Monster Attack";
const LOG_EVENT_PLAYER_HEAL = "Player Heal";
const LOG_EVENT_GAME_OVER = "Game Over";

//Global variable hence declared in CAPS

let enteredValue = prompt("Enter the maximum life of characters");

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentPlayerLife = chosenMaxLife;
let currentMonsterLife = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

const writeLogHandler = (ev, val, playerHealth, monsterHealth) => {
  let logEntry = {
    event: ev,
    value: val,
    finalPlayerHealth: playerHealth,
    finalMonsterHealth: monsterHealth,
  };
  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = "Monster";
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = "Monster";
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = "Player";
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = "Player";
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry;
      break;
    default:
      logEntry = {};
  }
  // if (ev == LOG_EVENT_PLAYER_ATTACK) {
  //   logEntry.target = "Monster";
  // } else if (ev == LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //   logEntry.target = "Monster";
  // } else if (ev == LOG_EVENT_MONSTER_ATTACK) {
  //   logEntry.target = "Player";
  // } else if (ev == LOG_EVENT_PLAYER_HEAL) {
  //   logEntry.target = "Player";
  // }
  battleLog.push(logEntry);
};

adjustHealthBars(chosenMaxLife);

const resetHandler = () => {
  currentPlayerLife = chosenMaxLife;
  currentMonsterLife = chosenMaxLife;
  resetGame(chosenMaxLife);
};

const endRoundHandler = () => {
  let initialPlayerLife = currentPlayerLife;
  let playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerLife -= playerdamage;
  writeLogHandler(
    LOG_EVENT_MONSTER_ATTACK,
    playerdamage,
    currentPlayerLife,
    currentMonsterLife
  );

  if (currentPlayerLife <= 0 && hasBonusLife) {
    removeBonusLife();
    hasBonusLife = false;
    currentPlayerLife = initialPlayerLife;
    setPlayerHealth(initialPlayerLife);
    alert("You would be dead but bonus life saved you");
    //bonus life resets the player health to the condition just before the monster attacks , thus saving from losing
  }
  console.log("players health" + currentPlayerLife);
  console.log("monsters health" + currentMonsterLife);

  if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
    alert("You Won");
    writeLogHandler(
      LOG_EVENT_GAME_OVER,
      "Player Won",
      currentPlayerLife,
      currentMonsterLife
    );
  } else if (currentPlayerLife <= 0 && currentMonsterLife > 0) {
    alert("You Lost");
    writeLogHandler(
      LOG_EVENT_GAME_OVER,
      "Monster Won",
      currentPlayerLife,
      currentMonsterLife
    );
  } else if (currentPlayerLife <= 0 && currentMonsterLife <= 0) {
    alert("It's a draw");
    writeLogHandler(
      LOG_EVENT_GAME_OVER,
      "Game Draw",
      currentPlayerLife,
      currentMonsterLife
    );
  }
  if (currentPlayerLife <= 0 || currentMonsterLife <= 0) {
    resetHandler();
  }
};

const attackMonster = (typeOfAttack) => {
  const event =
    typeOfAttack === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;
  const monsterdamage =
    typeOfAttack === MODE_ATTACK
      ? dealMonsterDamage(PLAYER_ATTACK_VALUE)
      : dealMonsterDamage(PLAYER_STRONG_ATTACK_VALUE);
  // if (typeOfAttack === MODE_ATTACK) {
  //   monsterdamage = dealMonsterDamage(PLAYER_ATTACK_VALUE);
  //   currentMonsterLife -= monsterdamage;
  //   event = LOG_EVENT_PLAYER_ATTACK;

  // } else if (typeOfAttack === MODE_STRONG_ATTACK) {
  //   monsterdamage = dealMonsterDamage(PLAYER_STRONG_ATTACK_VALUE);
  //   currentMonsterLife -= monsterdamage;
  //   event = LOG_EVENT_PLAYER_STRONG_ATTACK
  // }
  currentMonsterLife -= monsterdamage;
  writeLogHandler(event, monsterdamage, currentPlayerLife, currentMonsterLife);
  endRoundHandler();
};

const attackHandler = () => {
  attackMonster(MODE_ATTACK);
};

const strongAttackHandler = () => {
  attackMonster(MODE_STRONG_ATTACK);
};

const healPlayerHandler = () => {
  let finalHealValue;
  if (currentPlayerLife >= chosenMaxLife - PLAYER_HEAL_VALUE) {
    alert("Heal Value modified as you cannot heal more than your max health");
    finalHealValue = chosenMaxLife - currentPlayerLife;
  } else {
    finalHealValue = PLAYER_HEAL_VALUE;
  }
  console.log("heal value is" + finalHealValue);
  increasePlayerHealth(finalHealValue);
  currentPlayerLife += finalHealValue;
  writeLogHandler(
    LOG_EVENT_PLAYER_HEAL,
    finalHealValue,
    currentPlayerLife,
    currentMonsterLife
  );
  endRoundHandler();
};

const printLogHandler = () => {
  console.log(battleLog);
};

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
