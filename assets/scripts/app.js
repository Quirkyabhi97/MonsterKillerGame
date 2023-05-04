const PLAYER_ATTACK_VALUE = 10;
const PLAYER_STRONG_ATTACK_VALUE = 20;
const MONSTER_ATTACK_VALUE = 15;

//Global variable hence declared in CAPS

let chosenMaxLife = 100;
let currentPlayerLife = chosenMaxLife;
let currentMonsterLife = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

const attackMonster = (typeOfAttack) =>{
 if(typeOfAttack==='attack'){
    let monsterdamage = dealMonsterDamage(PLAYER_ATTACK_VALUE);
    currentMonsterLife -= monsterdamage;
 }
 else if(typeOfAttack==='strong attack'){
    let monsterdamage = dealMonsterDamage(PLAYER_STRONG_ATTACK_VALUE);
    currentMonsterLife -= monsterdamage;
 }

 let playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
 currentPlayerLife -= playerdamage;

 if (currentMonsterLife <= 0 && currentPlayerLife > 0) {
   alert("You Won");
 } else if (currentPlayerLife <= 0 && currentMonsterLife > 0) {
   alert("You Lost");
 } else if (currentPlayerLife <= 0 && currentMonsterLife <= 0) {
   alert("It's a draw");
 }

}

const attackHandler = () => {
 attackMonster("attack");
};

const strongAttackHandler = () => {
 attackMonster("strong attack");
};

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
