
# CDGHIS

The frontend codebase for Cebu Doctors University Hospital Information System.




## Installation

Before installation always ask Our Beloved Senior and mamaw Jucel Estribo gwapo and make sure you have this tools installed in your machine.

## Git, node v18.17.1 or v20.11.1, npm

To check if you have Node and Npm installed, Open your terminal and input this command
```bash
node -v   
npm -v 
```
If you don't have any of this installed then please do so yourself haha, Just kidding.

The best way to install this software tools in your machine is using NVM. A NodeJS version manager ( It enables you to have multiple NodeJS Version in your system ). To install it please check this out! GitHub Docs out: 
https://github.com/coreybutler/nvm-windows/releases

After Installing NVM, then let's get you started 

First check it's version
```bash
nvm -v
```
Then check if you have some node versions installed already 
```bash
nvm list 
```
If you don't have any or has one but not the required node version.
```bash 
nvm install 18.17.1
nvm install 20.11.1
```
Then check nvm list again, specify whatever version you wanna use out of the two. 
```bash 
nvm use 18.17.1
nvm use 20.11.1
```
To verify the node version used 
```bash
node -v 
```

You might be asking how about NPM Installation? 

TIP: After installing NodeJS in your computer, it will automatically install the npm and the specific version of npm that is compatible with the used node version. 

Check it out yourself. 
```bash
npm -v 
```

To check if you have Git installed, if not please do so but usually windows already have it pre installed in your computer.
```bash
git -v 
```
To check if you have associated your GitHub account to your computer.
```bash
git config --global user.name
git config --global user.email
```
To check if you have SSH Configured in your computer.
```bash
ls ~/.ssh
```
To check if you already connected to GitHub
```bash
ssh -T git@github.com
```

If you haven't configured your ssh and connected your GitHub account to your computer well it's your problem! Just kidding haha 😜

Please follow this steps or ask ChatGPT about it

Connect your GitHub username and email
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```
Verify the configuration
```bash
git config --global --list
```
Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```
If naa error, try this one 
```bash
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
```
After adding the SSH key ( private and public ) use the public and add it to your GitHub account manually. To get your public ssh key 
```bash
cat ~/.ssh/id_rsa.pub
```
Copy and paste the id then navigate to GITHUB => SETTINGS => SSH AND GPG KEYS.

After this you are ready to clone the project!

## Cloning the Codebase

```bash
git clone git@github.com:CEBU-DOCTORS-UNIVERISTY-HOSPITAL/cdghis.git
```

Create separate branch for yourself during development ( Two ways to do so )

- One using Git Terminal Commands
```bash
cd cdghis ( navigate to the file )
git branch <branch_name>
```
Switch to the New Branch.
```bash
git checkout <branch_name>
```
- Two doing it manually in the GitHub Repository by navigating to the Following

=> Go To GitHub Repo -> Locate Branches -> Create a New Branch 

Then after that in your terminal you have to Run this git command 

```bash
git fetch
git checkout <branch_name>
```

After setting up your own branch for development purposes. Your all set up and ready! 

To get started install the following in the Project repo
```bash
npm install 
```

After doing this ask your Senior regarding the nuxt.config.ts configuration file.

Running the server / project locally
```bash
npm run dev
```

After development you can push your changes on to your branch then merge it to the master branch. But always ask your Senior for guidance before merging to master.
```bash
git push origin <branch_name>
```
If any error happens please ask your Senior for guidance.
