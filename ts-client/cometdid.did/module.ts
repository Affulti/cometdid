// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgCreateOrgs } from "./types/cometdid/did/tx";
import { MsgDeleteOrgs } from "./types/cometdid/did/tx";
import { MsgUpdateOrgs } from "./types/cometdid/did/tx";

import { Orgs as typeOrgs} from "./types"
import { Params as typeParams} from "./types"

export { MsgCreateOrgs, MsgDeleteOrgs, MsgUpdateOrgs };

type sendMsgCreateOrgsParams = {
  value: MsgCreateOrgs,
  fee?: StdFee,
  memo?: string
};

type sendMsgDeleteOrgsParams = {
  value: MsgDeleteOrgs,
  fee?: StdFee,
  memo?: string
};

type sendMsgUpdateOrgsParams = {
  value: MsgUpdateOrgs,
  fee?: StdFee,
  memo?: string
};


type msgCreateOrgsParams = {
  value: MsgCreateOrgs,
};

type msgDeleteOrgsParams = {
  value: MsgDeleteOrgs,
};

type msgUpdateOrgsParams = {
  value: MsgUpdateOrgs,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgCreateOrgs({ value, fee, memo }: sendMsgCreateOrgsParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgCreateOrgs: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgCreateOrgs({ value: MsgCreateOrgs.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgCreateOrgs: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgDeleteOrgs({ value, fee, memo }: sendMsgDeleteOrgsParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgDeleteOrgs: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgDeleteOrgs({ value: MsgDeleteOrgs.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgDeleteOrgs: Could not broadcast Tx: '+ e.message)
			}
		},
		
		async sendMsgUpdateOrgs({ value, fee, memo }: sendMsgUpdateOrgsParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgUpdateOrgs: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgUpdateOrgs({ value: MsgUpdateOrgs.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgUpdateOrgs: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgCreateOrgs({ value }: msgCreateOrgsParams): EncodeObject {
			try {
				return { typeUrl: "/cometdid.did.MsgCreateOrgs", value: MsgCreateOrgs.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgCreateOrgs: Could not create message: ' + e.message)
			}
		},
		
		msgDeleteOrgs({ value }: msgDeleteOrgsParams): EncodeObject {
			try {
				return { typeUrl: "/cometdid.did.MsgDeleteOrgs", value: MsgDeleteOrgs.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgDeleteOrgs: Could not create message: ' + e.message)
			}
		},
		
		msgUpdateOrgs({ value }: msgUpdateOrgsParams): EncodeObject {
			try {
				return { typeUrl: "/cometdid.did.MsgUpdateOrgs", value: MsgUpdateOrgs.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgUpdateOrgs: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						Orgs: getStructure(typeOrgs.fromPartial({})),
						Params: getStructure(typeParams.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			CometdidDid: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;