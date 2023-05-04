const PLAYER_ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 10;

//Global variable hence declared in CAPS

let chosenMaxLife = 100;
let currentPlayerLife = chosenMaxLife;
let currentMonsterLife = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

const attackHandler = () => {
    let monsterdamage = dealMonsterDamage(PLAYER_ATTACK_VALUE);
    let playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentMonsterLife -= monsterdamage;
    currentPlayerLife -= playerdamage;

    if(currentMonsterLife<=0 && currentPlayerLife>0){
        alert("You Won");
    }
    else if(currentPlayerLife<=0 && currentMonsterLife>0){
        alert("You Lost");
    }
    else if(currentPlayerLife<=0 && currentMonsterLife<=0){
        alert("It's a draw"); 
    }
}


attackBtn.addEventListener('click',attackHandler)