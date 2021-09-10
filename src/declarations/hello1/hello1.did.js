export const idlFactory = ({ IDL }) => {
  const FileId = IDL.Text;
  const Chunk = IDL.Vec(IDL.Nat8);
  return IDL.Service({
    'getFile' : IDL.Func([FileId], [IDL.Opt(Chunk)], []),
    'uplodaFile' : IDL.Func([FileId, Chunk], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
