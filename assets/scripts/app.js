const PLAYER_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 15;
const PLAYER_HEAL_VALUE = 20;

const MODE_ATTACK = "Attack";
const MODE_STRONG_ATTACK = "Strong Attack";

//Global variable hence declared in CAPS
let enteredValue = prompt("Enter the maximum life of characters");

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}

let currentPlayerLife = chosenMaxLife;
let currentMonsterLife = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

const reset = () => {
  currentPlayerLife = chosenMaxLife;
  currentMonsterLife = chosenMaxLife;
  resetGame(chosenMaxLife);
};

const endRound = () => {
  let initialPlayerLife = currentPlayerLife;
  let playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerLife -= playerdamage;

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
  } else if (currentPlayerLife <= 0 && currentMonsterLife > 0) {
    alert("You Lost");
  } else if (currentPlayerLife <= 0 && currentMonsterLife <= 0) {
    alert("It's a draw");
  }
  if (currentPlayerLife <= 0 || currentMonsterLife <= 0) {
    reset();
  }
};

const attackMonster = (typeOfAttack) => {
  if (typeOfAttack === MODE_ATTACK) {
    let monsterdamage = dealMonsterDamage(PLAYER_ATTACK_VALUE);
    currentMonsterLife -= monsterdamage;
  } else if (typeOfAttack === MODE_STRONG_ATTACK) {
    let monsterdamage = dealMonsterDamage(PLAYER_STRONG_ATTACK_VALUE);
    currentMonsterLife -= monsterdamage;
  }
  endRound();
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
  endRound();
};

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
