import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
actor {
    
    type FileId = Text;
    // type Chunk = Blob;
    type Chunk = [Nat8];
    private var files = HashMap.HashMap<FileId,Chunk>(0,Text.equal,Text.hash);

    public func uplodaFile( id : FileId , chunk : Chunk) : async (){
        Debug.print("id:"#id);
        files.put(id,chunk);
    };

    public func getFile(id : FileId) : async ?Chunk {
        files.get(id);
    };

};
