---
title: Audit Smart Contracts with Static Analysis
author: Max Goodman
date: 2020-12-17
hero: ./images/hero.png
excerpt: Want to run basic security auditing tools on your smart contracts? Here's what you need to know about how to setup your local environment to test the contracts.
category: Smart Contract Security
tags:
  - Smart Contract
  - Ethereum
  - Security
---

Requirements: Latest OS X (at the time of writing this: Big Sur), npm, node, python 3.9, pip, ganache-cli, truffle, Docker, solc-select. 

We'll be installing MythX and Cryptic's Slither: 2 well-known tools for static analysis auditing of smart contracts. 

## <a href="https://mythx.io/">MythX</a>

There are two ways to use MythX. One is with the remix plugin, which we will not be going over, and the other is by installing it locally, which we will cover. 

So, let's get started! 
Open your shell and run the following: 
```pip install mythx-cli```

This will install the Mythx CLI. After this, you will be able to run ```mythx``` and see a bunch of helpful commands. 

![mythx-help-commands](https://imgur.com/859ovlt.png)
Please follow the Mythx.org instructions on setting up an trial account, then grab your API key in your MythX Dashboard. 

## Running MythX

Change your directory in your shell to a folder containing <a href="https://github.com/ConsenSys-Academy/simple-coin.git">a simple truffle project</a> with smart contracts that you wish to audit with MythX. 

 ``` 
 mythx --username USERNAME --password "PASSWORD" --api-key APIKEYHERE analyze ./ DIRECTORY_OR_SINGLE_SOL_FILE_HERE.SOL 
 ```

This will start a MythX scan. You can only run a quick scan that you can do on the trial version of MythX, rather than a 'deep' or 'standard' scan. 

The results should look like this: 
![MythX Simple Coin Scan](https://imgur.com/3JbWuIu.png)

## Congratulations! You've run your first static analysis tool on a smart contract! 
Let's run another one! 

## <a href="https://github.com/crytic/slither">Slither</a>

Install Slither by running the command: 
``` pip3 install slither-analyzer ```

Or you can use Github to install it: 

``` $ git clone https://github.com/crytic/slither.git && cd slither ```
``` $ python3 setup.py install ```

## Running Slither 

You will need to have Docker Desktop running in the background for this.

Make sure you are using solc 0.5.0 before running Slither, otherwise you will get an error. You can check by running ``` solc --version``` to double check. 

![solc version check](https://imgur.com/8oVObff.png)

So, run ``` solc use 0.5.0 ``` if your solc version is different from 0.5.0 for this file before running ``` slither Coin.sol ``` within the ```contracts/``` directory. 

From the ```contracts/``` directory of your truffle project, run: 
``` slither Coin.sol ``` 
This will run slither on this specific file.

The results of running Slither on the same project are: 

![Slither Results](https://imgur.com/wixhzUg.png)

## Congratulations! 
## You've run your second static analysis tool! 

