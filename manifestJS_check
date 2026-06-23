let fm = FileManager.iCloud();
let src = fm.documentsDirectory() + "/RRmanifest_check.txt";
let dst = fm.documentsDirectory() + "/RRmanifest_check.json";

let raw = fm.readString(src);
let data = JSON.parse(raw); // validates it's real JSON

fm.writeString(dst, JSON.stringify(data));
console.log("RRmanifest_Check.json written");
Script.complete();
