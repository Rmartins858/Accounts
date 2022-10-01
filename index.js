// modulos externos

const inquirer = require('inquirer');
const chalk = require('chalk');

// modulos internos

const fs = require('fs');

opration();

function opration() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Oque você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action'];

      if(action === 'Criar conta'){
        createAccount()
      }
    })
    .catch((error) => console.log(error));
}

// create an account

function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
    console.log(chalk.green('Defina as opções da sua conta a seguir'));

}

console.log('Iniciamos o Accounts');
