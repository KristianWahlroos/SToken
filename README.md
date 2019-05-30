# Slave Token

The most promising slave crypto collectible. Slaves can do various things.

## Well, what can slaves do?

**Work:** If the slave is not tired, it can work. Increases their level. Slave becomes tired after this.

**Be fruitful:** If the slave and its target slave are not tired, they can be fruitful. Randomness and their levels will decide, who will be the main parent. Their level is inherited from the other parent *(level/2)*. Target slaves level is reduces by one as long as it's over one. Slave and target slaves both will become tired after the activity.

**Be transfered:** The slave can be transfered to another account. However there is a 10% chance that the slave will escape. Every account has a chance to obtain your slave with probability *(their slave count)/(slave count)*.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series of examples that tell you how to get a development env running

1. Install [Node](https://nodejs.org/en/download/)

```
Install using Brew: brew install node
```

2. Install Solc

```
npm install -g solc
```

3. Install Truffle
```
npm install -g truffle
```

4. Install Ganache
```
npm install -g ganache-cli
```

5. Clone the repo
```
git clone https://github.com/KristianWahlroos/SToken
```


## Deployment

Deployment is easy.

Go to the installation folder with terminal and run Ganache

```
ganache-cli
```

Open up a second terminal and go to the same folder. Run here truffle migrate.
```
truffle migrate
```
Copy the token's contract address shown in the picture.

![Contract Address picture](/GithubExample1.png)

Open up with your favorite text editor the interaction.js found in interaction folder.

Replace the current contract address with your own address that you just *hopefully* copied. As of 31st of may it's in line 15 of interaction.js. Looks like this.
```
//INSERT HERE YOUR OWN CONTRACT ADDRESS!
const contractAddress = "0x20dc1E6bb28eE94e39Fd7Df817eE8D2c6062027d";
```

In terminal. Run the interaction.js in node.
```
node interaction/interaction.js
```

You should see a lot of messages of what is happening in your slave imperium.

In case you want to do modify what the slaves do, check the testSlaves function as of 31st of may it's in line 31 of interaction.js.
```
async function testSlaves(){
```
### Understanding the code in the test script

These are the accounts from 0 to 3 that you can do actions as.
```
let contractAsSigner0 = contract.connect(signer0);
let contractAsSigner1 = contract.connect(signer1);
let contractAsSigner2 = contract.connect(signer2);
let contractAsSigner3 = contract.connect(signer3);
```


This will set how long the slaves are tired for in seconds.
```
await _setCooldownTime(0);
```

Creates the first slave for the accounts. Slave has id. First one gets zero and then next one will get one higher.
```
await _createSlave(contractAsSigner0);
await _createSlave(contractAsSigner1);
await _createSlave(contractAsSigner2);
await _createSlave(contractAsSigner3);
```

Some parameters want the slave's id.
```
slaveId, targetId
```


Some parameters want account's address even though it says id.
```
fromId, toId
```




With these tips and tricks, have fun and jolly time growing your slave imperium!

## Built With

* Love
