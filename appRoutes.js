
module.exports =  function loadRoutesToApp(app) {
  
  app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Headers", "access-control-allow-origin, content-type, authorization")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });
    
  app.use('/users', require('./api/user'));
  app.use('/auth', require('./api/auth')); 
  app.use('/items', require('./api/game/item'));   

 // app.use((req, res, next) => {
 //     res.send(`The route ${req.path} can't be found`);
 // });

    

}