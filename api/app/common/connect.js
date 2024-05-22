import mysql from 'mysql2'
import env from 'dotenv'
env.config()

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE_NAME,
    port     : process.env.DB_PORT
  });

  connection.connect((err) => {
      if (err) {
        console.log('Lỗi kết nối:', err);
      } else {
        console.log('Connected!');
      }
  });

  export default connection