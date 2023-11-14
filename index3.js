const { Client } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');
const nodemailer = require('nodemailer'); // npm install nodemailer
const readline = require('readline');
 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu-email@gmail.com',
    pass: 'tu-contraseña'
  }
});
 
async function run() {
  try {
    client.on('qr', qr => {
      qrcode.generate(qr, { small: true });
    });
 
    client.on('ready', () => {
      console.log('¡Bien! WhatsApp conectado.');
    });
 
    await client.initialize();
 
    function cumprimentar() {
      const dataAtual = new Date();
      const hora = dataAtual.getHours();
 
      let saudacao;
 
      if (hora >= 6 && hora < 12) {
        saudacao = "Hola buenos días!";
      } else if (hora >= 12 && hora < 17) {
        saudacao = "Hola buenas tardes!";
      } else {
        saudacao = "Hola buenas noches!";
      }
 
      return saudacao;
    }
 
    // obtener fecha y hora
    function getDate() {
      const now = new Date();
      return `La fecha y hora es: ${now}`;
    }
 
    // Menu en pantalla para las opciones
    const inicial = `
    (\_/)
    ( ._.)
    />❤ Hola bienvenido!
    Seleccione una opcion:
    Opcion 1 saludar.
    Opcion 2 fecha y hora.
    `;
 

    const delay = ms => new Promise(res => setTimeout(res, ms));
    // Recibe el mesaje del usuario para mostrar el menu
    client.on('message', async msg => {
      if (
        msg.body.match(/(buenas|Buenas|hola|Hola|Menu|Menu|opciones|Opciones|Holis)/i) &&
        msg.from.endsWith('@c.us')
      )
      // Muestra el menu al escribir 
       {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        await delay(1500);
        const saudacoes = cumprimentar();
        await client.sendMessage(msg.from, `${inicial} `);

      } else if (msg.body.match(/(1|saludo)/i) && msg.from.endsWith('@c.us')) 
      // Saluda al escribir 1 segun la hora
      {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        const saudacoes = cumprimentar();
        await client.sendMessage(msg.from, saudacoes);
        await client.sendMessage(msg.from, inicial);
      } else if (msg.body.match(/(2|fecha y hora)/i) && msg.from.endsWith('@c.us'))
      // mustra la fecha, hora y zona horaria al escribir 2
      {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        const fechayhora = getDate();
        await client.sendMessage(msg.from, fechayhora);
        await client.sendMessage(msg.from, inicial);
      } else if (msg.body.match(/inicial/i) && msg.from.endsWith('@c.us')) 
      {
        const chat = await msg.getChat();
        chat.sendStateTyping();
        await client.sendMessage(msg.from, inical);
      }
    });
 
    function waitForResponse() {
      return new Promise((resolve, reject) => {
        client.on('message', async msg => {
          if (msg.from.endsWith('@c.us')) {
            resolve(msg);
          }
        });
      });
    }
  } catch (error) {
    console.error('Error en la ejecución:', error);
  }
}
 
run().catch(err => console.error(err));