import { Router } from "express";
import axios from "axios";
import {ethers} from 'ethers';

const gethRoute = Router();
const provider = new ethers.JsonRpcProvider("https://eth-holesky.g.alchemy.com/v2/mVWnfc_nlIV-y8F75nYZj5fIpOi4Gvn-")

const getBlockDetails=async()=>{
    const data = await axios.post("http://127.0.0.1:8545",{
        
            "jsonrpc": "2.0",
            "method": "eth_getBlockByNumber",
            "params": [
                "latest",
                true
            ],
            "id": 1
        
    })
    console.log(data.data.result);
    
}
getBlockDetails();

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
    let contractCount = 0;

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
    for(let i=0;i<=block;i++){
        
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
        // console.log(data1.data.result.transactions);
        
        transArray.push(data1.data.result.transactions)
        
    }
    transArray.forEach(trans=>{
        trans.forEach(receipt=>{
            if(receipt.to == null){
                contractCount++;
            }
        })
    })
    console.log("The number of contract",contractCount);
    
    res.status(200).json({contractCount});
    

})

gethRoute.get("/transCountMonth",async(req,res)=>{
    const date = Date.now();
    const ethTimestamp = Math.floor(Date.now() / 1000);
    console.log(ethTimestamp);
    
})


export default gethRoute;