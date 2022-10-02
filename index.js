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

      if (action === 'Criar conta') {
        createAccount();
      }
    })
    .catch((error) => console.log(error));
}

// create an account

function createAccount() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir'));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para sua conta:',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];
      console.info(accountName);

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts');
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black('Esta conta já existe, escolha outro nome!')
        );
        buildAccount();
        return
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (error) {
          console.log(error);
        }
      );


      console.log(chalk.green('Parabéns, sua conta foi criada!'));
    })
    .catch((error) => console.log(error));
}

console.log('Iniciamos o Accounts');
