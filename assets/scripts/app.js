const PLAYER_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 15;
const MONSTER_ATTACK_VALUE = 15;
const PLAYER_HEAL_VALUE = 20;

//Global variable hence declared in CAPS

let chosenMaxLife = 100;
let currentPlayerLife = chosenMaxLife;
let currentMonsterLife = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

const endRound = () => {
  let initialPlayerLife = currentPlayerLife
  let playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerLife -= playerdamage;

  if (currentPlayerLife <=0 && hasBonusLife){
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
};

const attackMonster = (typeOfAttack) => {
  if (typeOfAttack === "attack") {
    let monsterdamage = dealMonsterDamage(PLAYER_ATTACK_VALUE);
    currentMonsterLife -= monsterdamage;
  } else if (typeOfAttack === "strong attack") {
    let monsterdamage = dealMonsterDamage(PLAYER_STRONG_ATTACK_VALUE);
    currentMonsterLife -= monsterdamage;
  }
  endRound();
};

const attackHandler = () => {
  attackMonster("attack");
};

const strongAttackHandler = () => {
  attackMonster("strong attack");
};

const healPlayerHandler = () => {
  let finalHealValue;
  if (currentPlayerLife>=chosenMaxLife - PLAYER_HEAL_VALUE){
    alert("Heal Value modified as you cannot heal more than your max health");
    finalHealValue = chosenMaxLife - currentPlayerLife
  }
  else {
    finalHealValue = PLAYER_HEAL_VALUE
  }
  console.log("heal value is" + finalHealValue);
  increasePlayerHealth(finalHealValue);
  currentPlayerLife += finalHealValue;
  endRound();
};

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
