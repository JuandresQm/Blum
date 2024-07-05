require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const sqlite3=require('sqlite3').verbose();
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { error } = require('console');
// Configurar body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.use(express.json());
app.set('trust proxy', true);
app.use(express.static(__dirname + '/'));

// Configurar middleware para usar sesiones
app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
  }));
  app.post('/admin/institucion/crear', (req, res) => {

    const sql = "INSERT INTO instituciones (nombre) VALUES (?)";
          db.run(sql, req.body.nombre, err => {
            if (err) {
              res.render("loginError");
              return console.error(err.message);
            } else { 
              res.redirect('/admin');
            }
          }) 
      });
  app.post('/admin/institucion/eliminar/:id', (req, res) => {
    const id= req.params.id;
    const sql = "DELETE FROM instituciones WHERE id=?"
          db.run(sql, id, err => {
            if (err) {
              res.render("loginError");
              return console.error(err.message);
            } else { 
              res.redirect('/admin');
            }
          }) 
      });
  app.post('/admin/institucion/editar/:id', (req, res) => {
    const id= req.params.id;
    const sql = "UPDATE instituciones SET nombre=? WHERE id=?"
          const newSql = [req.body.nombre, id];
          db.run(sql, newSql, err => {
            if (err) {
              res.render("loginError");
              return console.error(err.message);
            } else { 
              res.redirect('/admin');
            }
          }) 
      });
  app.post('/admin/institucion/:id', (req, res) => {
const id= req.params.id;
const sql = "UPDATE usuarios SET institución=? WHERE usuario_id=?"
      const newSql = [req.body.institución, id];
      db.run(sql, newSql, err => {
        if (err) {
          res.render("loginError");
          return console.error(err.message);
        } else { 
          res.redirect('/admin');
        }
      }) 
  });
  app.get('/admin', (req, res) => {
    const adminToken = req.cookies.adminToken;
  let usuario;
    try {
      if (adminToken) {
        const decodedAdmin = jwt.verify(adminToken, process.env.JWT_SECRET);
        usuario = decodedAdmin.correo;
const sql2 = "SELECT  u.id, cedula, nombres, apellidos, telefono, areaInteres, institución, status, d.correo AS correo_usuario, c.nombre AS nombre_carrera FROM usuarios u JOIN datos d ON u.usuario_id = d.id JOIN carreras c ON u.carrera_id = c.id; ";
const sql3 = "SELECT * FROM carreras";
const sql4 = "SELECT * FROM instituciones";

      db.all(sql2, (err, rows2) => {
          if (err) {
              console.error(err.message);
          } else {


              db.all(sql3, (err, rows3) => {
                  if (err) {
                      console.error(err.message);
                  } else {


                      db.all(sql4, (err, rows4) => {
                          if (err) {
                              console.error(err.message);
                          } else {

                              res.render('admin', {perfil: usuario, usuarios:rows2, carreras:rows3, instituciones:rows4});
                          }
                      });
                  }
              });
          }
      });

        } else {
          res.redirect('/iniciosesion');
        }
  } catch (error) {
    res.redirect('/');
  }
    
 

  });
  app.get('/perfil', (req, res) => {
    const userToken = req.cookies.userToken;
  const adminToken = req.cookies.adminToken;
  let usuario;

  try {
    if (!userToken) {
      res.redirect('/');
    } else if (adminToken) {
      const decodedAdmin = jwt.verify(adminToken, process.env.JWT_SECRET);
      res.redirect('/admin');
    } else {
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
      usuario = decoded.correo;
      const sql = "SELECT id FROM datos WHERE correo=?";
      const sql2 = "SELECT * FROM carreras";
      const sql3 = "SELECT * FROM usuarios WHERE usuario_id=?";
      db.get(sql, usuario, (err, rows) => {
        if (err) {
          console.log(err);
        } else {
           db.all(sql2, (err, rows2) => {
        if (err) {
          console.log(err);
        } else { 
          db.get(sql3, rows.id, (err, rows3) => {
            if (err) {
              console.log(err);
            } else {

                res.render("formulario", { perfil: usuario, usuarios:rows, carreras:rows2, datos:rows3});
             
            }
          })
        }
      }) }})
    }
    
  } catch (error) {
    
  }


  });
  app.post('/perfil', (req, res) => {
    const userToken = req.cookies.userToken;
  const adminToken = req.cookies.adminToken;
  let usuario;
  try {
    if (!userToken) {
      res.redirect('/');
    } else if (adminToken) {
      const decodedAdmin = jwt.verify(adminToken, process.env.JWT_SECRET);
      res.redirect('/admin');
    } else {
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
      usuario = decoded.correo;
      const sqlSearch = "SELECT id FROM datos WHERE correo=?";
      const sql3 = "SELECT * FROM usuarios WHERE usuario_id=?";

      db.get(sqlSearch, usuario, (err, rows) => {
        if (err) {
          console.log(err);
        } else { 
          db.get(sql3, rows.id, (err, rows1) => {
            if (err) {
              console.log(err);
            } else { 
    if (!rows1) {
      const sql = "INSERT INTO usuarios (cedula, nombres, apellidos, telefono, areaInteres, status, carrera_id, usuario_id) VALUES (?,?,?,?,?,?,?,?)";
      const newSql = [req.body.cedula, req.body.nombres, req.body.apellidos, req.body.telefono, req.body.areaInteres, req.body.status, req.body.carrera_id, req.body.usuario_id];
      db.run(sql, newSql, err => {
        if (err) {
res.render("loginError");
          return console.error(err.message);
        } else { 
          res.redirect('/');
        }
      }) 
    } else {
      const sql = "UPDATE usuarios SET cedula=?, nombres=?, apellidos=?, telefono=?, areaInteres=?, status=?, carrera_id=? WHERE usuario_id=?"
      const newSql = [req.body.cedula, req.body.nombres, req.body.apellidos, req.body.telefono, req.body.areaInteres, req.body.status, req.body.carrera_id, req.body.usuario_id];
      db.run(sql, newSql, err => {
        if (err) {
          res.render("loginError");
          return console.error(err.message);
        } else { 
          res.redirect('/');
        }
      }) 
    }
    
            } 
          })

        } 
      })



   
    }
  } catch (error) {
    res.redirect('/');
  }


  });
  app.get('/', (req, res) => {
    const userToken = req.cookies.userToken;
  const adminToken = req.cookies.adminToken;
  let usuario;

  try {
    if (userToken) {
      const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
      usuario = decoded.correo;
    } else if (adminToken) {
      const decodedAdmin = jwt.verify(adminToken, process.env.JWT_SECRET);
      usuario = decodedAdmin.correo;
    }
  } catch (error) {
    res.redirect('/');
  }
    res.render("Casa", { perfil: usuario });
  });
  app.get('/loginerror', (req, res) => {
    res.render('loginError');
  });
  app.get('/logout', (req, res) => {
    res.clearCookie('userToken');
    res.clearCookie('adminToken');
    res.redirect('/');
  });
  app.get('/registro', (req, res) => {
    const userToken = req.cookies.userToken;
    const adminToken = req.cookies.adminToken;
  
    try {
      if (userToken) {
        const decodedUser = jwt.verify(userToken, process.env.JWT_SECRET);
        res.redirect('/');
      } else if (adminToken) {
        const decodedAdmin = jwt.verify(adminToken, process.env.JWT_SECRET);
        res.redirect('/admin');
      } else {
        res.render('registro');
      }
    } catch (error) {
      res.render('registro');
    }
  });
  app.post('/registro', (req, res) => {
    const data = req.body;

    if (data.correo === process.env.ADMINUSERNAME) {
        res.redirect('/admin');
    } else {
        db.all('SELECT * FROM datos WHERE correo = ?', [data.correo], (err, userdata) => {
            if (err) {
                console.error(err.message);
                res.render('error');
                return;
            }
            if (userdata.length > 0) {
                res.redirect('/loginError');
            } else {
                bcrypt.hash(data.password, 12)
                    .then(hash => {
                        data.password = hash;
                        db.run('INSERT INTO datos (correo, contraseña) VALUES (?, ?)', [data.correo, data.password], (err) => {
                            if (err) {
                                console.error(err.message);
                                res.render('error');
                            } else {
                                const userToken = jwt.sign({ correo: data.correo }, process.env.JWT_SECRET);
                                res.cookie('userToken', userToken);
                                res.redirect('/');
                            }
                        });
                    })
                    .catch(err => {
                        console.error(err);
                        res.redirect('/');
                    });
            }
        });
    }
});

  app.get('/inicioSesion', (req, res) => {
    const userToken = req.cookies.userToken;
    const adminToken = req.cookies.adminToken;
  
    try {
      if (userToken) {
        jwt.verify(userToken, process.env.JWT_SECRET);
        res.redirect('/');
      } else if (adminToken) {
        jwt.verify(adminToken, process.env.JWT_SECRET);
        res.redirect('/admin');
      } else {
        res.render('inicioSesion');
      }
    } catch (error) {
      res.redirect('/');
    }
  });
  app.post('/inicioSesion', (req, res) => {
    const {  correo, password } = req.body;
    if (correo === process.env.ADMINUSERNAME && password === process.env.ADMINPASSWORD) {
      const adminToken = jwt.sign({ correo }, process.env.JWT_SECRET);
      res.cookie('adminToken', adminToken);
      res.redirect('/admin');
    } else {
      const query = 'SELECT * FROM datos WHERE correo = ?';
      db.all(query, [correo], (err, rows) => {
        if (rows.length > 0) {
          const element = rows[0];
          bcrypt.compare(password, element.contraseña, (err, isMatch) => {
            if (isMatch) {
              const userToken = jwt.sign({ correo }, process.env.JWT_SECRET);
              res.cookie('userToken', userToken);
              res.redirect('/');
            } else {
              res.redirect('/loginError');
            }
          });
        } else {
          res.redirect('/loginError');
        }
      });
    }
  });
  app.listen(3000);
console.log('Online');
const Blum = path.join(__dirname, "db", "base.db");
const db = new sqlite3.Database(Blum, err =>{
    if (err) {
        return console.error(err.message);
    } else {
        console.log("Online Database")
    }
})
db.run(`CREATE TABLE IF NOT EXISTS datos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    correo text unique,
    contraseña text
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cedula TEXT unique,
      nombres text,
      apellidos text,
      telefono text,
      areaInteres text,
      institución text DEFAULT 'No asignado' ,
      carrera_id integer,
      usuario_id integer,
      status text,
      FOREIGN KEY (carrera_id) REFERENCES carreras(id),
      FOREIGN KEY (usuario_id) REFERENCES datos(id)
      )`);
      db.run(`CREATE TABLE IF NOT EXISTS carreras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre text
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS instituciones (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre text
          )`);