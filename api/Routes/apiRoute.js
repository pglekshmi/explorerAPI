import { Router } from "express";
import axios from "axios";

const gethRoute = Router();

gethRoute.get('/latestBlock',async(req,res)=>{
    console.log("....Latest Block.....");
    
   const data = await axios.post("http://127.0.0.1:8545",
        {
            "jsonrpc": "2.0",
            "method": "eth_blockNumber",
            "params": [],
            "id": 1
        }
    )

    console.log(data.data.result);
    const block = Number(data.data.result);
    console.log(block);
    
});

gethRoute.get("/transactionCount",async(req,res)=>{
    

    const data = await axios.post("http://127.0.0.1:8545",
        {
            "jsonrpc": "2.0",
            "method": "eth_blockNumber",
            "params": [],
            "id": 1
        }
    )

    console.log(data.data.result);
    const block = Number(data.data.result); 

    console.log("....Transaction Count....");
    let totTx = 0;
    for(let i=0;i<=block;i++)
    {
        const bld= '0x'+i
    
        const txcount = await axios.post("http://127.0.0.1:8545",
            {
                "jsonrpc": "2.0",
                "method": "eth_getBlockTransactionCountByNumber",
                "params": [
                    bld
                ],
                "id": 1
            }
        )

        console.log(txcount.data.result);
        const txInd= Number(txcount.data.result);
        totTx+= txInd;
        
    }

    console.log(totTx);
    
})

gethRoute.get("/contractCreated",async(req,res)=>{

    const data = await axios.post("http://127.0.0.1:8545",
        {
            "jsonrpc": "2.0",
            "method": "eth_blockNumber",
            "params": [],
            "id": 1
        }
    )

    console.log(data.data.result);
    const block = Number(data.data.result); 
    console.log(block);
    
    let transArray = []
    for(let i=0;i<block;i++){
        
        const data1 = await axios.post("http://127.0.0.1:8545",
            {
                "jsonrpc": "2.0",
                "method": "eth_getBlockByNumber",
                "params": [
                    i,
                    true
                ],
                "id": 1
            }
        )
        console.log(data1.data.tr);
        
        // transArray.push(data1.transactions)
        
    }
    apiRoute

    

})


export default gethRoute;