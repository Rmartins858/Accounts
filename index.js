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
      } else if (action === 'Consultar Saldo') {
        getAccontBalence();
      } else if (action === 'Depositar') {
        deposit();
      } else if (action === 'Sacar') {
        withdraw();
      } else if (action === 'Sair') {
        console.log(chalk.bgBlue.black('obrigado por usar o Account!'));

        process.exit();
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
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (error) {
          console.log(error);
        }
      );

      console.log(chalk.green('Parabéns, sua conta foi criada!'));
      opration();
    })
    .catch((error) => console.log(error));
}

// add an amount to aser account

function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual é o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];
      // verify if account exists

      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja depositar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount'];

          addAmount(accountName, amount);
          opration();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Esta conta ja existe, escolha outro nome!'));
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccont(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
    );
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (error) {
      console.log(error);
    }
  );

  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta`)
  );
}

function getAccont(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r',
  });

  return JSON.parse(accountJSON);
}

// show account balance
function getAccontBalence() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual é o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      // verify if account exists

      if (!checkAccount(accountName)) {
        return getAccontBalence();
      }

      const accountData = getAccont(accountName);
      console.log(
        chalk.bgBlue.black(
          `Ola, o saldo da sua conta é R$${accountData.balance}`
        )
      );
      opration();
    })
    .catch((error) => console.log(error));
}

//  withdraw an amount from user account

function withdraw() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual é o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];
      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quando você deseja sacar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount'];

          removeAmount(accountName, amount);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

function removeAmount(accountName, amount) {
  const accountData = getAccont(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
    );
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black('Valor indisponivel'));
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (error) {
      console.log(error);
    }
  );

  console.log(
    chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`)
  );
  opration();
}

console.log('Iniciamos o Accounts');
