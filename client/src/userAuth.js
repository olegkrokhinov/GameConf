
const URL_AUTH = "http://localhost:4000/auth/";

const saveToLocalStorage = true; 

export const authenticatedUser = {
    userid: '',
    userName: '',
    userLogin: '',
    userRoles: [],
    userAccessToken: '' 
};

let refreshAccessTokenTimerId = '';

let userIsAuthentificatedListeners = [];

updateAuthenticatedUserDataFromLocalStorage();
refreshAccessTokenFromServer(true);

export function addUserIsAuthentificatedListener (userIsAuthentificatedSetter){
    userIsAuthentificatedListeners.push(userIsAuthentificatedSetter);
}

export function delFromUserIsAuthentificatedListeners(userIsAuthentificatedSetter){
   let index = userIsAuthentificatedListeners.indexOf(userIsAuthentificatedSetter);
   if (index > -1) {
    userIsAuthentificatedListeners.splice(index, 1);
   }
}
 
function setUserIsAuthenticated(UserIsAuthenticated){
    userIsAuthentificatedListeners.forEach((listener)=>listener(UserIsAuthenticated))
}

export function refreshAccessTokenFromServer(autoupdate=false){
    if (!tokenIsExpired(authenticatedUser.userAccessToken)) {

        return new Promise((resolve, reject)=>{
            fetch(URL_AUTH + 'refresh', { 
                method: 'POST', 
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': authenticatedUser.userAccessToken,                
                }
            })
            .then(res => res.json())
            .then(user => {
                saveUserToLocalStorage(user);
                Object.assign(authenticatedUser, user);
                setUserIsAuthenticated(true);
                
                if (autoupdate){
                    clearTimeout(refreshAccessTokenTimerId);
                    refreshAccessTokenTimerId = setTimeout(()=>refreshAccessTokenFromServer(true), getTimeToTokenExpire(authenticatedUser.userAccessToken)-60000);
                }
                resolve(user);
            })
            .catch(reject);
        });
    }
}

export function login(userLogin, userPassword) {
    const body = {userLogin: userLogin, userPassword: userPassword};
    return postUser('login', body, saveToLocalStorage);
}

export function register(userLogin, userPassword){
    const body = {userLogin: userLogin, userPassword: userPassword};
    return postUser('signup', body, !saveToLocalStorage);
}

export function logOut(){
   
    return new Promise((resolve, reject)=>{
        fetch(URL_AUTH + 'logout', { 
            method: 'POST', 
            body: '',  
            headers: { 
                'Content-Type': 'application/json',                
                'Authorization': authenticatedUser.userAccessToken,   
            }
        })
        .then(() => {
            localStorage.removeItem('user');
            cleanupAuthenticatedUserData();
            setUserIsAuthenticated(false);
            clearTimeout(refreshAccessTokenTimerId);
            resolve();
        })
        .catch(reject);
    });
}

function tokenIsExpired(jwtToken) {
  if (jwtToken) {
      try {
        const [, payload] = jwtToken.split('.');
        const { exp: expires } = JSON.parse(window.atob(payload));
        if (typeof expires === 'number') {
          return (Date.now() > expires * 1000)
        }
      } catch {
        // ignore
      }
    }
    return true;
}

function getTimeToTokenExpire(jwtToken){
 if (jwtToken) {
      try {
        const [, payload] = jwtToken.split('.');
        const { exp: expires } = JSON.parse(window.atob(payload));
        if (typeof expires === 'number') {
            if (Date.now() < expires*1000) {
              return (expires*1000-Date.now());
          }
        }
      } catch {
        // ignore
      }
    }
    return null;
}

export function updateAuthenticatedUserDataFromLocalStorage(){
    let user = JSON.parse(localStorage.getItem('user'));
    (!user) && cleanupAuthenticatedUserData() && setUserIsAuthenticated(false);
    if (user){
        let userAccessTokenIsExpired = tokenIsExpired(user.userAccessToken); 
        (!userAccessTokenIsExpired) && Object.assign(authenticatedUser, user)&& setUserIsAuthenticated(true);
        userAccessTokenIsExpired  && localStorage.removeItem('user') && setUserIsAuthenticated(false);
    }
}

function cleanupAuthenticatedUserData(){
    Object.assign(authenticatedUser, {
         userid: '',
         userName: '',
         userLogin: '',
         userRoles: [],
         userAccessToken: '' }); 
}

function saveUserToLocalStorage(user){
    if (user.userAccessToken) {
        localStorage.setItem("user", JSON.stringify(user));
    }
}

function postUser(authPath, authBody, saveToLocalStorage = false){
    return new Promise((resolve, reject)=>{
        fetch(URL_AUTH + authPath, { 
            method: 'POST', 
            body: JSON.stringify(authBody),  
            headers: { 
                'Content-Type': 'application/json',                
            }
        })
        .then(res => res.json())
        .then(user => {
            saveToLocalStorage && saveUserToLocalStorage(user);
            Object.assign(authenticatedUser, user);
            setUserIsAuthenticated(true);

            clearTimeout(refreshAccessTokenTimerId);
            refreshAccessTokenTimerId = setTimeout(()=>refreshAccessTokenFromServer(true), getTimeToTokenExpire(authenticatedUser.userAccessToken)-60000);

            resolve(user);
        })
        .catch(reject);
    });
}