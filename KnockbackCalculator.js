function changeTitleTest() {
  document.getElementById("title").innerHTML = "2";
}

function calculateKnockback() {

  //grabs data from form
  let damage = document.getElementById("knockbackDamageTotal").value;//damage of attack
  let rankModifier = (2 ** ((document.getElementById("knockBackRank").value) - 1));//rank of knockback
  let massDecreaseRank = ((document.getElementById("targetMassDecrease").value) * 2);//rank of target mass decrease
  let armorRank = (document.getElementById("targetArmor").value);//rank of target armor
  let density = 0; //object density
  let finalOutput = "";//Text for the function to output

  //Calculates initial knockback distance
  let distance = 0; //initial distance of knockback
  if (massDecreaseRank > 0){
    distance = (damage * massDecreaseRank * rankModifier);
  }
    else {
      distance = (damage * rankModifier);
    }

  //checks if custom density is being used and sets object density appropriately.
  var customDensityChecked = document.getElementById("useCustomDensity"); //custom object density checkbox

  if (customDensityChecked.checked) {
    density = document.getElementById("customDensity").value;
  }
  else{
    density = document.getElementById("objectDensity").value;
  }

  //calculates how many objects the target will impact and how much damage will be done to them and the objects.
  let smallObjectArmor = 8; //armor rating of small object
  let midObjectArmor = 18; //armor rating of medium object
  let largeObjectArmor = 30; //armor rating of large object
  let massiveObjectArmor = 50; //armor rating of massive object

  let smallObjectTotal = 0;//total amount of small objects broken
  let midObjectTotal = 0;//total amount of medium objects broken
  let largeObjectTotal = 0;//total amount of large objects broken
  let massiveObjectTotal = 0;//total amount of massive objects broken
  let allObjectTotal = 0;

  let airDistance = 0;//distance travelled before impacting an object
  let distanceTraveled = 0;//total distance traveled during knockback
  let randomDistance = 0;//randomly selected distance between objects
  let objectType = 100;//Type of object impacted

  let landingPoint = "in the air"; //Where the target lands
  let impactDamage = 0; //How much damage the target takes from a given impact
  let targetDamage = 0; //How much impact damage the target takes total

  let distanceUnits = "meters" //What unit to use for reporting

  while (distance > 0) {
    //Determines airDistance based on a random number divided by object density and then subtracts that distance from the total
    randomDistance = (Math.floor(Math.random() * 100)+1);
    airDistance = Math.floor(randomDistance / density);

    if (distance > airDistance){
    distance = (distance - airDistance);
    distanceTraveled = (distanceTraveled + airDistance);
    airDistance = 0;
    //chooses an object at random for the target to impact (larger objects are less likely) and impacts it, repeats if distance remains
    objectType = (Math.random() * 100);

    if (objectType < 5){
      massiveObjectTotal = (massiveObjectTotal + 1);
        if (distance <= (massiveObjectArmor * 5)){
          impactDamage = (distance - (armorRank * 10));
          if (impactDamage > 0){
            targetDamage = (targetDamage + impactDamage);
          }
          landingPoint = "in a massive object";
          massiveObjectTotal = (massiveObjectTotal - 1);
          distance = 0;
        }
        else {
          impactDamage = ((massiveObjectArmor * 5) - (armorRank * 10));
          if (impactDamage > 0){
            targetDamage = (targetDamage + impactDamage);
          }
          distance = (distance - (massiveObjectArmor * 5));
        }
      }

      else if (objectType < 30){
        largeObjectTotal = (largeObjectTotal + 1);
        if (distance <= (largeObjectArmor * 5)){
          impactDamage = (distance - (armorRank * 10));
          if (impactDamage > 0){
            targetDamage = (targetDamage + impactDamage);
          }
          landingPoint = "in a large object";
          largeObjectTotal = (largeObjectTotal - 1);
          distance = 0;
        }
        else {
          impactDamage = ((largeObjectArmor * 5) -(armorRank * 10));
          if (impactDamage > 0){
            targetDamage = (targetDamage + impactDamage);
          }
          distance = (distance - (largeObjectArmor * 5));
        }
      }

      else if (objectType < 60) {
        midObjectTotal = (midObjectTotal + 1);
        if (distance <= (midObjectArmor * 5)){
          impactDamage = (distance - (armorRank * 10));
          if (impactDamage > 0){
            targetDamage = (targetDamage + impactDamage);
          }
          landingPoint = "on a medium object";
          massiveObjectTotal = (midObjectTotal - 1);
          distance = 0;
        }
        else {
          impactDamage = ((midObjectArmor * 5) - (armorRank * 10));
          if (impactDamage > 0){
            targetDamage = (targetDamage + impactDamage);
          }
          distance = (distance - (midObjectArmor * 5));
        }
      }

      else if(objectType < 100){
        smallObjectTotal = (smallObjectTotal + 1);
        if (distance <= (smallObjectArmor * 5)){
          impactDamage = (distance - (armorRank * 10));
          if (impactDamage > 0){
            targetDamage = (targetDamage + impactDamage);
          }
          landingPoint = "on a small object";
          massiveObjectTotal = (smallObjectTotal - 1);
          distance = 0;
        }
        else {
          impactDamage = ((smallObjectArmor * 5) -(armorRank * 10));
          if (impactDamage > 0){
            targetDamage = (targetDamage + impactDamage);
          }
          distance = (distance - (smallObjectArmor * 5));
        }
    }
  }
  else {
    distanceTraveled = (distanceTraveled + distance);
    landingPoint = "in the air";
    distance = 0;
  }
}

  if (distanceTraveled > 1000){
    distanceUnits = "kilometers";
    distanceTraveled = (distanceTraveled / 1000);
  }

  //Outputs the results
  finalOutput = `The target travels ${distanceTraveled} ${distanceUnits}, crashing through ${smallObjectTotal} small objects, ${midObjectTotal} medium objects, ${largeObjectTotal}
    large objects, ${massiveObjectTotal} massive objects and stops ${landingPoint}, taking ${targetDamage} damage in the process.`


  document.getElementById("output").innerHTML = finalOutput;
}
