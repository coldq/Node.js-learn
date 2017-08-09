let foo = async ()=>{
    let a = await new Promise((resolve,rej)=>{
        setTimeout(()=>{
            resolve(10)
        },1000)
    });
    console.log(a)
}
foo()