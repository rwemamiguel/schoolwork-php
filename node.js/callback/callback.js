function washing_machine(is_working){
    return new Promise((resolve, reject) => {
       
            if(is_working){
                setTimeout(() => {
                    resolve("Washed clothes successfully.");
                }, 3000);
            }         
               else{
                reject("Washing machine is not working.");
            }
       
    });
}
async function startlaundry(){
    try{
        console.log("Starting laundry...");
        const result = await washing_machine(false);
        console.log(result);
    }
    catch(error){
        console.log(error);
    }
}

startlaundry();