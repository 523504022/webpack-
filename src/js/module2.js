export function sum(...args){
    return args.reduce((pre,now)=>{
        return pre+now;
    });
}