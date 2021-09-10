import { hello1 } from "../../declarations/hello1";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with hello1 actor, calling the greet method
  const bytes = await hello1.getFile(name);
  const bytesAsBuffer = new Uint8Array(bytes[0]);
  // const chunkBuffers = [];
  // chunkBuffers.push(bytesAsBuffer);
  // const fileBlob = new Blob(bytesAsBuffer);
  var blob = new Blob([bytesAsBuffer], {'type': 'image/png'});
  const fileURL = URL.createObjectURL(blob);
  img.src = fileURL;
});

document.getElementById('upload-file').addEventListener('change', async(evt) => {        
  var file;
  var destination = document.getElementById('destination');
  destination.innerHTML = '';//每次清空内容

  const file_list = evt.target.files
  // 循环用户多选的文件
  for(var x = 0, xlen = file_list.length; x < xlen; x++) {
      file = file_list[x];
      console.log(file);
      let fileSliceBuffer = (await file.arrayBuffer()) || new ArrayBuffer(0);
      await hello1.uplodaFile(file.name,Array.from(new Uint8Array(fileSliceBuffer)));
  }
});

document.getElementById("connectPlug").addEventListener("click", async () => {
  // NNS Canister Id as an example
  const nnsCanisterId = 'qoctq-giaaa-aaaaa-aaaea-cai'
  const whitelist = [nnsCanisterId];

  // Initialise Agent, expects no return value
  await window?.ic?.plug?.requestConnect({
    whitelist,
  });

  // A partial Interface factory
  // for the NNS Canister UI
  // Check the `plug authentication - nns` for more
  const nnsPartialInterfaceFactory = ({ IDL }) => {
    const BlockHeight = IDL.Nat64;
    const Stats = IDL.Record({
      'latest_transaction_block_height' : BlockHeight,
      'seconds_since_last_ledger_sync' : IDL.Nat64,
      'sub_accounts_count' : IDL.Nat64,
      'hardware_wallet_accounts_count' : IDL.Nat64,
      'accounts_count' : IDL.Nat64,
      'earliest_transaction_block_height' : BlockHeight,
      'transactions_count' : IDL.Nat64,
      'block_height_synced_up_to' : IDL.Opt(IDL.Nat64),
      'latest_transaction_timestamp_nanos' : IDL.Nat64,
      'earliest_transaction_timestamp_nanos' : IDL.Nat64,
    });
    return IDL.Service({
      'get_stats' : IDL.Func([], [Stats], ['query']),
    });
  };

  // Create an actor to interact with the NNS Canister
  // we pass the NNS Canister id and the interface factory
  const NNSUiActor = await window.ic.plug.createActor({
    canisterId: nnsCanisterId,
    interfaceFactory: nnsPartialInterfaceFactory,
  });

  // We can use any method described in the Candid (IDL)
  // for example the get_stats()
  // See https://github.com/dfinity/nns-dapp/blob/cd755b8/canisters/nns_ui/nns_ui.did
  const stats = await NNSUiActor.get_stats();
  console.log('NNS stats', stats);

  // Get the user principal id
  const principalId = await window.ic.plug.agent.getPrincipal();

  console.log(`Plug's user principal Id is ${principalId}`);

  const result = await window.ic.plug.requestBalance();
  console.log(result);

  
});
document.getElementById("transfer").addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;
  const params = {
    to: 'fapdd-unqzp-2i5ib-n6f2b-iepjh-sgodi-gezio-r4ut5-kqypx-ulxy2-pqe',
    amount: parseInt(amount),
  };
  const result = await window.ic.plug.requestTransfer(params);
  console.log(result);
});

