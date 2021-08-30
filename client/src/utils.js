export function setObjectState(setter, dataToUpdate){
    setter(prevState =>{
      return {...prevState, ...dataToUpdate};
    });
  }  
 