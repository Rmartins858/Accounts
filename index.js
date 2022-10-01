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

      console.log(action);
    })
    .catch((error) => console.log(error));
}

console.log('Iniciamos o Accounts');
