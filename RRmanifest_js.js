let fm = FileManager.iCloud();
let src = fm.documentsDirectory() + "/RRmanifest.txt";
let dst = fm.documentsDirectory() + "/RRmanifest.json";

let raw = fm.readString(src);
let data = JSON.parse(raw); // validates it's real JSON

fm.writeString(dst, JSON.stringify(data));
console.log("RRmanifest.json written");
Script.complete();
